"use client";
import { redirect, usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { Category, Chapter, Course } from "@prisma/client";
import { CoursesList } from "@/app/(dashboard)/_components/course-list";

type CourseWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type Courses =  CourseWithProgress[];

const CollectionWatchListPage = () => {
    const user = useCurrentUser();

  const [watchlistCourses, setwatchlistCourses] = useState<Courses | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return redirect("/");
    }
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/user/watch-later?userId=${user.id}`);
        const data = await response.json();
        setwatchlistCourses(data.watchLaterCourses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);


  if (loading || !watchlistCourses) {
    return <div>Loading...</div>;
  }
  return (
    <>
     
        <CoursesList items={watchlistCourses} />
    </>
  );
};

export default CollectionWatchListPage;
