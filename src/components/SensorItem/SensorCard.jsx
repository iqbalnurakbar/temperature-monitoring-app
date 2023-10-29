import React from "react";
import SensorName from "./SensorName";
import SensorDuration from "./SensorDuration";
import SensorBody from "./SensorBody";

const SensorCard = ({ sensorData }) => {
  return (
    <div className="mb-10 w-[95%]">
      <SensorName sensorname={sensorData.name}/>
      <SensorBody temperature={sensorData.temperature} time={sensorData.timestamp}
      />
      <SensorDuration duration={sensorData.duration}/>
    </div>
  );
};

export default SensorCard;