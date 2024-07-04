"use client";
import {  usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";

export const Topbar = () => {
  const pathname = usePathname();

  const isFavoritesPage = pathname === "/collections/favorites";
  const isWatchlistPage = pathname === "/collections/watch-later";
  return (
    <>
      <h1 className="text-[12px] sm:text-2xl md:text-3xl  text-white font-semibold ">My Collections</h1>
      <div className="flex space-x-3">
        <Link
          href="/collections/favorites"
          className={cn(
            "h-8 sm:h-9 px-[6px]  sm:px-4 py-2 text-xs sm:text-md md:text-lg flex items-center rounded-md border-2 shadow-md transition-all duration-300 hover:outline-white hover:bg-gray-200",
            isFavoritesPage
              ? "bg-background text-custom-primary border-custom-primary shadow-lg transform scale-105"
              : "bg-custom-primary text-white"
          )}
        >
          Favorites
        </Link>
        <Link
          href="/collections/watch-later"
          className={cn(
            "h-8 sm:h-9 px-[6px]  sm:px-4  text-xs sm:text-md md:text-lg flex items-center rounded-md border-2 shadow-md transition-all duration-300 hover:outline-white hover:bg-violet-300",
            isWatchlistPage
              ? "bg-background text-custom-primary border-custom-primary shadow-lg transform scale-105"
              : "bg-custom-primary text-white"
          )}
        >
          Watchlist
        </Link>
      </div>
    </>
  );
};
