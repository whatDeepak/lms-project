"use client";

import { useEffect, useState } from "react";
import { OverviewChart } from "./overview-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Activity, Library } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { SkeletonLoader } from "./skeleton-loader";

type RecentStudent = {
  name: string;
  courseTitle: string;
  date: string;
  image: string;
};

export function AnalyticsDashboard() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [recentStudents, setRecentStudents] = useState<RecentStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // Fetch all data concurrently
        const [coursesResponse, studentsResponse, enrollmentsResponse, recentStudentsResponse] = await Promise.all([
          fetch('/api/teacher/analytics/total-courses'),
          fetch('/api/teacher/analytics/total-students'),
          fetch('/api/teacher/analytics/enrollments'),
          fetch('/api/teacher/analytics/recent-students'),
        ]);

        const [coursesData, studentsData, enrollmentsData, recentStudentsData] = await Promise.all([
          coursesResponse.json(),
          studentsResponse.json(),
          enrollmentsResponse.json(),
          recentStudentsResponse.json(),
        ]);

        setTotalCourses(coursesData.totalCourses);
        setTotalStudents(studentsData.totalStudents);
        setEnrollments(enrollmentsData.enrollments);
        setRecentStudents(recentStudentsData.recentStudents);
      } catch (error) {
        console.error('Failed to fetch analytics data', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Courses
            </CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              +5 from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">hahaha</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">loll</div>
            <p className="text-xs text-muted-foreground">
              idk
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">hehehe</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">lmao</div>
            <p className="text-xs text-muted-foreground">
              wtf
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <OverviewChart data={enrollments} />
        
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentStudents.map((student, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={student.image} alt="Avatar" />
                  <AvatarFallback><FaUser className="text-white" /></AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {student.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {student.courseTitle}
                  </p>
                </div>
                <div className="ml-auto font-medium">{student.date}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
