import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const user: any = await currentUser();
        const id = user?.id ?? "";

        if (!id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch top 3 courses with highest enrollments
        const topCourses = await db.course.findMany({
            where: { userId: id },
            orderBy: {
                purchases: {
                    _count: 'desc',
                },
            },
            take: 3,
        });

        const topCourseIds = topCourses.map(course => course.id);
        const courseTitles = topCourses.reduce((acc: any, course) => {
            acc[course.id] = course.title;
            return acc;
        }, {});

        // Fetch enrollments for these top 3 courses in the last 30 days
        const enrollments = await db.purchase.findMany({
            where: {
                courseId: { in: topCourseIds },
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
                },
            },
            include: {
                course: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        // Transform enrollments to match chartData format
        const transformedEnrollments = enrollments.reduce((acc: any, enrollment) => {
            const date = enrollment.createdAt.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            const courseId = enrollment.courseId;
            if (!acc[date]) {
                acc[date] = { date };
            }
            acc[date][courseTitles[courseId]] = (acc[date][courseTitles[courseId]] || 0) + 1;
            return acc;
        }, {});

        const result = Object.values(transformedEnrollments);
        
        return NextResponse.json({ enrollments: result, courseTitles });
    } catch (error) {
        console.error("[FETCH ENROLLMENTS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
