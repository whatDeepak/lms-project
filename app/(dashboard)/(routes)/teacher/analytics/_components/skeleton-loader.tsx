// SkeletonLoader.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Assume you have a Skeleton component

export function SkeletonLoader() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              <Skeleton className="w-32 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-24 h-8 mb-2" />
            <Skeleton className="w-16 h-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              <Skeleton className="w-32 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-24 h-8 mb-2" />
            <Skeleton className="w-16 h-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              <Skeleton className="w-32 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-24 h-8 mb-2" />
            <Skeleton className="w-16 h-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              <Skeleton className="w-32 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-24 h-8 mb-2" />
            <Skeleton className="w-16 h-4" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="grid gap-2">
              <CardTitle>
                <Skeleton className="w-32 h-4" />
              </CardTitle>
              <Skeleton className="w-48 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-40" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-32 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-gray-300">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="grid gap-1">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-32 h-4" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
