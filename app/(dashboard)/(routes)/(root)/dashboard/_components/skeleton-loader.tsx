// components/SkeletonLoader.tsx

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Import your Skeleton component from your UI library
import { LucideIcon } from 'lucide-react'; // Assuming LucideIcon is used in your InfoCard
import { IconBadge } from '@/components/icon-badge'; // Assuming IconBadge is used in your InfoCard

const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-md p-3 flex items-center gap-x-2">
          <Skeleton className="h-12 w-12" />
          <div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2 mt-1" />
          </div>
        </div>
        <div className="border rounded-md p-3 flex items-center gap-x-2">
          <Skeleton className="h-12 w-12" />
          <div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2 mt-1" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            </div>
            <div className="flex flex-col pt-2">
              <Skeleton className="h-8 w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3 mt-2" />
              <Skeleton className="h-4 w-1/2 mt-1" />
              <Skeleton className="h-8 w-2/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
