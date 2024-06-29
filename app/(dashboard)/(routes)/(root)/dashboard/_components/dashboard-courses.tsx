// components/DashboardCoursesCard.tsx

import React, { useState, useEffect } from "react";
import { Category, Chapter, Course } from "@prisma/client";
import { InfoCard } from "./info-card";
import { CheckCircle, Clock } from "lucide-react";
import SkeletonLoader from "./skeleton-loader";
import { CoursesList } from "./course-list";

type CourseWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

interface DashboardCoursesCardProps {
  userId: string;
}

type DashboardCourses = {
  completedCourses: CourseWithProgress[];
  coursesInProgress: CourseWithProgress[];
  additionalCourses: CourseWithProgress[];
};

const DashboardCoursesCard: React.FC<DashboardCoursesCardProps> = ({
  userId,
}) => {
  const [dashboardCourses, setDashboardCourses] =
    useState<DashboardCourses | null>(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchDashboardCourses = async () => {
      try {
        const response = await fetch(`/api/dashboardcourses?userId=${userId}`);
        const data: DashboardCourses = await response.json();
        setDashboardCourses(data);
      } catch (error) {
        console.error("Failed to fetch dashboard courses:", error);
      } finally {
        setLoading(false); // Turn off loading state when data is fetched
      }
    };

    fetchDashboardCourses();
  }, [userId]);

  if (loading || !dashboardCourses) {
    return <SkeletonLoader />; // Show skeleton loading component while waiting for data or if no data
  }

  const { coursesInProgress, completedCourses, additionalCourses } =
    dashboardCourses;

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

      {/* Section for User Courses */}
      {(coursesInProgress.length > 0 || completedCourses.length > 0) && (
        <div className="mt-4">
          <h2 className="text-xl font-normal pb-2">Your Courses</h2>
          <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
      )}

      {/* Section for Recommended/Suggested Courses */}
      {additionalCourses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-normal pb-2">Recommended Courses</h2>
          <CoursesList items={additionalCourses} />
        </div>
      )}

      {/* Display message if no purchased or recommended courses */}
      {coursesInProgress.length === 0 &&
        completedCourses.length === 0 &&
        additionalCourses.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No courses found
          </div>
        )}
    </div>
  );
};

export default DashboardCoursesCard;
