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

        // Fetch the last 5 purchases made by the user
        const recentPurchases = await db.purchase.findMany({
            include: {
                course: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 5,
        });

        // Extract user IDs from the purchases
        const userIds = recentPurchases.map(purchase => purchase.userId);

        // Fetch user details for these user IDs
        const users = await db.user.findMany({
            where: {
                id: { in: userIds },
            },
        });

        // Create a map of user IDs to user details (including name and image)
        const userMap = new Map(users.map(user => [user.id, { name: user.name, image: user.image }]));

        // Transform data to match the required format, including user image
        const transformedStudents = recentPurchases.map(purchase => ({
            name: userMap.get(purchase.userId)?.name || 'Unknown',
            courseTitle: purchase.course.title,
            date: purchase.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
            image: userMap.get(purchase.userId)?.image || '', // Use a default image if none exists
        }));

        return NextResponse.json({ recentStudents: transformedStudents });
    } catch (error) {
        console.error("[FETCH RECENT STUDENTS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
