"use client";
import React, { useEffect,useState } from "react";
import Image from "next/image";
import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedTooltip } from "@/components/ui/animate-tooltip";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import StudentSkeleton from "./studentSkeleton";

type TeacherCardProps = {
  id: string;
  name: string;
  email: string;
  image: string;
};
type Student = {
  id: string;
  name: string;
  image: string;
};
const TeacherCard: React.FC<TeacherCardProps> = ({
  id,
  name,
  email,
  image,
}: TeacherCardProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [StudentCount, setStudentCount] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const hrf = `instructors/${id}`;
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/instructors/${id}/students`); // Adjust API endpoint as per your setup
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setStudents(data.students); // Assuming your API returns { students: Student[] }
          setStudentCount(data.totalStudentsCount);
        } else {
          console.error("Failed to fetch students data");
        }
      } catch (error) {
        console.error("Error fetching students data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [id]);
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
            {loading ? (
              <StudentSkeleton />
            ) : (
              <div className="flex  space-x-2">
                <div className=" flex flex-row items-center justify-start ">
                  <AnimatedTooltip items={students} />
                </div>
                <div className="text-input-border pl-4 ">
                  <p className="font-semibold">{StudentCount}+</p>
                  <p className="text-xs font-normal -mt-1">Happy Students</p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <CardTitle className=" text-xl">{name}</CardTitle>
              <Link href={hrf}>
                <Button variant="outline" className="rounded-full text-xs">
                  Explore Courses{" "}
                  <ArrowRight className="font-extralight pl-1 h-4 w-6" />{" "}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export default TeacherCard;
