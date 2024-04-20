"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateDialog } from "@/components/dashboard/update-dialog";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";

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
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-4 pt-3">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <div className="flex items-center space-x-2">
                            <CalendarDateRangePicker />
                            <Button>Download</Button>
                        </div>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>
                                Notifications
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Completed Courses
                                        </CardTitle>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">25</div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% from last month
                                        </p>
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
                                        <p className="text-xs text-muted-foreground">
                                            +180.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>

                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Overview />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Recent Sales</CardTitle>
                                        <CardDescription>
                                            You made 265 sales this month.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentSales />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </>
    );
};

export default Dashboard;