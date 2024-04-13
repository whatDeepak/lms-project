"use client"

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateDialog } from "@/components/dashboard/update-dialog";
import { set } from "date-fns";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  USER = 'USER'
}

const Dashboard = () =>  {
  const user = useCurrentUser();
  const [showDialog, setShowDialog] = useState(false);

  // Use useEffect to control the dialog visibility based on user.role
  useEffect(() => {
    const hasShownPopover = localStorage.getItem('popoverShown');
    // Check if user.role is empty and set showDialog state
    // if ((user?.role ===  || user?.role === undefined)) {
    //     setShowDialog(true);
    // } else {
    //     setShowDialog(false);
    // }
     if(!hasShownPopover && user?.role==='USER' ){
      setShowDialog(true);
      
     }
  }, [user]);
  
  return (
    <>
      <p>
        Hello world!!
        {showDialog  && <UpdateDialog userId={user?.id} onClose={() => {setShowDialog(false);localStorage.setItem('popoverShown', 'true');}} />}
      </p>
    </>
  )
}

export default Dashboard;