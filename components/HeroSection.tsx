import Image from "next/image";
import NavBar from "@/components/Navbar";
import { Button } from "./ui/button";
import Link from "next/link";

interface HeroProps {
  userId?: string 
};
export default function HeroSection(
  {userId}:HeroProps
) {
  return (
    <div>
      <NavBar userId={userId} />
      <section className="landing-section">
        <div className="block mx-auto max-w-[1200px] pt-[50px] sm:min-h-[500px]">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:justify-between sm:items-center ">
            <div className="lg:max-w-[530px] sm:max-w-[400px] min-w-[100px]  sm:min-h-[350px] text-lg sm:mr-[15px] md:mr-[30px] mb-5 sm:mb-0">
              <p className=" mb-5 text-[32px] sm:text-[37px] lg:text-[55px] md:text-[42px] leading-[112.52%] font-semibold font-poppins text-secondary1 block min-h-[78px] sm:min-h-[83px] md:min-h-[101px] lg:min-h-[146px]">
                Online{" "}
                <span className="text-custom-primary">
                  Learning you can access
                </span>{" "}
                anywhere easily!
              </p>
              <p className=" my-[20px] max-w-[320px] md:max-w-none md:mb-[32px] text-[15px] font-light leading-[129%] sm:text-[18px] font-roboto ">
                Discover a new way to communicate & connect with fast, easy &
                unlimited free chat today!
              </p>
              {!userId &&  <Link href={"/auth/register"}>
                <Button variant="default" size="custom">
                  Get Started
                </Button>
              </Link>}
             {userId &&  <Link href={"/dashboard"}>
                <Button variant="default" size="custom">
                  Get Started
                </Button>
              </Link>}
            </div>
            <div className="text-left sm:max-w-none sm:-mr-[50px] md:-mr-[100px] sm:min-h-[400px] mt-[20px] sm:mt-0 ">
              <Image
                src="photo.svg"
                alt="hero section photo"
                height={100}
                width={613}
                className="h-auto max-w-[100%] inline-block "
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
