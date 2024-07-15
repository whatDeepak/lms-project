import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedTooltip } from "@/components/ui/animate-tooltip";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type TeacherCardProps = {
  id: string,
  name: string;
  email: string;
  image: string;
};

const TeacherCard: React.FC<TeacherCardProps> = ({
  id,
  name,
  email,
  image,
}: TeacherCardProps) => {
  const hrf=`instructors/${id}`;
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
  ];
  return (
    <>
      <Card className="group hover:shadow-sm transition  border bg-gray-100 hover:bg-gray-200 rounded-lg   relative  md:max-w-[450px]">
        <div className="flex items-center justify-start ">
          <div className="overflow-hidden  rounded-md  h-full">
            <Image
              src={image}
              width={150}
              height={150}
              quality={95}
              alt="Instructor Photo"
              className="rounded-md"
            />
          </div>

          <div className="p-4 border w-full h-full flex  flex-col justify-start space-y-[6px] rounded-lg border-custom-primary ml-1 ">
            <div className="flex  space-x-2">
              <div className=" flex flex-row items-center justify-start ">
                <AnimatedTooltip items={people} />
              </div>
              <div className="text-input-border pl-4 ">
                <p className="font-semibold">50+</p>
                <p className="text-xs font-normal -mt-1">Happy Students</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
            <CardTitle className=" text-xl">{name}</CardTitle>
            <Link href={hrf}>
            <Button variant="outline" className="rounded-full text-xs">Explore Courses <ArrowRight className="font-extralight pl-1 h-4 w-6"/> </Button>
            </Link>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export default TeacherCard;
