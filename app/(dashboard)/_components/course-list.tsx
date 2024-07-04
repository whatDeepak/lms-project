"use client"
import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
   items
}
 : CoursesListProps
) => {
    const path= usePathname();
    const isCollectionPage=path.includes("collection");
  return (
    <>
      <div 
      className={cn("grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ",
        isCollectionPage && "md:grid-cols-3 lg:grid-cols-4"
      )}
      >
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            progress={item.progress}
            category={item?.category?.name!}
          />
      
        ))}
  
      </div>
      
      {items.length === 0 && ( 
         <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
       ) }
    </>
  )
}