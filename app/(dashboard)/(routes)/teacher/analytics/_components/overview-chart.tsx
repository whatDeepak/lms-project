"use client"

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = (courseTitles: { [key: string]: string }) => ({
  ...Object.fromEntries(
    Object.keys(courseTitles).map((key, index) => [
      key,
      {
        label: courseTitles[key],
        color: `hsl(var(--chart-${index + 1}))`, // Color code for each course
      },
    ])
  )
}) satisfies ChartConfig;

export function OverviewChart({ data, courseTitles }: { data: any[], courseTitles: { [key: string]: string } }) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <ChartContainer
      config={chartConfig(courseTitles)}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={filteredData}>
        <defs>
          {Object.keys(courseTitles).map((key, index) => (
            <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={`hsl(var(--chart-${index + 1}))`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`hsl(var(--chart-${index + 1}))`}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
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
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        {Object.keys(courseTitles).map((key) => (
          <Area
            key={key}
            dataKey={courseTitles[key]}
            type="natural"
            fill={`url(#fill${key})`}
            stroke={`hsl(var(--chart-${Object.keys(courseTitles).indexOf(key) + 1}))`}
            stackId="a"
          />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
