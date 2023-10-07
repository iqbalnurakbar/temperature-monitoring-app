import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./CalendarData";
import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function CalendarItem() {
  const days = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  return (
    <div className="mb-10 w-[85%] rounded-lg border bg-white p-4 shadow-md">
      <div className="flex items-center justify-between px-2">
        <GrFormPrevious
          className="cursor-pointer"
          onClick={() => {
            setToday(today.month(today.month() - 1));
          }}
        />
        <h1 className="font-bold text-teal-600">
          {months[today.month()]}, {today.year()}
        </h1>
        <GrFormNext
          className="cursor-pointer"
          onClick={() => {
            setToday(today.month(today.month() + 1));
          }}
        />
      </div>

      <div className="grid w-full grid-cols-7">
        {days.map((day, index) => {
          return (
            <h1
              key={index}
              className="grid h-9 place-content-center text-xs text-teal-600"
            >
              {day}
            </h1>
          );
        })}
      </div>

      <div className="grid w-full grid-cols-7">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div
                key={index}
                className="grid h-8 place-content-center border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-teal-500 text-white" : "",
                    "grid h-5 w-5 cursor-pointer select-none place-content-center rounded-full text-xs transition-all hover:bg-black hover:text-white",
                  )}
                >
                  {date.date()}
                </h1>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
