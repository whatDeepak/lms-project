"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateDialog } from "@/components/dashboard/update-dialog";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { CalendarDateRangePicker } from "../components/date-range-picker";
import { Overview } from "../components/overview";
import { RecentSales } from "../components/recent-sales";
import DoughnutChart from "../components/doughnutChart";
import { CoursesList } from "@/components/courses-list";


const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

enum UserRole {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    USER = 'USER'
}

const Dashboard = () => {
    const user = useCurrentUser();
    const [showDialog, setShowDialog] = useState(false);

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
                <UpdateDialog
                    onClose={() => setShowDialog(false)}
                    userId={user?.id}
                />
            )}
            <div className="flex flex-col md:flex-row">
                {/* Main content area */}
                <div className="flex-1 p-4 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Completed Courses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">25</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    In Progress Courses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">15</div>
                            </CardContent>
                        </Card>
                    </div>
                    <CoursesList />
                </div>
                
                <div className="w-56 md:w-64 lg:w-72 flex-shrink-0 p-4 space-y-4">
                    <CalendarDateRangePicker />
                    <DoughnutChart /> 
                </div>
            </div>
        </>
    );
};

export default Dashboard;