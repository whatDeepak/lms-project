"use client"
import { useEffect, useState } from "react";
import { SearchInput } from "./_components/searchInput";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import TeacherCard from "./_components/teacherCard";
interface Instructor {
  id: string,
  email: string;
  name: string;
  image:string,
}

interface Instructor {
  id: string;
  email: string;
  name: string;
}

const InstructorPage = () => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value);
  const [teachers, setTeachers] = useState<Instructor[]>([]);
  // Use useSearchParams to get and set search parameters
  const searchParams = useSearchParams();
  const instructorName = searchParams.get("instructor") || "";

  const fetchData = async () => {
    try {
      const url = `/api/instructors?instructor=${instructorName}`;
      const response = await axios.get(url);
      setTeachers(response.data.teachers);
      // Handle response data here
      console.log("API Response:", response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching Instructors");
      // Handle errors as needed
    }
  };

   useEffect(()=>{
     fetchData();
   },[debouncedValue])

   useEffect(() => {
    console.log("Teachers:", teachers); // Log teachers whenever it changes
  }, [teachers]);

    return ( 
      <>
      <div >
      <div className="w-full flex items-center justify-between px-6 bg-custom-primary h-16 sm:h-24">
     <h1 className="text-[16px] sm:text-2xl md:text-3xl  text-white font-semibold ">Instructors</h1>
     <SearchInput value={value} setValue={setValue} debouncedValue={debouncedValue} />
      </div>
      
      <div className="p-6 space-y-4">

      <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 ">
          {teachers.map((teacher) => (
            <TeacherCard
            key={teacher.id}
            id={teacher.id}
            name={teacher.name}
            email={teacher.email}
            image={teacher.image}
            />
          ))}
          {/* <TeacherCard id="clxnq6x7900001whgj38s0qs2" name="John Doe" email="gautams.cs@nitj.ac.in" image="https://lh3.googleusercontent.com/a/ACg8ocJRl38nyf6EKAXOqS2pBHZvRsoFsojjOmTNc2eXpYHElQyG1ykT=s96-c" /> */}
        </div>
        </div>
      </div>
      </>
     );
  }
   
  export default InstructorPage;