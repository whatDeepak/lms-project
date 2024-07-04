import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Course, Category, Chapter } from "@prisma/client";
import { getProgress } from '@/actions/Courses/get-progress';

type CourseWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    // Fetch watch later course IDs for the user
    const watchLaterCourses = await db.watchLater.findMany({
      where: {
        userId: userId,
      },
      select: {
        courseId: true,
      },
    });

    // Extract courseIds from watchLaterCourses
    const watchLaterCourseIds = watchLaterCourses.map((watchLater) => watchLater.courseId);

    // Fetch courses that the user has added to watch later
    const allCourses = await db.course.findMany({
      where: {
        id: {
          in: watchLaterCourseIds,
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
        const { progressPercentage } = await getProgress(userId, course.id);
        courseWithProgress.progress = progressPercentage;
        return courseWithProgress;
      })
    );

    return NextResponse.json({ watchLaterCourses: coursesWithProgress }, { status: 200 });
  } catch (error) {
    console.error("[GET_WATCH_LATER_COURSES]", error);
    return NextResponse.json({
      error: 'Failed to fetch watch later courses',
      watchLaterCourses: [],
    }, { status: 500 });
  }
}
