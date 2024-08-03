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
import Image from 'next/image';
   

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
      }, [user]);

    return (<div className=''>
     <DropdownMenu >
      <DropdownMenuTrigger asChild>
     <Bell className="text-gray-600 cursor-pointer" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="md:w-[400px]"
        sideOffset={15} // Adjust vertical offset
        align="start" // Align to the start (left) of the trigger
        alignOffset={-500} // Adjust horizontal offset
       >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          
        {notifications.map((notification) => (
          <> <DropdownMenuItem key={notification.id} className='flex  space-x-2'>
                <Image
                src={notification.teacherImage} // Use dynamic teacher image URL
                alt='teacher image'
                className='rounded-full'
                height={40}
                width={40}
                />
                <div className='flex flex-col text-left'>
                    <div className='flex items-center  space-x-1'>
                        <h6 className='text-md font-medium truncate max-w-[210px]'>{notification.courseName}</h6>
                        <p className='text-xs text-slate-500 md:min-w-[115px]'>{notification.timeAgo}</p>
                    </div>
                    <p className='text-sm font-light truncate max-w-[280px]'>{notification.content}</p>
                </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            </>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>)
}
export default NotificationBar;