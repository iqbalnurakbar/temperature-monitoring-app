import React, { useEffect, useState } from "react";
import sensorData from "../../data/dataDummy";
import SensorCard from "./SensorCard";

const SensorItem = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    setSensors(sensorData.sensortemp);
  });
  return (
    <div className="mb-10 w-[95%]">
      {sensors.map((sensor, index) => (
        <SensorCard key={index} sensorData={sensor} />
      ))}
    </div>
  );
};

export default SensorItem;
