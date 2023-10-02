import React from 'react';
import CalendarItem from './CalendarItem';
export default function CalendarCard() {
  return (
    <div className="flex">
      <div className="w-full px-4">
        <div className="mb-10 rounded-xl bg-white shadow-lg">
          <CalendarItem />
        </div>
      </div>
    </div>
  );
}
