import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./info-card";
import { getDashboardCourses } from "@/actions/Courses/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

interface DashboardCoursesCardProps {
  userId: string;
}

const DashboardCoursesCard = async ({
  userId
}: DashboardCoursesCardProps): Promise<JSX.Element> => {
  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
};

export default DashboardCoursesCard;
