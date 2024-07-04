
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoaderAttachments: React.FC = () => {
  return (
      <div className="flex items-center  overflow-x-auto w-full pb-2">
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
  );
};

export default SkeletonLoaderAttachments;
