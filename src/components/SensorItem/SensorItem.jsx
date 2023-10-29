import React, { useEffect, useState } from "react";
import { generateOutput, fetchData } from "../../data/sensorStats";
import SensorCard from "./SensorCard";

const SensorItem = ({ apiUrl, apiKey, today }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data dari API menggunakan fetchData dengan argumen apiUrl, apiKey, dan today
    const fetchDataFromAPI = async () => {
      try {
        const apiData = await fetchData(apiUrl, apiKey, today);
        const output = generateOutput(apiData);
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
  }, []);

  return (
    <div className="mb-10 w-[95%]">
      {data && data.sensortemp && data.sensortemp.length > 0 ? (
        <div>
          {console.log(data)}
          {data.sensortemp.map((sensor, index) => (
            <SensorCard key={index} sensorData={sensor} />
          ))}
        </div>
      ) : (
        <p className="text-center font-semibold text-red-500">
          Terdapat masalah saat mengambil data dari cloud!
        </p>
      )}
    </div>
  );
};

export default SensorItem;
