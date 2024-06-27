import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { CourseSidebar } from "./course-sidebar";


type progressProps = {
  progressPercentage: number;
  totalChapters: number;
  completedChapters: number;
};
interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: progressProps;
};

export const CourseMobileSidebar = ({ 
  course,
  progress,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar
          course={course}
          progress={progress}
        />
      </SheetContent>
    </Sheet>
  )
}