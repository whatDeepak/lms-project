// api/quiz/questions/[quizId].ts

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

    const existingQuestionIds = existingQuiz.questions.map((q) => q.id);

    // Update or create each question individually
    const updatedQuestions = await Promise.all(questions.map(async (question: any) => {
      if (question.id) {
        // Update existing question
        return db.question.update({
          where: { id: question.id },
          data: {
            text: question.text,
            type: question.type,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            answer: question.answer,
          },
        });
      } else {
        // Create new question
        return db.question.create({
          data: {
            ...question,
            quizId: params.quizId,
          },
        });
      }
    }));

    // Delete questions that were not updated
    const questionsToDelete = existingQuestionIds.filter((id) => !questions.some((q: { id: string; }) => q.id === id));
    await Promise.all(questionsToDelete.map((id) => db.question.delete({ where: { id } })));

    // Fetch the updated quiz with questions
    const updatedQuiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
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
