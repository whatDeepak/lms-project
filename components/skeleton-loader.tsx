
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      {/* Categories Section */}
      {/* <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div> */}

      {/* Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
