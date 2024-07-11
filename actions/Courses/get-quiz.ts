// getQuizData.ts

import { db } from "@/lib/db";
import { Quiz, Question } from "@prisma/client";

interface GetQuizDataProps {
  chapterId: string;
}

export const getQuizData = async ({ chapterId }: GetQuizDataProps) => {
  try {
    const quizzes = await db.quiz.findMany({
      where: {
        chapterId,
      },
      include: {
        questions: true, // Include questions related to each quiz
      },
      orderBy: {
        timeline: "asc",
      },
    });

    return quizzes;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
};
