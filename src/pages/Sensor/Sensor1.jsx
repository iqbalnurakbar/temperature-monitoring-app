import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import SensorItem from '../../components/SensorItem/SensorItem';
import RightSide from '../../components/RightSide/RightSide';
import HeaderIcon from '../../components/HeaderIcon/HeaderIcon';

export default function Sensor1() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#f0f4f8] rounded-xl grid grid-cols-dashboardmobile h-[97%] w-[97%] gap-4 md:grid-cols-dashboardtablet xl:grid-cols-dashboardpc overflow-y-scroll scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex flex-col w-[95%]">
          <div className="flex justify-between">
            <h1 className="px-4 text-3xl font-bold mb-10 mt-4">Sensor 1</h1>
            <span className="w-full md:hidden">
              <HeaderIcon />
            </span>
          </div>
          <div className="flex flex-col w-[95%] items-end md:justify-start">
            <SensorItem />
            <SensorItem />
            <SensorItem />
            <SensorItem />
          </div>
        </div>
        <div className="flex flex-col w-[95%] justify-evenly items-center md:justify-start">
          <RightSide />
        </div>
      </div>
    </div>
  );
}
