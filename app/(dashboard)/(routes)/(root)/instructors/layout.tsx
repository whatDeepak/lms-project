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
const InstructorsLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
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
     <div className="w-full flex items-center justify-between px-6 bg-custom-primary h-16 sm:h-24">
     <h1 className="text-[12px] sm:text-2xl md:text-3xl  text-white font-semibold ">Our Instructors</h1>
     <SearchInput value={value} setValue={setValue} debouncedValue={debouncedValue} />
      </div>
      
      <div className="pt-4"></div>
      <TeacherCard id="clxnq6x7900001whgj38s0qs2" name="John Doe" email="gautams.cs@nitj.ac.in" image="https://lh3.googleusercontent.com/a/ACg8ocJRl38nyf6EKAXOqS2pBHZvRsoFsojjOmTNc2eXpYHElQyG1ykT=s96-c" />
      
      <main className="p-6 space-y-4">
        {children}
      </main>
    </>
   );
}
 
export default InstructorsLayout;