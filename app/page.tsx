"use client"
import { Poppins } from "next/font/google";

import HeroSection from "@/components/HeroSection";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
