"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Library } from "lucide-react";
import { useParams } from "next/navigation";

export function CourseAnalytics() {
  const { courseId } = useParams();
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalCompletions, setTotalCompletions] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [averageQuizScore, setAverageQuizScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/teacher/${courseId}/analytics/enrollments`);
        const data = await response.json();
        setTotalEnrollments(data.enrollments);
        setTotalCompletions(data.completions);
        setCourseName(data.courseName);
        setAverageQuizScore(data.averageQuizScore);
      } catch (error) {
        console.error('Failed to fetch course analytics data', error);
      }
    }

    fetchData();
  }, [courseId]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="text-3xl font-bold text-custom-primary">{courseName}</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrollments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageQuizScore.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* <OverviewChart data={progress} />
        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {progress.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={item.user.image} alt="Avatar" />
                  <AvatarFallback><FaUser className="text-white" /></AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{item.user.name}</p>
                  <p className="text-sm text-muted-foreground">{item.user.email}</p>
                </div>
                <div className="ml-auto font-medium">{item.watchedPercentage}%</div>
              </div>
            ))}
          </CardContent>
        </Card> */}
      </div>
    </main>
  );
}
