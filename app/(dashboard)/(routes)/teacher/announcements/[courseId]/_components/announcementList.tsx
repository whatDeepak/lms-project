import React from "react";
import { Announcement, Course } from "@prisma/client";
import { Bell, ViewIcon } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type AnnouncementListProps = {
  initialData: Course & { announcements: Announcement[] };
  courseId: string;
};

const AnnouncementList: React.FC<AnnouncementListProps> = ({
  initialData,
  courseId,
}: AnnouncementListProps) => {
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      {initialData.announcements.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No announcements yet
            </p>
          )}
          {initialData.announcements.length > 0 && (
            <div className="space-y-2">
              {initialData.announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <Bell className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1 mr-1">
                    {announcement.content}
                  </p>
                        
                   <div className="flex items-center ml-auto space-x-1">
                        <p className="text-xs text-slate-500 w-[110px]">
                  {formatDistanceToNow(new Date(announcement.createdAt))} ago
                </p>
                        
                     <Link  href={`${courseId}/announcement/${announcement.id}`}  className="pr-2  flex ">
                       <ViewIcon
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                     </Link>
                  </div>
              
                </div>
              ))}
            </div>
          )}
    </div>
  );
};

export default AnnouncementList;
