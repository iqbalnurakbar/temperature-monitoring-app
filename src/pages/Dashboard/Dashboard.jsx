import React, { useState, useEffect } from "react";
import Sidebar2 from "../../components/Sidebar/Sidebar2";
import RightSide from "../../components/RightSide/RightSide";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorItem from "../../components/SensorItem/SensorItem";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";
import BottomNavigationBar from "../../components/BottomNavBar/BottomNavBar";
const Dashboard = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = (date) => {
    const timeZone = "Asia/Jakarta";
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, "yyyy-MM-dd HH:mm", { locale: id });
  };

  const formattedDateString = (date) => {
    const timeZone = "Asia/Jakarta";
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, "dd MMMM yyyy", { locale: id });
  };

  const formatDate = formattedDate(selectedDate);
  const formatDateString = formattedDateString(selectedDate);

  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div className="grid w-full h-full md:h-[97%] md:w-[97%] md:rounded-xl grid-cols-dashboardmobile gap-4 overflow-y-scroll bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-dashboardtablet xl:grid-cols-dashboardpc">
        <div className="hidden md:flex">
          <Sidebar2 />
        </div>
        <div className="flex md:hidden">
          <BottomNavigationBar data={data} />
        </div>
        <div className="mx-auto flex w-[95%] flex-col">
          {" "}
          {/* Updated style */}
          <div className="flex">
            <div className="mb-4 mt-4 px-6">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <span className="text-xs">Data pada {formatDateString}</span>
            </div>
            <span className="w-full md:hidden">
              <HeaderIcon />
            </span>
          </div>
          <div className="mx-auto flex w-[95%] flex-col items-center md:justify-start">
            {" "}
            {/* Updated style */}
            <SensorItem
              startDate={formatDate.slice(0, 10)}
              endDate={formatDate.slice(0, 10)}
              startTime="00:00"
              endTime="23:59"
            />
          </div>
        </div>
        <div className="flex w-[95%] flex-col items-center justify-evenly md:justify-start mb-24 md:mb-0">
          {" "}
          {/* Updated style */}
          <RightSide
            startDate={formatDate.slice(0, 10)}
            endDate={formatDate.slice(0, 10)}
            startTime="00:00"
            endTime="23:59"
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
