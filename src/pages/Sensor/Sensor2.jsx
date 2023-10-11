import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorLineChart from "../../components/SensorChart/SensorLineChart";
import SensorInfoItem from "../../components/SensorInfo/SensorInfoItem";
import { generateOutput, fetchData } from "../../data/sensorStats";

export default function Sensor1() {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const data = await fetchData();
        const sensorOutput = generateOutput(data);
        setSensorData(sensorOutput.sensortemp[1]); // Mengambil data untuk Sensor 1
      } catch (error) {
        console.error(error);
      }
    }

    fetchDataFromAPI();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-sensormobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-sensortablet xl:grid-cols-sensorpc">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 px-4 text-3xl font-bold">Sensor 2</h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <div className="mb-10 w-[95%]">
            {sensorData && Object.keys(sensorData).length > 0 ? (
              <SensorInfoItem
                temperature={sensorData.temperature}
                duration={sensorData.duration}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </div>
          <div className="flex w-[95%] flex-col items-center justify-evenly md:justify-start">
            <SensorLineChart
              apiUrl="https://api.thingspeak.com/channels/2176107/feeds.json"
              apiKey="ESPOY24P92FJIH2G"
              field="field2" // Ganti dengan field yang sesuai
              results={8000} // Tambahkan parameter results
            />
          </div>
        </div>
      </div>
    </div>
  );
}
