// app/api/dashboardcourses/route.ts
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
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

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

    const dashboardCourses: DashboardCourses = {
      completedCourses,
      coursesInProgress,
    };

    return NextResponse.json(dashboardCourses, { status: 200 });
  } catch (error) {
    console.error("[GET_DASHBOARD_COURSES]", error);
    return NextResponse.json({
      error: 'Failed to fetch dashboard courses',
      completedCourses: [],
      coursesInProgress: [],
    }, { status: 500 });
  }
}
