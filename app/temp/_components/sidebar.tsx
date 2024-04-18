import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
        <div className="h-[80px] px-6 flex justify-start items-center leading-[117.02%] cursor-pointer font-poppins">
              <b className="text-[21px] sm:text-[25px] text-custom-primary">
                Edu
              </b>
              <span className="font-poppins text-black text-[21px] sm:text-[25px]">cation</span>
            </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}