import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

interface QuizAttemptData {
  quizId: string;
  score: number;
  answers: { questionId: string; correct: boolean }[];
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id ?? "";

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body to get quiz attempt data
    const { quizId, score, answers }: QuizAttemptData = await req.json();

    await db.quizAttempt.create({
      data: {
        userId: userId,
        quizId: quizId,
        score: score,
        answers: answers,
      },
    });

    return NextResponse.json({ message: "Quiz attempt recorded successfully" });
  } catch (error) {
    console.error("[QUIZ_ATTEMPT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
