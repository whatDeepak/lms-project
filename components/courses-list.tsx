//import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";

// type CourseWithProgressWithCategory = Course & {
//   category: Category | null;
//   chapters: { id: string }[];
//   progress: number | null;
// };
type CourseWithProgressWithCategory = {
  category: string;
  chapters: { id: string }[];
  progress: number | null;
};
interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
//   items
}
// : CoursesListProps
) => {
  return (
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
        {/* {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
      
        ))} */}
            <CourseCard
            key="1"
            id="1"
            title="Web Development by XYZ"
            imageUrl="/image.png"
            chaptersLength={50}
            price={100}
            progress={50}
            category="Web Development"
          />
            <CourseCard
            key="2"
            id="2"
            title="Web Development by XYZ"
            imageUrl="/image.png"
            chaptersLength={50}
            price={100}
            progress={50}
            category="Web Development"
          />
            <CourseCard
            key="3"
            id="3"
            title="Web Development by XYZ"
            imageUrl="/image.png"
            chaptersLength={50}
            price={100}
            progress={50}
            category="Web Development"
          />
            <CourseCard
            key="4"
            id="4"
            title="Web Development by XYZ"
            imageUrl="/image.png"
            chaptersLength={50}
            price={100}
            progress={50}
            category="Web Development"
          />
            <CourseCard
            key="5"
            id="5"
            title="Web Development by XYZ"
            imageUrl="/image.png"
            chaptersLength={50}
            price={100}
            progress={50}
            category="Web Development"
          />
            <CourseCard
            key="6"
            id="6"
            title="Web Development by XYZ"
            imageUrl="/image.png"
            chaptersLength={50}
            price={100}
            progress={50}
            category="Web Development"
          />
      </div>
    //   {/* {items.length === 0 && ( 
    //      <div className="text-center text-sm text-muted-foreground mt-10">
    //       No courses found
    //     </div>
    //    )} */}  
  )
}