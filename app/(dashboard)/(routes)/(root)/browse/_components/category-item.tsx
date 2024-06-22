"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId") || "all"; // Default to "all"
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const newQueryParams = {
      title: currentTitle,
      categoryId: value === "all" ? undefined : value, // Remove categoryId if "All" is selected
    };

    const url = qs.stringifyUrl({
      url: pathname,
      query: newQueryParams,
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-custom-primary transition",
        isSelected && "border-input-border bg-active bg-opacity-20 text-custom-primary"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">
        {label}
      </div>
    </button>
  )
}
