import React, { useEffect, useState } from "react";
import SensorCard from "./SensorCard";
import { sensorUtils } from "../../data/sensorUtils";
import { apiConfigurations1 } from "../../data/apiConfigurations";
function SensorItem({ startDate, endDate, startTime, endTime }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchSensorData = () => {
      const getAPI = apiConfigurations1(startDate, endDate, startTime, endTime);

      sensorUtils(getAPI)
        .then((result) => setData(result))
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 menit dalam milisekon

    return () => clearInterval(intervalId);
  }, [startDate, endDate]);
  return (
    <div className="mb-10 w-full flex-col mx-auto flex items-center justify-center lg:block">
      {data ? (
        <>
          {Object.keys(data).map((sensor) => (
            <SensorCard
              key={sensor}
              sensorName={data[sensor].name}
              temperature={data[sensor].temperature}
              timestamp={data[sensor].timestamp}
              duration={data[sensor].duration}
            />
          ))}
        </>
      ) : (
        <p className="text-center font-semibold text-red-500">
          Terdapat masalah saat mengambil data sensor hari ini dari cloud!
        </p>
      )}
    </div>
  );
}

export default SensorItem;
