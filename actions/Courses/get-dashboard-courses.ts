import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "./get-progress";

type CourseWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgress[];
  coursesInProgress: CourseWithProgress[];
};

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    const allCourses = await db.course.findMany({
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
    });

    const courses: CourseWithProgress[] = await Promise.all(
      allCourses.map(async (course) => {
        const courseWithProgress = course as CourseWithProgress;
        const progress = await getProgress(userId, course.id);
        courseWithProgress.progress = progress;
        return courseWithProgress;
      })
    );

    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.error("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
