import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/Courses/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { currentUser } from "@/lib/auth";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

// As this is the server component , we can access the paramas directly from props.
const BrowsePage = async ({
  searchParams
}: SearchPageProps) => {
  const user = await currentUser();
  let userId = user?.id ?? "";

if (!userId) {
  return redirect("/");
}


  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
   userId: userId ,
    ...searchParams,
  });

  return (
    <>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default BrowsePage;