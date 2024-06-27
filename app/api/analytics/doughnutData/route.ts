// app/api/chart-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Course, Category } from '@prisma/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    // Fetch purchased course IDs for the user
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        courseId: true,
      },
    });

    // Extract courseIds from purchasedCourses
    const purchasedCourseIds = purchasedCourses.map((purchase) => purchase.courseId);

    // Fetch courses that the user has purchased
    const allCourses = await db.course.findMany({
      where: {
        id: {
          in: purchasedCourseIds,
        },
      },
      include: {
        category: true,
      },
    });

    // Calculate the category counts
    const categoryCounts = allCourses.reduce((acc: Record<string, number>, course) => {
      if (course.category) {
        acc[course.category.name] = (acc[course.category.name] || 0) + 1;
      }
      return acc;
    }, {});

     // Sort categories by count and take the top 3
     const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
     const topCategories = sortedCategories.slice(0, 3);
     const otherCategories = sortedCategories.slice(3);
 
     // Calculate the "Others" count
     const othersCount = otherCategories.reduce((sum, cat) => sum + cat[1], 0);
 
     // Prepare chart data
     const chartLabels = [...topCategories.map(cat => cat[0]), 'Others'];
     const chartData = [...topCategories.map(cat => cat[1]), othersCount];
 
     return NextResponse.json({ labels: chartLabels, data: chartData }, { status: 200 });
  } catch (error) {
    console.error('[GET_CHART_DATA]', error);
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}
