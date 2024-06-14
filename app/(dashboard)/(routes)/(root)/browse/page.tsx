import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/Courses/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { useCurrentUser } from "@/hooks/use-current-user";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const BrowsePage = async ({
  searchParams
}: SearchPageProps) => {
  const user = useCurrentUser();

  if (!user) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
   userId: user.id!   ,
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
 
export default SearchPage;