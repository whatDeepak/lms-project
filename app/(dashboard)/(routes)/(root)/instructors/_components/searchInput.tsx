"use client"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface searchInputProps{
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    debouncedValue: string,
}
export function SearchInput({
value,
setValue,
debouncedValue
}:searchInputProps) {


  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        instructor: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue,  router, pathname])
  return (

    <div className="relative">
    <Search
      className="h-4 w-4 absolute top-3 left-3 text-slate-600"
    />
    <Input
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
      placeholder="Search for a Instructor"
    />
  </div>
  )
}
