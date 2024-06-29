import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
) {
  try {
    const user = await currentUser();
    let userId = user?.id ?? "";

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = await req.json();
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
        return new NextResponse("Already exists in Watch Later", { status: 409 });
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

