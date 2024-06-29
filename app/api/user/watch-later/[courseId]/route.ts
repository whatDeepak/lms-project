import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string } }
  ) {
    try {
      const user = await currentUser();
      let userId = user?.id ?? "";
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
  
  
     // Perform the deletion based on userId and courseId
     const deletedWatchLater = await db.watchLater.delete({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: params.courseId,
        },
      },
    });
  
  
      return NextResponse.json(deletedWatchLater);
    } catch (error) {
      console.log("[Temove_From_WatchLater]]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  