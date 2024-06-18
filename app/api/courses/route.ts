import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
) {
  try {
    const user = await currentUser();
    let userId = user?.id ?? "";
    
    const { title } = await req.json();

    if (!user || user?.role !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}