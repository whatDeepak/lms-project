"use client";
import * as React from "react";
import {  parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface CalendarDateRangePickerProps{
  checkInDates: string[]
}
const CalendarDateRangePicker = ({
  checkInDates
}:CalendarDateRangePickerProps ) => {
  
  const parsedDates = checkInDates.map((dateString) => parseISO(dateString));
  return (
    <Calendar
    mode="single"
    className="rounded-md border"
    modifiers={{selected: parsedDates}}
    modifiersClassNames={{ selected: "calendar-dates" }}
  />
  );
};

export default CalendarDateRangePicker;
