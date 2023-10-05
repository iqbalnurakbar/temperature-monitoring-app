import dayjs from 'dayjs';
import React, { useState } from 'react';
import { generateDate, months } from './CalendarData';
import cn from './cn';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function CalendarItem () {
  const days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  return (
    <div className="w-[85%] border p-4 rounded-lg shadow-md mb-10 bg-white">
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

      <div className="w-full grid grid-cols-7">
        {days.map((day, index) => {
          return (
            <h1 key={index} className="h-9 grid place-content-center text-xs text-teal-600">
              {day}
            </h1>
          );
        })}
      </div>

      <div className="w-full grid grid-cols-7">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div
                key={index}
                className="h-8 border-t grid place-content-center"
              >
                <h1
                  className={cn(
                    currentMonth ? '' : 'text-gray-400',
                    today ? 'bg-teal-500 text-white' : '',
                    'h-5 w-5 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none text-xs'
                  )}
                >
                  {date.date()}
                </h1>
              </div>
            );
          }
        )}
      </div>
    </div>


  );
}
