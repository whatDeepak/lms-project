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
    <div className=" md:top-0   md:shadow-none  ">
      {/* DESKTOP */}
      <div className=" hidden lg:block animate-in fade-in zoom-in bg-white p-4">
        <div className="flex justify-between md:mx-[9rem] items-center">
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
      {/* MOBILE */}
      <div
        className="block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in "       >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <img
              src="/images/epixelap_logo.png"
              alt="logo"
              className="w-[7rem]"
            />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="/svgs/hamburger.svg"
                alt="logo"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              {/* <p
                className={hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray}
              >
                Home
              </p>
              <p
                className={hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray}
              >
                About Us
              </p>
              <p
                className={hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray}
              >
                Our App
              </p>
              <p
                className="hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray"
              >
                Contacts
              </p> */}

              <div className="flex flex-col gap-[40px] select-none">
                <p
                  className="hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray"
                >
                  Login
                </p>
              </div>
            </div>
          </div>
          <div></div>
      </div>
    </div>
  );
}

export default NavBar;