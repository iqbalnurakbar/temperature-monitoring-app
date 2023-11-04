import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorLineChart from "../../components/SensorChart/SensorLineChart";
import SensorInfoItem from "../../components/SensorInfo/SensorInfoItem";
import { generateOutput } from "../../data/sensorStats";
import DatePickerSensor from "../../components/Date Picker/DatePicker";
import SensorBarChartDaily from "../../components/SensorChart/SensorBarChartDaily";
import axios from "axios";

export default function Sensor1({ apiUrl, apiKey, title, field, arrayAPI }) {
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

  const [selectedDateLine, setSelectedDateLine] = useState(() => {
    const date = new Date();
    return date;
  });

  // Tambahkan state untuk datepicker grafik batang
  const [selectedStartDateBar, setSelectedStartDateBar] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [selectedEndDateBar, setSelectedEndDateBar] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });

  const handleDateChange = (date) => {
    if (date.isStart) {
      setSelectedEndDate(date.date);
    } else {
      setSelectedStartDate(date.date);
    }
  };

  const handleDateChangeBar = (date) => {
    if (date.isStart) {
      setSelectedEndDateBar(date.date);
    } else {
      setSelectedStartDateBar(date.date);
    }
  };

  const handleDateChangeLine = (date) => {
    if (date.isStart) setSelectedDateLine(date.date);
  };

  const formattedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const startDate = formattedDate(selectedStartDate).slice(0, 10);
  const endDate = formattedDate(selectedEndDate).slice(0, 10);
  const startTime = formattedDate(selectedStartDate).slice(11, 16);
  const endTime = formattedDate(selectedEndDate).slice(11, 16);

  const dateLine = formattedDate(selectedDateLine).slice(0, 10);

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const response = await axios.get(
          `${apiUrl}?timezone=Asia%2FJakarta&api_key=${apiKey}&start=${dateLine}%20${startTime}:00&end=${dateLine}%20${endTime}:59`,
        );
        const sensorOutput = generateOutput(response.data.feeds);
        setSensorData(sensorOutput.sensortemp[arrayAPI]);
        console.log(sensorData);
      } catch (error) {
        console.error("Gagal mengambil data dari API");
      }
    }
    fetchDataFromAPI();

    const intervalId = setInterval(fetchDataFromAPI, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [apiUrl, apiKey, selectedDateLine, startTime, endTime]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-sensormobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-sensortablet xl:grid-cols-sensorpc">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 pl-4 text-3xl font-bold">{title}</h1>
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
          <h2 className="mb-2 mt-4 pl-4 text-xl font-bold">Hourly</h2>
          <div className="flex mx-auto mb-4">

            <DatePickerSensor
              selectedDate={selectedDateLine}
              setSelectedDate={setSelectedDateLine}
              onDateChange={handleDateChangeLine}
              showTime={false}
            />
          </div>
          <div className="mx-auto flex flex-col justify-center gap-2 md:flex-row">
            <DatePickerSensor
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
              onDateChange={handleDateChange}
              showDate={false}
            />
            <div className="text-center">sampai</div>
            <DatePickerSensor
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
              onDateChange={handleDateChange}
              showDate={false}
            />
          </div>
          <div className="flex w-[95%] flex-col items-center md:justify-start">
            <SensorLineChart
              apiUrl={apiUrl}
              apiKey={apiKey}
              field={field}
              startDate={dateLine}
              endDate={dateLine}
              startTime={startTime}
              endTime={endTime}
            />
          </div>
          <h2 className="mb-2 mt-4 pl-4 text-xl font-bold">Daily</h2>
          <div className="mx-auto flex flex-col justify-center gap-2 md:flex-row">
            <DatePickerSensor
              selectedDate={selectedStartDateBar}
              setSelectedDate={setSelectedStartDateBar}
              onDateChange={handleDateChangeBar}
              showTime={false}
            />
            <div className="text-center">sampai</div>
            <DatePickerSensor
              selectedDate={selectedEndDateBar}
              setSelectedDate={setSelectedEndDateBar}
              onDateChange={handleDateChangeBar}
              showTime={false}
            />
          </div>
          <div className="flex w-[95%] flex-col items-center md:justify-start">
            <SensorBarChartDaily
              apiUrl={apiUrl}
              apiKey={apiKey}
              field={field}
              startDate={formattedDate(selectedStartDateBar).slice(0, 10)}
              endDate={formattedDate(selectedEndDateBar).slice(0, 10)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
