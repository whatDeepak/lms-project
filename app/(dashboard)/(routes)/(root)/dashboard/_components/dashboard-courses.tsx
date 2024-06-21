// components/DashboardCoursesCard.tsx

import React, { useState, useEffect } from "react";
import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/Courses/get-progress";
import { InfoCard } from "./info-card";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import SkeletonLoader from "./skeleton-loader";

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

  if (loading) {
    return <SkeletonLoader />; // Show skeleton loading component while waiting for data
  }

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={dashboardCourses?.coursesInProgress.length ?? 0}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={dashboardCourses?.completedCourses.length ?? 0}
          variant="success"
        />
      </div>
      {dashboardCourses?.coursesInProgress.length === 0 &&
      dashboardCourses?.completedCourses.length === 0 ? (
        <div >
          <h2 className="text-xl font-normal py-4">Explore Courses</h2>
          <CoursesList
          items={[
            ...(dashboardCourses?.additionalCourses ?? []),
          ]}
        />
        </div>
      ) : (
        <CoursesList
          items={[
            ...(dashboardCourses?.coursesInProgress ?? []),
            ...(dashboardCourses?.completedCourses ?? []),
            ...(dashboardCourses?.additionalCourses ?? []),
          ]}
        />
      )}
    </div>
  );
};

export default DashboardCoursesCard;
