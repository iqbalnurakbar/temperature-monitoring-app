import React, { useEffect, useState } from "react";
import { generateOutput} from "../../data/sensorStats";
import SensorCard from "./SensorCard";
import axios from "axios";

function SensorItem({
  apiUrl,
  apiKey,
  startDate,
  endDate,
  startTime,
  endTime,
}) {
  const [data, setData] = useState(null);

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
          Terdapat masalah saat mengambil data sensor hari ini dari cloud!
        </p>
      )}
    </div>
  );
}

export default SensorItem;
