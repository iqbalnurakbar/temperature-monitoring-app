import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightSide from "../../components/RightSide/RightSide";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorItem from "../../components/SensorItem/SensorItem";

export default function Sensor3() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-dashboardmobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-dashboardtablet xl:grid-cols-dashboardpc">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 px-4 text-3xl font-bold">Sensor 3</h1>
            <span className="w-full md:hidden">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex w-[95%] flex-col items-end md:justify-start">
            <SensorItem />
          </div>
        </div>
        <div className="flex w-[95%] flex-col items-center justify-evenly md:justify-start">
          <RightSide />
        </div>
      </div>
    </div>
  );
}
