import { IconBadge } from "@/components/icon-badge";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CircleDollarSign, LayoutDashboard, ListChecks, File } from "lucide-react";
import { redirect } from "next/navigation";
import { DescriptionForm } from "../../courses/[courseId]/_components/description-form";
import AnnouncementList from "./_components/announcementList";
import { AnnouncementForm } from "./_components/announcement-form";


const CourseIdPage = async ({
    params
}:{
    params: {courseId: string}
}) => {

    const user = await currentUser();
    let userId = user?.id ?? "";

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      announcements: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });


  if (!course) {
    return redirect("/");
  }


  return ( 
    <>

    <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Previous announcement
              </h2>
            </div>
            <AnnouncementList
              initialData={course}
              courseId={course.id}
            />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Add announcement
              </h2>
            </div>
            <AnnouncementForm
              initialData={course}
              courseId={course.id}
            />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default CourseIdPage;