import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightSide from "../../components/RightSide/RightSide";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorItem from "../../components/SensorItem/SensorItem";

const Dashboard = () => {
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formatted = `${year}-${month}-${day}`;
    setToday(formatted);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-dashboardmobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-dashboardtablet xl:grid-cols-dashboardpc">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 px-4 text-3xl font-bold">Dashboard</h1>
            <span className="w-full md:hidden">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex w-[95%] flex-col items-end md:justify-start">
            <SensorItem
              apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
              apiKey="ESPOY24P92FJIH2G"
              today={today}
            />
          </div>
        </div>
        <div className="flex w-[95%] flex-col items-center justify-evenly md:justify-start">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
