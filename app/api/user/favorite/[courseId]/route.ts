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
  
  
      // Add course to favorites
      const favoriteCourse = await db.favoriteCourse.create({
        data: {
          userId,
          courseId,
        },
      });
  
      return NextResponse.json(favoriteCourse);
    } catch (error) {
      console.log("[Add_To_Favorites]", error);
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

    const { courseId } = params;
    // Remove course from favorites
    const deletedFavorite = await db.favoriteCourse.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return NextResponse.json(deletedFavorite);
  } catch (error) {
    console.log("[Remove_From_Favorite]]", error);
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
    const existingEntry = await db.favoriteCourse.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return NextResponse.json({ isFavorite: !!existingEntry });
  } catch (error) {
    console.log("[Check_Favorite_Status]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
