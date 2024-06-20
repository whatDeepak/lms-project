"use client"
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
    const user=useCurrentUser()
    const userId=user?.id;
   if(user){
    redirect("/dashboard");
   }
  return (
    <main className="h-screen w-screen overflow-hidden">
      <div >
        <HeroSection  userId={userId} />
       </div>
        
    </main>
  );
}
