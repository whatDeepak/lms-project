import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id ?? "";

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, timeline } = await req.json();

    // Convert timeline string "00:01:23" to total seconds
    const [hours, minutes, seconds] = timeline.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Calculate the position for the new quiz
    const lastQuiz = await db.quiz.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuiz ? lastQuiz.position + 1 : 1;

    const quiz = await db.quiz.create({
      data: {
        title,
        chapterId: params.chapterId,
        timeline: totalSeconds, // Pass the total seconds
        position: newPosition,  // Ensure position is included
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZ_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
