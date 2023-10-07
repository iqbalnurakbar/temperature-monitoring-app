import React from "react";
import SensorNamexx from "./SensorName";
import SensorDurationxx from "./SensorDuration";
import SensorBodyxx from "./SensorBody";

const SensorCard = ({ sensorData }) => {
  return (
    <div className="mb-10 w-[95%]">
      <SensorNamexx sensorname={sensorData.name} />
      <SensorBodyxx
        temperature={sensorData.temperature}
        date={sensorData.currentdate}
      />
      <SensorDurationxx duration={sensorData.duration} />
    </div>
  );
};

export default SensorCard;
