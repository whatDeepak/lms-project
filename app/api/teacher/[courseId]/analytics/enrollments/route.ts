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

    // Fetch course title
    const course = await db.course.findUnique({
      where: { id: String(courseId) },
      select: { title: true }
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    // Get total enrollments
    const enrollments = await db.purchase.count({
      where: { courseId: String(courseId) }
    });

    // Get all chapters for the course
    const chapters = await db.chapter.findMany({
      where: { courseId: String(courseId) }
    });

    const totalChapters = chapters.length;

    // Get completed courses
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

    const userCompletionCount = completedCourses.reduce((acc: { [key: string]: number }, record) => {
      acc[record.userId] = (acc[record.userId] || 0) + 1;
      return acc;
    }, {});

    const completions = Object.values(userCompletionCount).filter(count => count === totalChapters).length;

    // Fetch quiz scores
    const quizScores = await db.quizAttempt.findMany({
      where: {
        quiz: {
          chapter: {
            courseId: String(courseId)
          }
        }
      },
      select: { score: true }
    });

    // Calculate average score
    const averageQuizScore = quizScores.length > 0 ? quizScores.reduce((acc, curr) => acc + curr.score, 0) / quizScores.length : 0;

    return NextResponse.json({ enrollments, completions, courseName: course.title, averageQuizScore });
  } catch (error) {
    console.error("Error fetching course analytics:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
