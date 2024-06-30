import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id ?? "";

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = params;
     // Check if the entry already exists
     const existingEntry = await db.watchLater.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEntry) {
      return new NextResponse("Already exists in Favorites", { status: 409 });
    }


    const watchLater = await db.watchLater.create({
      data: {
        userId,
        courseId,
      },
    });

   
    return NextResponse.json(watchLater);
  } catch (error) {
    console.log("[WAtch_Later_Add]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}




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
  
  export async function GET(
    req: Request,
    { params }: { params: { courseId: string } }
  ) {
    try {
      const user = await currentUser();
      const userId = user?.id ?? "";
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const { courseId } = params;
  
      // Check if the course is already in the watch later list
      const existingEntry = await db.watchLater.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });
  
      return NextResponse.json({ inWatchLater: !!existingEntry });
    } catch (error) {
      console.log("[Check_Watch_Later_Status]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }