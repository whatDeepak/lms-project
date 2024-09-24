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

    const unpublishedQuiz = await db.quiz.update({
      where: {
        id: params.quizId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedQuiz);
  } catch (error) {
    console.log("[QUIZ_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
