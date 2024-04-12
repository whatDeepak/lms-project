<<<<<<< HEAD
import Image from "next/image";

export default function Home() {
  return (
    <>
      <p>
        SUP!
      </p>
    </>
=======
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <div >
        <HeroSection />
       </div>
        
    </main>
>>>>>>> 531cb4e41a5b943650d91a99bc776500570908a9
  );
}
