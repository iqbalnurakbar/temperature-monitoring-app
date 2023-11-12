import React, { useState, useEffect } from "react";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import CalendarItem from "../Calendar/CalendarItem";
import Notification from "../Notification/Notification";
import { generateOutput } from "../../data/sensorStats";
import axios from "axios";

const RightSide = ({
  apiUrl,
  apiKey,
  startDate,
  endDate,
  startTime,
  endTime,
  setSelectedDate,
}) => {
  const [data, setData] = useState();

  useEffect(() => {
    // Ambil data dari API menggunakan fetchData dengan argumen apiUrl, apiKey, dan today
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?timezone=Asia%2FJakarta&api_key=${apiKey}&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
        );
        const output = generateOutput(response.data.feeds);
        setData(output);
      } catch (error) {
        console.error("Terjadi kesalahan: ", error.message);
      }
    };
    fetchDataFromAPI();

    const intervalId = setInterval(fetchDataFromAPI, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [apiUrl, apiKey, startDate, endDate, startTime, endTime]);

  return (
    <>
      <span className="hidden w-full md:block">
        <HeaderIcon />
      </span>
      <CalendarItem setSelectedDate={setSelectedDate} />
      <Notification
        data = {data}
      />
    </>
  );
};

export default RightSide;
