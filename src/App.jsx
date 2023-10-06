import React from 'react';
import RightSide from './components/RightSide';
import Sensor from './components/SensorDashboard/Sensor';
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#f0f4f8] rounded-xl grid grid-cols-dashboardmobile h-[97%] w-[97%] gap-4 md:grid-cols-dashboardtablet xl:grid-cols-dashboardpc overflow-y-scroll scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex flex-col w-[95%]">
          <h1 className="px-7 text-3xl font-bold mb-10 mt-4">Dashboard</h1>
          <div className="flex flex-col w-[95%] items-center md:justify-start">
            <Sensor />
            <Sensor />
            <Sensor />
            <Sensor />
          </div>
        </div>
        <div className="flex flex-col w-[95%] justify-evenly items-center md:justify-start">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default App;
