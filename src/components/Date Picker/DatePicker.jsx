import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerSensor = ({ selectedDate, setSelectedDate, onDataChange, isStart }) => {
  const handleDataChange = (date) => {
    setSelectedDate(date,isStart);
  }

  return (
    <div className="">
      <DatePicker
        selected={selectedDate}
        onChange={handleDataChange}
        showTimeSelect
        dateFormat="dd-MM-yyyy HH:mm"
        timeIntervals={15}
        timeCaption="Waktu"
        locale="id"
        className="rounded-md bg-[#3ebd93] text-white shadow-sm hover:bg-teal-600 focus:bg-teal-600 text-center"
      />
    </div>
  );
};

export default DatePickerSensor;
