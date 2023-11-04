import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerSensor = ({
  selectedDate,
  setSelectedDate,
  showTime = true,
  isStart,
  showDate = true,
}) => {
  const handleDataChange = (date) => {
    setSelectedDate(date, isStart);
  };

  return (
    <div className="">
      <DatePicker
        selected={selectedDate}
        onChange={handleDataChange}
        dateFormat={showTime ? "HH:mm" : "dd-MM-yyyy"}
        timeIntervals={30}
        locale="id"
        showTimeSelectOnly={showTime}
        showTimeInput={showTime}
        showTimeSelect={showTime}
        className="rounded-md bg-[#3ebd93] text-center text-white shadow-sm hover:bg-teal-600 focus:bg-teal-600"
      />
    </div>
  );
};

export default DatePickerSensor;
