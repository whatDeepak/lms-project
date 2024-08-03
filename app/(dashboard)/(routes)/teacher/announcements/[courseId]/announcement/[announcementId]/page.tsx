import { IconBadge } from "@/components/icon-badge";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";


const CourseIdPage = async ({
    params
}:{
    params: {announcementId: string}
}) => {

    const user = await currentUser();
    let userId = user?.id ?? "";

  if(!userId){
   return redirect("/");
  }
  const announcement = await db.announcement.findUnique({
    where: {
      id: params.announcementId,
    },
  });


  if (!announcement) {
    return redirect("/teacher/announcements");
  }


  return ( 
    <>

    <div className="p-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Your Announcement
              </h2>
            </div>
          </div>

          <div className="mt-6 border bg-slate-100 rounded-md p-4 max-w-[450px]">
     
        <p className= "text-sm mt-2 "
        >
          {announcement?.content}
        </p>
     
    </div>

        </div>
    </>
  );
}

export default CourseIdPage;