"use client"
import { useEffect, useState } from "react";
import { SearchInput } from "./_components/searchInput";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const InstructorsLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value);

  // Use useSearchParams to get and set search parameters
  const searchParams = useSearchParams();
  const instructorName = searchParams.get("instructor") || "";

  const fetchData = async () => {
    try {
      const url = `/api/instructors?instructor=${instructorName}`;
      // Make GET request using axios
      const response = await axios.get(url);
      
      // Handle response data here
      console.log("API Response:", response.data);
      
      // Update state or perform other actions based on API response
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors as needed
    }
  };

   useEffect(()=>{
     fetchData();
   },[debouncedValue])

  return ( 
    <>
     <div className="w-full flex items-center justify-between px-6 bg-custom-primary h-16 sm:h-24">
     <h1 className="text-[12px] sm:text-2xl md:text-3xl  text-white font-semibold ">Our Instructors</h1>
     <SearchInput value={value} setValue={setValue} debouncedValue={debouncedValue} />
      </div>
      <main className="p-6 space-y-4">
        {children}
      </main>
    </>
   );
}
 
export default InstructorsLayout;