"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import { Sidebar } from "./_components/sidebar";
import { Search } from "./components/search";
import { UserNav } from "./components/user-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const user=useCurrentUser();
    const firstName = user?.name?.split(' ')[0]; // Get the first name
const formattedName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() : '';

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <div className="flex h-16 items-center px-4">
          <p className="text-2xl ">Welcome , <span className="text-custom-primary font-medium">{formattedName}</span></p>
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 shadow-sm"></div>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
