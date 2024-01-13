import React, { useState, useEffect } from "react";
import Sidebar2 from "../../components/Sidebar/Sidebar2";
import RightSide from "../../components/RightSide/RightSide";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorItem from "../../components/SensorItem/SensorItem";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";
import BottomNavigationBar from "../../components/BottomNavBar/BottomNavBar";
import { useSpring, animated } from "react-spring";

const Dashboard = () => {
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

  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div className="grid h-full w-full grid-cols-dashboardmobile gap-4 overflow-y-scroll bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:h-[97%] md:w-[97%] md:grid-cols-dashboardpc md:rounded-xl xl:grid-cols-dashboardpc">
        <div className="hidden md:flex">
          <Sidebar2 />
        </div>
        <div className="flex md:hidden">
          <BottomNavigationBar />
        </div>

        <div className="mx-auto flex w-[95%] flex-col">
          <div className="flex">
            <animated.div className="mb-4 px-6 md:mt-4" style={fadeInAnimation}>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <span className="text-xs">Data pada {formatDateString}</span>
            </animated.div>
            <span className="w-full md:hidden">
              <HeaderIcon />
            </span>
          </div>
          <animated.div
            className="ml-0.5 flex h-10 w-[95%] flex-col items-center md:h-full md:justify-start"
            style={fadeInAnimation}
          >
            <SensorItem
              startDate={formatDate.slice(0, 10)}
              endDate={formatDate.slice(0, 10)}
              startTime="00:00"
              endTime="23:59"
            />
          </animated.div>
        </div>
        <animated.div
          className="mx-auto mb-24 mt-56 md:mt-0 flex w-[95%] flex-col items-center justify-evenly md:mb-0 md:justify-start"
          style={fadeInAnimation}
        >
          <RightSide
            startDate={formatDate.slice(0, 10)}
            endDate={formatDate.slice(0, 10)}
            startTime="00:00"
            endTime="23:59"
            setSelectedDate={setSelectedDate}
          />
        </animated.div>
      </div>
    </div>
  );
};

export default Dashboard;
