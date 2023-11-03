import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerSensor = ({ selectedDate, setSelectedDate, onDataChange, showTime = true, isStart }) => {
  const handleDataChange = (date) => {
    setSelectedDate(date, isStart);
  };

  return (
    <div className="">
      <DatePicker
        selected={selectedDate}
        onChange={handleDataChange}
        dateFormat={showTime ? "dd-MM-yyyy HH:mm" : "dd-MM-yyyy"}
        timeIntervals={15}
        locale="id"
        showTimeSelect={showTime}
        className="rounded-md bg-[#3ebd93] text-white shadow-sm hover:bg-teal-600 focus:bg-teal-600 text-center"
      />
    </div>
  );
};

export default DatePickerSensor;
