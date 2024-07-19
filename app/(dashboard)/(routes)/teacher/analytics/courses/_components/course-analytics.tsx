import { DataTable } from "./data-table"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { columns } from "./columns";


const CourseAnalytics = async () => {
    const user = await currentUser();
    let userId = user?.id ?? "";

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
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


export default CourseAnalytics;