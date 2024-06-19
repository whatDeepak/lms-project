"use client";

import { SearchInput } from "@/app/(dashboard)/components/searchInput";
import { UserNav } from "@/app/(dashboard)/components/user-nav";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";

import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
//import { isTeacher } from "@/lib/teacher";


export const NavbarRoutes = () => {
  const user = useCurrentUser();
  const pathname = usePathname();

   const isTeacherPage = pathname?.startsWith("/teacher");
   const isCoursePage = pathname?.includes("/courses");
   const isSearchPage = pathname === "/browse";
  const firstName = user?.name?.split(' ')[0]; // Get the first name
  const formattedName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() : '';

  const hrf= isTeacherPage? "/teacher/courses": "/dashboard";

  return (
    <>
      {/* 
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
      </div> */}
      <p className="text-lg md:text-2xl ">Welcome, <span className="text-custom-primary font-medium">{formattedName}</span></p>
      <div className="ml-auto flex items-center space-x-4">
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
         {(isTeacherPage || isCoursePage )&& (
             <Link href={hrf}>
             <Button size="sm" variant="outline">
               <LogOut className="h-4 w-4 mr-2 text-lg" />
                <p className="text-sm">Exit</p>
             </Button>
           </Link>
        )}
        <UserNav />
      </div>
    </>
  )
}