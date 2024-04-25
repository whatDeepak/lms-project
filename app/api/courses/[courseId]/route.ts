import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const user = await currentUser();
//     let userId = user?.id ?? "";

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId: userId,
//       },
//       include: {
//         chapters: {
//           include: {
//             muxData: true,
//           }
//         }
//       }
//     });

//     if (!course) {
//       return new NextResponse("Not found", { status: 404 });
//     }

//     for (const chapter of course.chapters) {
//       if (chapter.muxData?.assetId) {
//         await video.assets.delete(chapter.muxData.assetId);
//       }
//     }

//     const deletedCourse = await db.course.delete({
//       where: {
//         id: params.courseId,
//       },
//     });

//     return NextResponse.json(deletedCourse);
//   } catch (error) {
//     console.log("[COURSE_ID_DELETE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    let userId = user?.id ?? "";
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}