import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const user: any = await currentUser();
        const id = user?.id ?? "";

        if (!id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch the IDs of courses owned by the current user
        const courses = await db.course.findMany({
            where: { userId: id },
            select: { id: true },
        });

        if (courses.length === 0) {
            return NextResponse.json({ totalStudents: 0 });
        }

        const courseIds = courses.map(course => course.id);

        // Fetch unique students who have purchased these courses
        const uniqueStudents = await db.purchase.findMany({
            where: { courseId: { in: courseIds } },
            select: { userId: true },
            distinct: ['userId'],
        });

        const totalStudents = uniqueStudents.length;

        return NextResponse.json({ totalStudents });
    } catch (error) {
        console.log("[TOTAL STUDENTS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
