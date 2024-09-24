"use client";

import axios from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const InstructorIDPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const instructorId = pathParts[pathParts.length - 1];
  const [loading, setLoading] = useState(true);

  const [instructor, setInstructor] = useState<{
    name: string;
    email: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`/api/instructors/${instructorId}`);
        setInstructor(response.data);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
        toast.error("Error fetching instructor data");
      } finally {
        setLoading(false);
      }
    };

    if (instructorId) {
      fetchInstructor();
    }
  }, [instructorId]);

  return (
    <>
      <div className="w-full flex items-center justify-between px-6 bg-custom-primary h-16 sm:h-24">
        <h1 className="text-[16px] sm:text-2xl md:text-3xl  text-white font-semibold ">
            {loading ? <>
            Instructor
            </>:
          
          <div className="flex items-center space-x-2">
            <Image
              src={instructor?.image!}
              height={50}
              width={50}
              alt="Instructor photo"
              className="rounded-full"
            />
            <p>{instructor?.name}&apos;s Courses </p>
          </div>

}
        </h1>
      </div>
      <main className="p-6 space-y-4">{children}</main>
    </>
  );
};

export default InstructorIDPageLayout;
