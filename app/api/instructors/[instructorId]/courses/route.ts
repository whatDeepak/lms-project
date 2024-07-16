import { getProgress } from "@/actions/Courses/get-progress";
import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
type CourseWithProgress = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
  };
  

export async function GET(req: NextRequest, { params }: { params: { instructorId: string } }) {
    try {
        // Fetch all courses published by the instructor
        const courses = await db.course.findMany({
            where: {
                userId: params.instructorId
            },
            select: {
                id: true
            }
        });

        // Extract course IDs from fetched courses
        const courseIds = courses.map(course => course.id);

    // Fetch detailed course information and progress
    const allCourses = await db.course.findMany({
        where: {
          id: {
            in: courseIds,
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
          const { progressPercentage } = await getProgress(params.instructorId, course.id);
          courseWithProgress.progress = progressPercentage;
          return courseWithProgress;
        })
      );
  
      return NextResponse.json({ status: 200, courses: coursesWithProgress });
    } catch (error) {
        console.error("[GET_INSTRUCTOR_COURSES_ERROR]", error);
        return NextResponse.json({
          error: 'Failed to fetch instructor courses',
          courses: [],
        }, { status: 500 });
      }
    }
