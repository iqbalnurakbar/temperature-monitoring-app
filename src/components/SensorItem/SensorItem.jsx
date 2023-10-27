import React, { useEffect, useState } from "react";
import { generateOutput, fetchData } from "../../data/sensorStats";
import SensorCard from "./SensorCard";

const SensorItem = ({ apiUrl, apiKey, today }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data dari API menggunakan fetchData dengan argumen apiUrl, apiKey, dan today
    const fetchDataInterval = async () => {
      try {
        const apiData = await fetchData(apiUrl, apiKey, today);
        const output = generateOutput(apiData);
        setData(output);
      } catch (error) {
        console.error("Terjadi kesalahan: ", error.message);
      }
    };
    fetchDataInterval();

    const intervalId = setInterval(fetchDataInterval, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="mb-10 w-[95%]">
      {data ? (
        <div>
          {data.sensortemp.map((sensor, index) => (
            <SensorCard key={index} sensorData={sensor} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SensorItem;
