"use client";

import { useState } from "react";
import { Ghost, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className="landing-section">
    <div className=" md:top-0   md:shadow-none  mx-auto max-w-[1200px]  ">
      {/* DESKTOP */}
      <div className=" animate-in fade-in zoom-in bg-white py-4">
        <div className="flex justify-between items-center">
          {/* <div>
            <Image src="logo.svg" alt="logo" width={150} height={50} />
          </div> */}
               <div className="flex justify-center items-center leading-[117.02%] cursor-pointer font-poppins">
              <b className="text-[21px] sm:text-[25px] text-custom-primary">
                Edu
              </b>
              <span className="font-poppins text-black text-[21px] sm:text-[25px]">cation</span>
            </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
     
          </div>
          <div className="flex items-center gap-1 select-none">
            {/* <p
              className="hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray"
            >
              Login
            </p> */}
            <Link href={"/auth/login"}>
            <Button
            variant="ghost"
            size="lg"
            className="text-md"
            >Sign In</Button>
            </Link>
           
           <Link href={"/auth/register"}>
           <Button
            variant="outline"
            size="lg"
            className="text-md"
            >Sign Up</Button>
           </Link>
          
          </div>
        </div>
      </div>

    </div>
    </section>
  );
}

export default NavBar;