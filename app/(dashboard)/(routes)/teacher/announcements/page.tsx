import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";


const CourseAnnouncementPage = async () => {
    const user = await currentUser();
    let userId = user?.id ?? "";

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
            isPublished:true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    )
}


export default CourseAnnouncementPage;