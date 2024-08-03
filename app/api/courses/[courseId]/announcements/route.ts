import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    let userId = user?.id ?? "";
    const { content } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create the announcement
    const newAnnouncement = await db.announcement.create({
      data: {
        content,
        courseId: params.courseId,
      },
    });

    // Fetch users enrolled in the course
    const enrolledUsers = await db.purchase.findMany({
      where: {
        courseId: params.courseId,
      },
      select: {
        userId: true,
      },
    });
    // Create notifications for each enrolled user
    const notifications = enrolledUsers.map((enrollment) => ({
     userId: enrollment.userId,
     courseId: params.courseId,
     announcementId: newAnnouncement.id,
     isRead: false,
     }));

    console.log(notifications);
    await db.notification.createMany({  data: notifications,  });



    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.log("[ANNOUNCEMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
