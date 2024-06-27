import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, rollNo } = body;

        if (!userId || !rollNo) {
            return new NextResponse('Missing userId or rollNo', { status: 400 });
        }

        await db.user.upsert({
            where: {
                id: userId,
            },
            update: {
                rollNo,
            },
            create: {
                id: userId,
                rollNo,
            },
        });

        return new NextResponse('Roll number updated', { status: 200 });
    } catch (error) {
        console.error("Error updating roll number:", error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
