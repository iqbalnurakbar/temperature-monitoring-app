import React, { useState, useEffect } from "react";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import CalendarItem from "../Calendar/CalendarItem";
import Notification from "../Notification/Notification";
import { sensorUtils } from "../../data/sensorUtils";
import { apiConfigurations1 } from "../../data/apiConfigurations";
const RightSide = ({
  startDate,
  endDate,
  startTime,
  endTime,
  setSelectedDate,
}) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchSensorData = () => {
      const getAPI = apiConfigurations1(startDate, endDate, startTime, endTime);

      sensorUtils(getAPI)
        .then((result) => setData(result))
        .catch((error) => console.error("Error fetching data:", error));
    };


    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); //2 menit dalam miliseskon

    return () => clearInterval(intervalId);
  }, [startDate, endDate, setSelectedDate]);
  return (
    <>
      <span className="hidden w-full md:block">
        <HeaderIcon />
      </span>
      <CalendarItem setSelectedDate={setSelectedDate} />
      <Notification data={data} />
    </>
  );
};

export default RightSide;
