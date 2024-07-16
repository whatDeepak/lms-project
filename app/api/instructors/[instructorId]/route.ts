import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { instructorId: string } }) {
  try {
    const instructor = await db.user.findUnique({
      where: { id: params.instructorId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!instructor) {
      return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
    }

    return NextResponse.json(instructor, { status: 200 });
  } catch (error) {
    console.error("[GET_INSTRUCTOR_DETAILS]", error);
    return NextResponse.json({ error: 'Failed to fetch instructor details' }, { status: 500 });
  }
}
