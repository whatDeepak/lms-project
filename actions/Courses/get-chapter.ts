// getChapter.ts

import { db } from "@/lib/db";
import { Attachment, Chapter, Quiz, QuizAttempt } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
      include: {
        quizzes: true, // Include quizzes related to the chapter
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;
    let quizTimelineSeconds: number | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });

      // Fetch quiz attempts for the user
      const quizAttempts = await db.quizAttempt.findMany({
        where: {
          userId,
          quizId: {
            in: chapter.quizzes.map((quiz) => quiz.id),
          },
        },
      });

      // Determine the next quiz timeline that hasn't been completed
      const incompleteQuizzes = chapter.quizzes.filter(
        (quiz) => !quizAttempts.some((attempt) => attempt.quizId === quiz.id)
      );

      if (incompleteQuizzes.length > 0) {
        quizTimelineSeconds = incompleteQuizzes[0].timeline;
      }
    }

    if (chapter.isFree || purchase) {
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      quizTimelineSeconds, // Include quiz timeline in the return object
    };
  } catch (error) {
    console.error("Error fetching chapter details:", error);
    return {
      chapter: null,
      course: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      quizTimelineSeconds: null,
    };
  }
};
