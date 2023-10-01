import React from 'react';
import CalendarItem from './CalendarItem';
export default function CalendarCard() {
  return (
    <div class="flex">
      <div class="w-full px-4">
        <div class="mb-10 rounded-xl bg-white shadow-lg">
          <CalendarItem />
        </div>
      </div>
    </div>
  );
}
