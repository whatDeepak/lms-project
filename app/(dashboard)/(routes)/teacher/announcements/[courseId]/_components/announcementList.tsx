import React from "react";
import { Announcement, Course } from "@prisma/client";
import { File } from "lucide-react";

type AnnouncementListProps = {
  initialData: Course & { announcements: Announcement[] };
  courseId: string;
};

const AnnouncementList: React.FC<AnnouncementListProps> = ({
  initialData,
  courseId,
}: AnnouncementListProps) => {
  return (
    <div>
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
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {announcement.content}
                  </p>
              
                </div>
              ))}
            </div>
          )}
    </div>
  );
};

export default AnnouncementList;
