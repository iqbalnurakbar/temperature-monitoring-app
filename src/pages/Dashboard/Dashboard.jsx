import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightSide from "../../components/RightSide/RightSide";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorItem from "../../components/SensorItem/SensorItem";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";

const Dashboard = () => {
  // State untuk tanggal yang dipilih di kalender
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

  const formattedDateNotif = (date) => {
    const timeZone = "Asia/Jakarta";
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, "dd MMMM yyyy HH:mm", { locale: id });
  };

  const formatDate = formattedDate(selectedDate);
  const formatDateString = formattedDateString(selectedDate);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-dashboardmobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-dashboardtablet xl:grid-cols-dashboardpc">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <div className="mb-4 mt-4 px-4">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <span className="pl-1 text-xs">Data pada {formatDateString}</span>
            </div>
            <span className="w-full md:hidden">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex w-[95%] flex-col items-end md:justify-start">
            <SensorItem
              apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
              apiKey="ESPOY24P92FJIH2G"
              startDate={formatDate.slice(0, 10)}
              endDate={formatDate.slice(0, 10)}
              startTime="00:00"
              endTime="23:59"
            />
          </div>
        </div>
        <div className="flex w-[95%] flex-col items-center justify-evenly md:justify-start">
          <RightSide
            apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
            apiKey="ESPOY24P92FJIH2G"
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
