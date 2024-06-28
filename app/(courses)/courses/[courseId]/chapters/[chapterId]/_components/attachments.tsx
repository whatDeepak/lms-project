"use client";

import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import { useEffect, useState } from "react";
import SkeletonLoaderAttachments from "./skeleton-loader-attachments";

interface AttachmentProps {
    attachments: {
        id: string;
        name: string;
        url: string;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
    
};

export const CourseProgressButton = ({
    attachments
}: AttachmentProps) => {
 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (attachments!==null) {
        setLoading(false);
      }
    }, [attachments]);
  
    if (loading) {
      return <SkeletonLoaderAttachments />;
    }
  return (
    <div className="flex flex-col">
             
           <h2 className="text-lg font-medium ml-4 pb-4">Attachments</h2>
            {!!attachments.length && (
            <>
                {attachments.map((attachment) => (
                  <div key={attachment.id}>
              <div  className="pb-2  w-full" >
                  <a 
                    href={attachment.url}
                    target="_blank"
                    
                    className="flex items-center  p-3 w-full  border text-slate-500 text-sm font-[500] rounded-md hover:underline transition-all hover:text-input-border hover:bg-slate-300/20"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
              </div>
                <Separator />
                </div>
                ))}
            </>
          )}
            </div>
  )
}