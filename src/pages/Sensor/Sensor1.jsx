import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorLineChart from "../../components/SensorChart/SensorLineChart";
import SensorInfoItem from "../../components/SensorInfo/SensorInfoItem";
import {generateOutput } from "../../data/sensorStats";
import DatePickerSensor from "../../components/Date Picker/DatePicker";
import axios from "axios";

export default function Sensor1({ apiUrl, apiKey }) {
  const [sensorData, setSensorData] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });
  const handleDateChange = (date, isEndDate) => {
    if (isEndDate) {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
    }
  };

  const formattedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const startTime = formattedDate(selectedStartDate).slice(11,16);
  const endTime = formattedDate(selectedEndDate).slice(11,16);
  const startDate=formattedDate(selectedStartDate).slice(0,10);
  const endDate=formattedDate(selectedEndDate).slice(0,10);


  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const response = await axios.get(
          `${apiUrl}?timezone=Asia%2FJakarta&api_key=${apiKey}&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
        );
        const sensorOutput = generateOutput(response.data.feeds);
        setSensorData(sensorOutput.sensortemp[0]);
        console.log(sensorData)
      } catch (error) {
        console.error(error);
      }
    }
    fetchDataFromAPI();

    const intervalId = setInterval(fetchDataFromAPI, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [apiUrl, apiKey, selectedStartDate, selectedEndDate, startTime, endTime]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-sensormobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-sensortablet xl:grid-cols-sensorpc">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 pl-4 text-3xl font-bold">Sensor 1</h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <div className="mx-auto mb-10 w-[95%]">
            {sensorData && Object.keys(sensorData).length > 0 ? (
              <SensorInfoItem
                temperature={sensorData.temperature}
                duration={sensorData.duration}
              />
            ) : (
              <p className="text-center font-semibold text-red-500">
                Terdapat masalah saat mengambil data sensor hari ini dari cloud!
                Cek data di hari lain!
              </p>
            )}
          </div>
          <div className="flex justify-center gap-2">
            <DatePickerSensor
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
              onDateChange={handleDateChange}
              isEndDate={false}
            />
            <div>sampai</div>
            <DatePickerSensor
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
              onDateChange={handleDateChange}
              isEndDate={true}
            />
          </div>
          <div className="flex w-[95%] flex-col items-center justify-evenly md:justify-start">
            <SensorLineChart
              apiUrl={apiUrl}
              apiKey={apiKey}
              field="field1"
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
