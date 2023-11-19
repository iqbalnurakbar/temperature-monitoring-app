import React, { useEffect, useState } from "react";
import SensorCard from "./SensorCard";
import { sensorUtils } from "../../data/sensorUtils";

function SensorItem({ startDate, endDate, startTime, endTime }) {
  const [data, setData] = useState(null);
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
        // Tambahkan konfigurasi API lainnya sesuai kebutuhan
      ];

      sensorUtils(apiConfigurations)
        .then((result) => setData(result))
        .catch((error) => console.error("Error fetching data:", error));
    };

    // Fetch initially
    fetchSensorData();

    // Set up interval to fetch every 2 minutes
    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 minutes in milliseconds

    // Clean up interval on component unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [startDate, endDate]);
  return (
    <div className="mb-10 w-[95%] flex-col">
      
      {data ? (
        <div>
          {Object.keys(data).map((sensor) => (
            <>
            <SensorCard
              key={sensor}
              sensorName={data[sensor].name}
              temperature={data[sensor].temperature}
              timestamp={data[sensor].timestamp}
              duration={data[sensor].duration}
            />
            </>
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
