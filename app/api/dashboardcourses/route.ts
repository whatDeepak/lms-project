import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Course, Category, Chapter } from "@prisma/client";
import { getProgress } from '@/actions/Courses/get-progress';

type CourseWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgress[];
  coursesInProgress: CourseWithProgress[];
  additionalCourses: CourseWithProgress[];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    // Fetch purchased course IDs for the user
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        courseId: true,
      },
    });

    // Extract courseIds from purchasedCourses
    const purchasedCourseIds = purchasedCourses.map((purchase) => purchase.courseId);

    // Fetch courses that the user has purchased
    const allCourses = await db.course.findMany({
      where: {
        id: {
          in: purchasedCourseIds,
        },
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
    });

    // Prepare CourseWithProgress objects with progress information
    const coursesWithProgress: CourseWithProgress[] = await Promise.all(
      allCourses.map(async (course) => {
        const courseWithProgress = course as CourseWithProgress;
      const {progressPercentage} = await getProgress(userId, course.id);
        courseWithProgress.progress = progressPercentage;
        return courseWithProgress;
      })
    );

    // Filter completed and in-progress courses based on progress
    const completedCourses = coursesWithProgress.filter((course) => course.progress === 100);
    const coursesInProgress = coursesWithProgress.filter((course) => (course.progress ?? 0) < 100);

    
    const totalCourses = completedCourses.length + coursesInProgress.length;

    // Fetch additional courses if needed to reach at least 6 courses
    let additionalCourses: CourseWithProgress[] = [];
    if (totalCourses < 6) {
      const extraCoursesNeeded = 6 - totalCourses;
      const additionalCourseEntities = await db.course.findMany({
        where: {
          id: {
            notIn: purchasedCourseIds,
          },
          isPublished: true,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
          },
        },
        take: extraCoursesNeeded,
      });

      additionalCourses = additionalCourseEntities.map((course) => {
        const courseWithProgress = course as CourseWithProgress;
        courseWithProgress.progress = null; 
        return courseWithProgress;
      });
    }

    const dashboardCourses: DashboardCourses = {
      completedCourses,
      coursesInProgress,
      additionalCourses,
    };

    return NextResponse.json(dashboardCourses, { status: 200 });
  } catch (error) {
    console.error("[GET_DASHBOARD_COURSES]", error);
    return NextResponse.json({
      error: 'Failed to fetch dashboard courses',
      completedCourses: [],
      coursesInProgress: [],
      additionalCourses: [],
    }, { status: 500 });
  }
}
