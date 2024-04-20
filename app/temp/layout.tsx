import { CalendarDateRangePicker } from "../(dashboard)/(routes)/dashboard/components/date-range-picker";
import DoughnutChart from "../(dashboard)/(routes)/dashboard/components/doughnutChart";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dashboard-container">
    <div className="h-[80px] md:pl-64 fixed inset-y-0 w-full z-50">
      <Navbar />
    </div>
    <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
      <Sidebar />
    </div>
    <main className="md:pl-64 pt-[80px] h-full">
      {children}
    </main>
  </div>

    // <>
    //   <div className="h-[80px] md:pl-64 fixed inset-y-0 w-full z-50">
    //     <Navbar />
    //   </div>
    //   <div className="flex">
    //     <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
    //       <Sidebar />
    //     </div>
    //     <div className="flex-1 overflow-auto md:pl-64 pt-[80px]">
    //       {children}
    //     </div>
    //     <div className="fixed inset-y-0  pt-[100px] right-0 p-4 space-y-4">
    //       <CalendarDateRangePicker />
    //       <DoughnutChart />
    //     </div>
    //   </div>
    // </>
  );
};

export default DashboardLayout;
