import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type studentSkeletonProps = {
};

const StudentSkeleton:React.FC<studentSkeletonProps> = () => {
    
    return <div className='flex justify-start items-center ml-0'>
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 -ml-3 w-10 rounded-full" />
        <Skeleton className="h-10 -ml-3 w-10 rounded-full" />
        <Skeleton  className='ml-1 h-7 w-[100px]'/>
    </div>
}
export default StudentSkeleton;