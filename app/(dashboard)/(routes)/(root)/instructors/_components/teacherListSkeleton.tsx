import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type teacherListSkeletonProps = {
    
};

const TeacherListSkeleton:React.FC<teacherListSkeletonProps> = () => {
    
    return (<>
       <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 ">
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
            <Skeleton className='max-w-[460px] h-[120px] rounded-md' />
        </div>
    </>)
}
export default TeacherListSkeleton;