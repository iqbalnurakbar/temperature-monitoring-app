import React, { useState, useEffect } from "react";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import CalendarItem from "../Calendar/CalendarItem";
import Notification from "../Notification/Notification";
import { sensorUtils } from "../../data/sensorUtils";

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
      const apiConfigurations = [
        {
          url: `https://api.thingspeak.com/channels/2342296/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        {
          url: `https://api.thingspeak.com/channels/2344351/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        {
          url: `https://api.thingspeak.com/channels/2347341/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        // ... (other configurations)
      ];

      sensorUtils(apiConfigurations)
        .then((result) => setData(result))
        .catch((error) => console.error("Error fetching data:", error));
    };

    // Fetch initially
    fetchSensorData();

    // Set up interval to fetch every 2 minutes
    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000);

    // Clean up interval on component unmount or when dependencies change
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
