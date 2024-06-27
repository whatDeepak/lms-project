"use client";

import { Category } from "@prisma/client";
import { GiChemicalDrop } from "react-icons/gi";
import { IoIosConstruct } from "react-icons/io";
import { FaIndustry, FaLaptop } from "react-icons/fa";
import { AiOutlineControl } from "react-icons/ai";
import { GiGears, GiSewingString } from "react-icons/gi";
import { MdBiotech, MdElectricBolt } from "react-icons/md";
import { IoHardwareChip, IoGrid } from "react-icons/io5";
import { PiCircuitryFill } from "react-icons/pi";

import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<string, IconType> = {
  "All": IoGrid,
  "Biotechnology": MdBiotech,
  "Chemical Engineering": GiChemicalDrop,
  "Civil Engineering": IoIosConstruct,
  "Computer Science and Engineering": IoHardwareChip,
  "Electronics and Communication Engineering": PiCircuitryFill,
  "Electrical Engineering": MdElectricBolt,
  "Industrial and Production Engineering": FaIndustry,
  "Information Technology": FaLaptop,
  "Instrumentation and Control Engineering": AiOutlineControl,
  "Mechanical Engineering": GiGears,
  "Textile Technology": GiSewingString,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  const allCategory = { id: "all", name: "All" };
  const categories = [allCategory, ...items];

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {categories.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}
