"use client";

import { cn } from "@/lib/utils";
import qs from "query-string";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CategoriesProps {
  items: Category[];
}

// const iconMap: Record<Category["name"], IconType> = {
//   "Music": FcMusic,
//   "Photography": FcOldTimeCamera,
//   "Fitness": FcSportsMode,
//   "Accounting": FcSalesPerformance,
//   "Computer Science": FcMultipleDevices,
//   "Filming": FcFilmReel,
//   "Engineering": FcEngineering,
// };

export const Categories = ({
  items,
}: CategoriesProps) => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
  
    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");
  
    const [value, setValue]= useState("");
    const isSelected = currentCategoryId === value;

  
    const onClick = (value: string) => {
      setValue(value);
      const url = qs.stringifyUrl({
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: value,
        }
      }, { skipNull: true, skipEmptyString: true });
  
      router.push(url);
    };
  

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
    
        <button
        key={item.id}
        onClick={()=>onClick(item.id)}
        className={cn(
          "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
           (currentCategoryId ===value) && "border-sky-700 bg-sky-200/20 text-sky-800"
        )}
        type="button"
      >
        <div className="truncate">
          {item.name}
        </div>
      </button>
      ))}
    </div>
  )
}