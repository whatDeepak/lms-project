"use client";
import { useEffect, useState } from "react";
import { SearchInput } from "./_components/searchInput";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import TeacherCard from "./_components/teacherCard";
import TeacherListSkeleton from "./_components/teacherListSkeleton";
interface Instructor {
  id: string;
  email: string;
  name: string;
  image: string;
}

interface Instructor {
  id: string;
  email: string;
  name: string;
}

const InstructorPage = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const [teachers, setTeachers] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const instructorName = searchParams.get("instructor") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/instructors?instructor=${instructorName}`;
        const response = await axios.get(url);
        setTeachers(response.data.teachers);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching Instructors");
        // Handle errors as needed
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedValue, instructorName]);

  return (
    <>
  
        <div>
          <div className="w-full flex items-center justify-between px-6 bg-custom-primary h-16 sm:h-24">
            <h1 className="text-[16px] sm:text-2xl md:text-3xl  text-white font-semibold ">
              Instructors
            </h1>
            <SearchInput
              value={value}
              setValue={setValue}
              debouncedValue={debouncedValue}
            />
          </div>

          <div className="p-6 space-y-4">
          {loading ? (
            <TeacherListSkeleton />
          ) : teachers.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground mt-10">
              No instructors found
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  id={teacher.id}
                  name={teacher.name}
                  email={teacher.email}
                  image={teacher.image}
                />
              ))}
            </div>
          )}
          </div>
        </div>
    
    </>
  );
};

export default InstructorPage;
