"use client";
import * as React from "react";
import { format, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

const CalendarDateRangePicker = () => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  
  const Dates: Date[] = [
    new Date('2024-07-02'),
    new Date('2024-07-18'),
    new Date('2024-07-20'),
  ];


  return (
    <Calendar
    mode="single"
    className="rounded-md border"
    modifiers={{selected: Dates}}
    modifiersClassNames={{ selected: "calendar-dates" }}
  />
  );
};

export default CalendarDateRangePicker;
