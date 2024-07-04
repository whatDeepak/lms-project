import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { trackUserActivity } from "@/lib/trackUserActivity";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const user= await currentUser();
  if(!user?.id)redirect("/");

  
  const dailyCheckIn= await trackUserActivity(user?.id);

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });
     
  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
 
export default CourseIdPage;