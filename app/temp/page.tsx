import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { Search } from "./components/search";
import { UserNav } from "./components/user-nav";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import DoughnutChart from "./components/doughnutChart";
import { CoursesList } from "@/components/courses-list";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <>

      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-4 pt-3">
          <div className="flex  space-x-2 justify-between ">
            <div className="flex flex-col items-centre justify-start space-y-2 w-full">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="grid gap-4 md:grid-cols-2 ">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completed Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">25</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      In Progress Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
                {/* <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card> */}
                <CoursesList  />
              
            </div>
            <div className="flex flex-col items-center  space-y-2 justify-start ">
              <div className="flex items-center space-x-2">
                <CalendarDateRangePicker />
              </div>
              <div className="h-[300px]">
                <DoughnutChart />
              </div>
              {/* <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
