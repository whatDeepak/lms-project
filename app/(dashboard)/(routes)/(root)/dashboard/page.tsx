"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateDialog } from "@/components/dashboard/update-dialog";
import { db } from "@/lib/db";
import { CalendarDateRangePicker } from "../../../components/date-range-picker";
import DoughnutChart from "../../../components/doughnutChart";
import { CoursesList } from "@/components/courses-list";
import { getCourses } from "@/actions/Courses/get-courses";
import { redirect } from "next/navigation";
import { CourseCard } from "@/components/course-card";
import { InfoCard } from "./_components/info-card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  USER = "USER",
}

const Dashboard = () => {
  const user = useCurrentUser();
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState<any>();
  if (!user) {
    redirect("/");
  }
  useEffect(() => {
    const checkRollNo = () => {
      try {
        if (user && user?.role === UserRole.USER && user.rollNo === "") {
          setShowDialog(true);
        } else {
          setShowDialog(false);
        }
      } catch (error) {
        console.error("Error checking rollNo:", error);
      }
    };
    console.log("roll:", user?.rollNo);
    checkRollNo();
  }, [user]);



  const handleCloseDialog = () => {
    // Close the Dialog
    setShowDialog(false);
  };

  return (
    <>
      {showDialog && user && (
        <UpdateDialog onClose={() => setShowDialog(false)} userId={user?.id} />
      )}
      <div className="flex flex-col md:flex-row">
        {/* Main content area */}
        <div className="flex-1 p-4 space-y-6 md:mr-72">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
            <InfoCard userId={user.id!} />
          </div>
          {/* <CoursesList items={} /> */}
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
            <CourseCard
              key="1"
              id="1"
              title="Web Development by XYZ"
              imageUrl="/image.png"
              chaptersLength={50}
              progress={50}
              category="Web Development"
            />
            <CourseCard
              key="2"
              id="2"
              title="Web Development by XYZ"
              imageUrl="/image.png"
              chaptersLength={50}
              progress={50}
              category="Web Development"
            />
            <CourseCard
              key="3"
              id="3"
              title="Web Development by XYZ"
              imageUrl="/image.png"
              chaptersLength={50}
              progress={50}
              category="Web Development"
            />
            <CourseCard
              key="4"
              id="4"
              title="Web Development by XYZ"
              imageUrl="/image.png"
              chaptersLength={50}
              progress={50}
              category="Web Development"
            />
            <CourseCard
              key="5"
              id="5"
              title="Web Development by XYZ"
              imageUrl="/image.png"
              chaptersLength={50}
              progress={50}
              category="Web Development"
            />
            <CourseCard
              key="6"
              id="6"
              title="Web Development by XYZ"
              imageUrl="/image.png"
              chaptersLength={50}
              progress={50}
              category="Web Development"
            />
          </div>
        </div>

        <div className=" hidden md:block fixed right-0 top-[80px] bottom-0 w-64 p-4 space-y-4 md:w-72 bg-white shadow-lg">
          <div className="min-h-[326px]">
            <CalendarDateRangePicker />
          </div>
          <DoughnutChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
