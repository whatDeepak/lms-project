"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateDialog } from "@/components/dashboard/update-dialog";
import { getUserByEmail, getUserById } from "@/data/user";

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
        const checkUserRoleAndRollNo = async () => {
            if (user?.role === UserRole.USER && !user.rollNo) {
                console.log(user.id);

                // const userData = await getUserById(user.id);
                  
                // console.log(userData);

                // const shouldShowDialog = userData && (!userData.rollNo || userData.rollNo === '');

                // if(shouldShowDialog)
                setShowDialog(true);
            } else {
                setShowDialog(false);
            }
        };

        checkUserRoleAndRollNo();
    }, [user]);

    return (
        <>
            <p>
                Hello world!!
                {showDialog && user && (
                    <UpdateDialog
                        onClose={() => setShowDialog(false)}
                        userId={user.id}
                    />
                )}
            </p>
        </>
    );
};

export default Dashboard;
