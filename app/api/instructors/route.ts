import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const instructorName= searchParams.get('instructor');
  
    try {
      // Fetch instructors
      let teachers;
    
      if (instructorName==="") {
        // Fetch all users with role TEACHER
        teachers = await db.user.findMany({
          where: {
            role: UserRole.TEACHER
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        });
      } else if(instructorName) {
        // Fetch users with role TEACHER and matching name
        teachers = await db.user.findMany({
          where: {
            role: UserRole.TEACHER,
            name: {
              contains: instructorName,
              mode: "insensitive" // Case insensitive search
            }
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        });
      }
      return NextResponse.json({ teachers }, { status: 200 });
    } catch (error) {
      console.error("[GET_INSTRUCTORS]", error);
      return NextResponse.json({
        error: 'Failed to fetch Instructors',
        teachers: [],
      }, { status: 500 });
    }
  }
  