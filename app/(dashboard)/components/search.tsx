"use client"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Search() {

  const [value, setValue] = useState("")
 // const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  // useEffect(() => {
  //   const url = qs.stringifyUrl({
  //     url: pathname,
  //     query: {
  //       categoryId: currentCategoryId,
  //       title: debouncedValue,
  //     }
  //   }, { skipEmptyString: true, skipNull: true });

  //   router.push(url);
  // }, [debouncedValue, currentCategoryId, router, pathname])
  return (
    // <div>
    //   <Input
    //     type="search"
    //     placeholder="Search..."
    //     className="md:w-[100px] lg:w-[300px]"
    //   />
    // </div>
    <div className="relative">
    {/* <Search
      className="h-4 w-4 absolute top-3 left-3 text-slate-600"
    /> */}
    <Input
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
      placeholder="Search for a course"
    />
  </div>
  )
}
