// actions/courses/get-quiz-attempt.ts

import { db } from "@/lib/db";

interface GetQuizAttemptProps {
  userId: string;
  quizId: string;
}

export const getQuizAttempt = async ({ userId, quizId }: GetQuizAttemptProps) => {
  try {
    const quizAttempt = await db.quizAttempt.findUnique({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
    });

    return quizAttempt;
  } catch (error) {
    console.error("Error fetching quiz attempt:", error);
    return null;
  }
};
