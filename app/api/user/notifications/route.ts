import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import { currentUser } from '@/lib/auth';



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    // Step 1: Fetch notifications with IDs
    const notifications = await db.notification.findMany({
        where: { userId },
        select: {
          id:true,
          announcementId: true,
          createdAt: true,
          isRead: true,
        },
        orderBy: {
          createdAt: 'desc', // Sort by most recent first
        },
        take: 12
      });
  
      if (notifications.length === 0) {
        return NextResponse.json({ Notifications: [] }, { status: 200 });
      }
      // Step 2: Fetch announcements and courses using the announcement IDs
      const announcementIds = notifications.map(notification => notification.announcementId);

      const announcements = await db.announcement.findMany({
        where: { id: { in: announcementIds } },
        include: {
          course: true, // Fetch course details with userId
        },
      });

    // Step 3: Fetch teachers' profile images using userIds from courses
    const courseUserIds = Array.from(new Set(announcements.map(ann => ann.course.userId)));
    const teachers = await db.user.findMany({
        where: { id: { in: courseUserIds } },
        select: {
          id: true,
          image: true,
        },
      });
  

    // Step 4: Map notifications to include announcement and course details
    const formattedNotifications = notifications.map(notification => {
        const announcement = announcements.find(ann => ann.id === notification.announcementId);
        if (!announcement) {
          return null;
        }
  
        const timeAgo = formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true });
  
        // Find teacher image for the course
        const teacherImage = teachers.find(teacher => teacher.id === announcement.course.userId)?.image;
  
        return {
          id: notification.id,
          courseName: announcement.course.title,
          content: announcement.content,
          teacherImage,
          timeAgo,
          isRead: notification.isRead,
        };
      }).filter(notification => notification !== null);

 

    return NextResponse.json({ Notifications: formattedNotifications }, { status: 200 });


  } catch (error) {
    console.error("[GET_NOTIFICATIONS_ERROR]", error);
    return NextResponse.json({
      error: 'Failed to fetch notifications',
      Notifications: [],
    }, { status: 500 });
  }
}



export async function PATCH(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id ?? "";

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update all notifications for the user to mark as read
    const updatedNotifications = await db.notification.updateMany({
      where: { userId: userId, isRead: false }, // Only update notifications that are not read
      data: { isRead: true },
    });

    return NextResponse.json({ updatedNotifications }, { status: 200 });
  } catch (error) {
    console.log("[MARK_ALL_READ_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

