import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

type progressProps = {
  progressPercentage: number;
  totalChapters: number;
  completedChapters: number;
};

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: progressProps;
};

export const CourseNavbar = ({
  course,
  progress,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progress={progress}
      />
      <NavbarRoutes />      
    </div>
  )
}