import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorChart from "../../components/ChartSensor/ChartItem";

export default function Sensor4() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-sensorpc gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 px-4 text-3xl font-bold">Sensor 4</h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex w-[95%] flex-col items-center md:justify-start">
            <SensorChart
              apiUrl="https://api.thingspeak.com/channels/2176107/feeds.json"
              apiKey="ESPOY24P92FJIH2G"
              field="field4" // Ganti dengan field yang sesuai
              results={8000} // Tambahkan parameter results
            />
          </div>
        </div>
      </div>
    </div>
  );
}
