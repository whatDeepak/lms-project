import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import { checkPurchase } from "@/actions/Courses/get-purchase";
import { currentUser } from "@/lib/auth";

type progressProps = {
  progressPercentage: number;
  totalChapters: number;
  completedChapters: number;
};

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progress: progressProps;
};

export const CourseSidebar = async ({
  course,
  progress,
}: CourseSidebarProps) => {
  const user = await currentUser();
  let userId = user?.id ?? "";
  const purchased = await checkPurchase(userId, course.id);
   const completionText = `(${progress.completedChapters}/${progress.totalChapters})`;
  return (
    <div className="h-full w-72 border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchased && (
        <div className="mt-4">
          <p>
           Completed Chapters {completionText}
          </p>
          <div className="">
            <CourseProgress
              variant="success"
              value={progress.progressPercentage}
            />
          </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree }
          />
        ))}
      </div>
    </div>
  )
}