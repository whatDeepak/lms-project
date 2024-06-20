import { CheckCircle, Clock, LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface InfoCardProps {
  userId: string
}

type CourseWithProgress = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  progress: number | null;
  category: { id: string; name: string };
  chapters: { id: string; title: string; isPublished: boolean }[];
};

type DashboardCourses = {
  completedCourses: CourseWithProgress[];
  coursesInProgress: CourseWithProgress[];
};
export const InfoCard =({
  userId
}: InfoCardProps) => {
    const [dashboardCourses, setDashboardCourses] = useState<DashboardCourses | null>(null);

    useEffect(() => {
      const fetchDashboardCourses = async () => {
        try {
          const response = await fetch(`/api/dashboardcourses?userId=${userId}`);
          const data: DashboardCourses = await response.json();
          setDashboardCourses(data);
        } catch (error) {
          console.error("Failed to fetch dashboard courses:", error);
        }
      };
  
      fetchDashboardCourses();
    }, [userId]);
  
  return (
    // <div className="border rounded-md flex items-center gap-x-2 p-3">
    //   <IconBadge
    //     variant={variant}
    //     icon={Icon}
    //   />
    //   <div>
    //     <p className="font-medium">
    //       {label}
    //     </p>
    //     <p className="text-gray-500 text-sm">
    //       {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
    //     </p>
    //   </div>
    // </div>
<>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <IconBadge size="sm"  icon={Clock} />
        <CardTitle className="text-sm font-medium">Courses In Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl text-center font-bold">{dashboardCourses?.coursesInProgress.length}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <IconBadge size="sm"  icon={CheckCircle} />
        <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl text-center font-bold">{dashboardCourses?.coursesInProgress.length}</div>
      </CardContent>
    </Card>
</>
  );
};
