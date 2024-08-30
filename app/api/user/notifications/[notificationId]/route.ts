import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db"; // Import your database client
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { notificationId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id ?? "";

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the notification to be updated
    const notification = await db.notification.findUnique({
      where: { id: params.notificationId },
    });

    if (!notification) {
      return new NextResponse("Notification not found", { status: 404 });
    }

    if (notification.userId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Update the notification to mark it as read
    const updatedNotification = await db.notification.update({
      where: { id: params.notificationId },
      data: { isRead: true },
    });

    return NextResponse.json({ updatedNotification }, { status: 200 });
  } catch (error) {
    console.log("[MARK_READ_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
