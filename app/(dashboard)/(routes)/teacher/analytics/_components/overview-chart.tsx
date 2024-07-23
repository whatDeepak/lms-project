"use client"

import * as React from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface OverviewChartProps {
  data: any[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  const [activeChart, setActiveChart] = React.useState<string | null>(null);

  const courseTitles = React.useMemo(() => {
    const titles = new Set<string>();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== "date") {
          titles.add(key);
        }
      });
    });
    return Array.from(titles);
  }, [data]);

  React.useEffect(() => {
    if (courseTitles.length > 0) {
      setActiveChart(courseTitles[0]);
    }
  }, [courseTitles]);

  const chartConfig: ChartConfig = {
    views: {
      label: "Enrollments",
    },
    ...courseTitles.reduce((acc, key, index) => {
      acc[key] = {
        label: key,
        color: `hsl(var(--chart-${index + 1}))`, // Use index to determine color
      };
      return acc;
    }, {} as any),
  };

  // Calculate total enrollments for each course
  const totalEnrollments = React.useMemo(() => {
    return courseTitles.reduce((acc, key) => {
      const courseTotal = data.reduce((sum, item) => sum + (item[key] || 0), 0);
      return {
        ...acc,
        [key]: courseTotal,
      };
    }, {} as { [key: string]: number });
  }, [data, courseTitles]);

  // Calculate max enrollments per day
  const maxEnrollmentsPerDay = React.useMemo(() => {
    return data.reduce((max, item) => {
      const dailyTotal = courseTitles.reduce((sum, key) => sum + (item[key] || 0), 0);
      return Math.max(max, dailyTotal);
    }, 0);
  }, [data, courseTitles]);

  // Calculate upper domain limit for y-axis
  const upperDomainLimit = maxEnrollmentsPerDay; // Add a buffer of 2 to the maximum
  console.log(upperDomainLimit)

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Enrollments</CardTitle>
          <CardDescription>
            Recent Enrollments in the top courses
          </CardDescription>
        </div>
        <div className="flex">
          {courseTitles.map((key, index) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key]?.label || key}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {totalEnrollments[key]?.toLocaleString() || '0'}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid horizontal={true} vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickCount={upperDomainLimit} // Number of ticks to display
              domain={[0, upperDomainLimit]} // Set domain to [0, upperDomainLimit]
              tickFormatter={() => ''} // Disable numbers shown on Y-axis
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart || ''}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {activeChart && (
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={chartConfig[activeChart]?.color || "#000"}
                strokeWidth={2}
                dot={false}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
