"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateDialog } from "@/components/dashboard/update-dialog";
import { db } from "@/lib/db";
import  CalendarDateRangePicker  from "../../../_components/date-range-picker";
import DoughnutChart from "../../../_components/doughnutChart";
import { redirect } from "next/navigation";
import DashboardCoursesCard from "./_components/dashboard-courses";
import { trackUserActivity } from "@/lib/trackUserActivity";
import axios from "axios";
import toast from "react-hot-toast";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  USER = "USER",
}

interface CategoryData {
  category: string;
  percentage: number;
}

const Dashboard = () => {
  const user = useCurrentUser();
  const [showDialog, setShowDialog] = useState(false);
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
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
    checkRollNo();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/analytics/doughnutData?userId=${user.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setChartData({ labels: data.labels, data: data.data });
        } else {
          console.error("Failed to fetch chart data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    const dailyCheckIn=async () => {
      try {
           const response= await axios.post(`/api/user/trackUserActivity`);
          if(response.data.message==="First time"){
            toast.success("Daily Check-in")
          }
      } catch (error) {
          console.error("Error tracking daily check-In progress:", error);
      }
    }

    fetchData();
    dailyCheckIn();
  }, [user.id]);

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
          <DashboardCoursesCard userId={user.id!} />
        </div>

        <div className=" hidden md:block fixed right-0 top-[80px] bottom-0 w-64 p-4 space-y-4 md:w-72 bg-white shadow-lg">
          <div className="min-h-[326px]">
            <CalendarDateRangePicker />
          </div>
          {chartData.data.length === 0 || chartData.labels.length === 0 ? (
            <div className="border border-gray-400 pt-0 rounded-xl my-auto h-[300px] flex items-center justify-center">
              <p>No data available</p>
            </div>
          ) : (
            <DoughnutChart labels={chartData.labels} data={chartData.data} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
