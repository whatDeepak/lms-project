"use client";

import { IconBadge } from "@/components/icon-badge";
import { CheckCircleIcon, LayoutDashboard, Loader } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "qs";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const NotificationPage = () => {
  const [notification, setNotification] = useState<{
    id?: string;
    courseName?: string;
    content?: string;
    timeAgo?: string;
    teacherImage?: string;
    isRead?: boolean;
  }>({});
  const [loading, setloading]=useState(true);
  const [markingRead, setmarkingRead]=useState(false);
  

  useEffect(() => {
    setloading(true);
    // This code will run only on the client side
    const queryString = window.location.search.substring(1); // Get the query string from the URL
    const parsedNotification = qs.parse(queryString) as {
      id?: string;
      courseName?: string;
      content?: string;
      timeAgo?: string;
      teacherImage?: string;
      isRead?: string | string[] | undefined;
    };

    // Convert 'isRead' to boolean if it's a string
    const isRead = Array.isArray(parsedNotification.isRead)
      ? parsedNotification.isRead[0] === 'true'
      : parsedNotification.isRead === 'true';

    setNotification({
      id: parsedNotification.id,
      courseName: parsedNotification.courseName,
      content: parsedNotification.content,
      timeAgo: parsedNotification.timeAgo,
      teacherImage: parsedNotification.teacherImage,
      isRead: isRead === true, // Ensure it's boolean
    });

    // Redirect if no valid notification data
    if (!parsedNotification.courseName || !parsedNotification.content) {
      redirect("/");
    }
    setloading(false);
  }, []);

  const { id,courseName, content, timeAgo, teacherImage, isRead } = notification;


  const handleMarkAsRead = async () => {
    setmarkingRead(true);
      try {
        await axios.patch(`/api/user/notifications/${id}`);
        setNotification(prev => ({ ...prev, isRead: true }));
        toast.success("Successully, Marked as Read")
      } catch (error) {
        toast.error("Failed to mark notification as read");
        console.error("Failed to mark notification as read:", error);
      }
      finally{

          setmarkingRead(false);
      }
  };

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
          <h6 className="text-lg font-medium max-w-[350px] truncate">{courseName}</h6>
        </div>
        <p className="text-sm pt-3">{content}</p>
        <p className="text-xs font-light pt-4">{timeAgo}</p>
      </div>

      <div>
      {!loading && (
    !isRead ? (
      <Button type="button" onClick={handleMarkAsRead}>
        { markingRead ?  <Loader className="h-4 w-4 text-white animate-spin" /> :  "Mark as Read"} 
      </Button>
    ) : (
      <Button disabled variant="outline">
        <CheckCircleIcon className="h-5 w-5 text-custom-primary mr-1" aria-hidden="true" /> Already Read
      </Button>
    )
  )}
      </div>
    </div>
  );
};

export default NotificationPage;
