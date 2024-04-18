import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"
import { UserButton } from "@/components/auth/user-button"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm justify-between">
        <MobileSidebar />
        <NavbarRoutes />
    </div>
  )
}