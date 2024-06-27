import Image from "next/image";
import Link from "next/link";
import { BookOpen, MoreVertical } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { CourseProgress } from "@/components/course-progress";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  progress,
  category,
}: CourseCardProps) => {
  
  const link=`${process.env.NEXT_PUBLIC_APP_URL}/courses/${id}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
      })
      .catch(err => {
        toast.error('Failed to copy email.');
      });
  };
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full relative">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill className="object-cover" alt={title} src={imageUrl} />
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <MoreVertical className="text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer border-none" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-0 w-20 py-1 bg-white rounded-sm">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <MdOutlineWatchLater className="mr-2" />
                  Watchlist
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex text-sm items-center w-full px-2 py-1 hover:bg-gray-100">
                        <IoIosShareAlt className="mr-2" />
                        Share
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px]">
                      <DialogHeader>
                        <DialogTitle>Share this course</DialogTitle>
                        <DialogDescription>
                          You can share this course with your friends.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input value={link}  readOnly className="border border-gray-300 rounded-md px-3 py-2 overflow-x-scroll whitespace-nowrap"  />
                        <Button type="button" onClick={handleCopy}>Copy</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Link href={`/courses/${id}`}>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-custom-primary transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <div>
              <Badge variant="new">Enroll in course</Badge>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
