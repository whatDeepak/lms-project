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
        const totalCourses = await db.course.count({
            where: {
                userId: id
            },
        });

        return NextResponse.json({ totalCourses });
    } catch (error) {
        console.log("[TOTAL COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
