"use client";
import { redirect} from "next/navigation";
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

const CollectionFavoritePage = () => {
  const user = useCurrentUser();

  const [favoriteCourses, setfavoriteCourses] = useState<Courses | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return redirect("/");
    }
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/user/favorite?userId=${user.id}`);
        const data = await response.json();
        setfavoriteCourses(data.favoriteCourses);
        console.log(favoriteCourses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);


  if (loading || !favoriteCourses) {
    return <div>Loading...</div>;
  }
  return (
    <>
        <CoursesList items={favoriteCourses} />
    </>
  );
};

export default CollectionFavoritePage;
