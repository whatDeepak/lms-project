"use client";

import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "qs";
import { Button } from "@/components/ui/button";

const NotificationPage = () => {
  const [notification, setNotification] = useState<{
    courseName?: string;
    content?: string;
    timeAgo?: string;
    teacherImage?: string;
  }>({});
  

  useEffect(() => {
    // This code will run only on the client side
    const queryString = window.location.search.substring(1); // Get the query string from the URL
    const parsedNotification = qs.parse(queryString); // Parse the query string into an object
    setNotification(parsedNotification);

    // Redirect if no valid notification data
    if (!parsedNotification || Object.keys(parsedNotification).length === 0) {
      redirect("/");
    }
  }, []);

  // Destructuring notification object for easy access
  const { courseName, content, timeAgo, teacherImage } = notification;

  return (
    <div className="p-6">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-xl">Your Notification</h2>
        </div>
      </div>

    
      <div className="my-6 border flex flex-col bg-slate-100 rounded-md p-4 max-w-[450px]">
        <div className="flex items-center space-x-2">
          {teacherImage && (
            <Image
              src={teacherImage} // Use dynamic teacher image URL
              alt="teacher image"
              className="rounded-full"
              height={50}
              width={50}
            />
          )}
          <h6 className="text-md font-medium">{courseName}</h6>
        </div>
        <p className="text-sm pt-3">{content}</p>
        <p className="text-xs font-light pt-4">{timeAgo}</p>
      </div>

      <div>
        <Button >
          Mark as Read
        </Button>
      </div>
    </div>
  );
};

export default NotificationPage;
