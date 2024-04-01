import Image from "next/image";
import homebg from "@/public/homebg.svg"; // Import the SVG file
import NavBar from "@/components/Navbar";
import { Button } from "./ui/button";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section >
      <NavBar />
      {/* <div
        className="relative h-screen bg-cover bg-center -ml-[64px]  overflow-hidden"
        style={{
          backgroundImage: `url(${homebg.src})`, // Use the imported SVG as the background image
        }}
      >
      </div> */}
      <div className="block mx-auto max-w-[1200px] pt-[50px]">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:justify-between sm:items-center">
            <div className="max-w-[530px] min-w-[250px] min-h-[345px] text-lg md:mr-[60px]">
              <p className=" mb-5 text-[32px] sm:text-[37px] lg:text-[55px] md:text-[42px] leading-[112.52%] font-semibold font-poppins text-secondary1 block min-h-[78px] sm:min-h-[83px] md:min-h-[101px] lg:min-h-[146px]">
              Online <span className="text-custom-primary">Learning you can access</span> anywhere easily!
              </p>
              <p className=" my-[20px] max-w-[320px] md:max-w-none md:mb-[32px] text-[15px] font-light leading-[129%] sm:text-[18px] font-roboto " >
              Discover a new way to communicate & connect with fast, easy & unlimited free chat today!
            </p>
            <Button
            variant="default"
            size="custom"
            >
              <Link href={"/auth/register"}>
              Get Started</Link></Button>
            </div>
              <div className="text-left sm:max-w-none sm:-mr-[50px] md:-mr-[100px]">
                 <Image src="photo.svg" alt="hero section photo"  height={100} width={613} className="h-auto max-w-[100%] inline-block mt-[20px] sm:mt-0 "/>
              </div>
          </div>
      </div>
    </section>
  );
}
