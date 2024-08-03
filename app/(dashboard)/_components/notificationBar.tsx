"use client"
import { Bell } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { useCurrentUser } from '@/hooks/use-current-user';
import { redirect } from 'next/navigation';
   

type notificationBarProps = {
    
};
type Notification = {
    id: string;
    courseName: string;
    content: string;
    teacherImage: string;
    timeAgo: string;
    isRead: boolean;
  };
const NotificationBar:React.FC<notificationBarProps> = (

) => {
    const user = useCurrentUser();
     const [notifications, setNotifications] = useState<Notification[]>([]);

     useEffect(() => {
        if (!user) {
            return redirect("/");
          }
        // Fetch notifications when the component mounts
        const fetchNotifications = async () => {
          try {
            const response = await axios.get(`/api/user/notifications?userId=${user.id}`); // Adjust the endpoint as necessary
            setNotifications(response.data.Notifications);
            console.log("Notifications: " ,response.data.Notifications);
          } catch (error) {
            console.error('Error fetching notifications:', error);
          }
        };
    
        fetchNotifications();
      }, []);

    return (<div className=''>
     <DropdownMenu >
      <DropdownMenuTrigger asChild>
     <Bell className="text-gray-600 cursor-pointer" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-96"
        sideOffset={15} // Adjust vertical offset
        align="start" // Align to the start (left) of the trigger
        alignOffset={-500} // Adjust horizontal offset
       >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          <DropdownMenuItem>
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
    </div>)
}
export default NotificationBar;