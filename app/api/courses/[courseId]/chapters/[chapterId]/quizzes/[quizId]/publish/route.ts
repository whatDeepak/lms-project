import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string; quizId: string } }) {
  try {
    const user = await currentUser();
    let userId = user?.id ?? "";

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

    const quiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        chapterId: params.chapterId,
      },
      include: {
        questions: true,
      },
    });

    if (!quiz || !quiz.title || !quiz.timeline || quiz.questions.length === 0) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedQuiz = await db.quiz.update({
      where: {
        id: params.quizId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedQuiz);
  } catch (error) {
    console.log("[QUIZ_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
