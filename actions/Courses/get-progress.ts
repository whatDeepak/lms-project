import { db } from "@/lib/db";

type prograssProps = {
  progressPercentage: number;
  totalChapters: number;
  completedChapters: number;
};
export const getProgress = async (
  userId: string,
  courseId: string
): Promise<prograssProps> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;
    const totalChapters = publishedChapterIds.length;
    const completedChapters = validCompletedChapters;

    return { progressPercentage, totalChapters, completedChapters };
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return {
      progressPercentage: 0,
    totalChapters: 0, 
    completedChapters: 0
    };
  }
};
