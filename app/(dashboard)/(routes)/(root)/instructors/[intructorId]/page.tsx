"use client"
import { CoursesList } from "@/app/(dashboard)/_components/course-list";
import { Category, Chapter, Course } from '@prisma/client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type InstructorIdProps = {
    
};

type CourseWithProgress = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
  };
  type Courses =  CourseWithProgress[];
const InstructorIdPage:React.FC<InstructorIdProps> = () => {

    const [instructorCourses, setInstructorCourses] = useState<Courses | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname= usePathname();
    const pathParts = pathname.split('/');
    const instructorId = pathParts[pathParts.length - 1];

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`/api/instructors/${instructorId}/courses`);
          const data = await response.json();
          setInstructorCourses(data.courses);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCourses();
    }, [instructorId]);
    
    if(loading || !instructorCourses){
      return <div>Loading...</div>;
    }
    return (<>
    <CoursesList items={instructorCourses!} />
    </>)
}
export default InstructorIdPage;