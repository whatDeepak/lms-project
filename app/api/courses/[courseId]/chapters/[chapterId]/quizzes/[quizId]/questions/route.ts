import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; quizId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { questions } = await req.json();

    // Fetch the existing quiz including questions
    const existingQuiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        chapterId: params.chapterId,
      },
      include: {
        questions: true,
      },
    });

    if (!existingQuiz) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Prepare the updated questions array
    const updatedQuestions = questions.map((question: any) => {
      // Ensure options array exists and is empty for normal type questions
      if (question.type === "NORMAL") {
        return {
          ...question,
          options: [], // Set options to an empty array for normal questions
        };
      }
      return question; // Return as-is for MCQ questions
    });

    // Update only the questions array, keeping other quiz data unchanged
    const updatedQuiz = await db.quiz.update({
      where: {
        id: params.quizId,
      },
      data: {
        questions: {
          // Use 'set' to replace existing questions with new ones
          set: [...existingQuiz.questions, ...updatedQuestions], // Append new questions to existing ones
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.log("[QUIZ_QUESTIONS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
