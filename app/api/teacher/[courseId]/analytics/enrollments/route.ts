import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const user = await currentUser();
    const userId = user?.id ?? "";

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = params;

    if (!courseId) {
      return new NextResponse("Bad Request: Missing courseId", { status: 400 });
    }

    // Fetch enrollments count
    const enrollments = await db.purchase.count({
      where: { courseId: String(courseId) }
    });

    // Fetch all chapters for the given courseId
    const chapters = await db.chapter.findMany({
      where: { courseId: String(courseId) }
    });

    const totalChapters = chapters.length;

    // Fetch users who have completed all chapters in the course
    const completedCourses = await db.userProgress.findMany({
      where: {
        chapterId: { in: chapters.map(chapter => chapter.id) },
        isCompleted: true
      },
      select: {
        userId: true,
        chapterId: true
      }
    });

    // Group by userId and count completed chapters
    const userCompletionCount = completedCourses.reduce((acc: { [key: string]: number }, record) => {
      acc[record.userId] = (acc[record.userId] || 0) + 1;
      return acc;
    }, {});

    // Filter users who have completed all chapters
    const completions = Object.values(userCompletionCount).filter(count => count === totalChapters).length;

    return NextResponse.json({ enrollments, completions });
  } catch (error) {
    console.error("Error fetching course analytics:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
