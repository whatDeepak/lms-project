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
                if (user &&user?.role === UserRole.USER && user.rollNo==="") {
                    setShowDialog(true);
                } else {
                    setShowDialog(false);
                }
            } catch (error) {
                console.error("Error checking rollNo:", error);
            }
        };
     console.log("roll:",user?.rollNo);
        checkRollNo();
    }, [user]);

    const handleCloseDialog = () => {
        // Close the Dialog
        setShowDialog(false);
    };

    return (
        <>
            <p>
                Hello world!!
                {showDialog && user && (
                    <UpdateDialog
                        onClose={() => setShowDialog(false)}
                        userId={user?.id}
                    />
                )}
            </p>
        </>
    );
};

export default Dashboard;