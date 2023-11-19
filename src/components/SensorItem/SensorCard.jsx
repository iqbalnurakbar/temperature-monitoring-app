import React from "react";
import SensorName from "./SensorName";
import SensorDuration from "./SensorDuration";
import SensorBody from "./SensorBody";

const SensorCard = ({ sensorName, temperature, timestamp, duration}) => {
  return (
    <div className="mb-10 w-[95%]">
      <SensorName sensorName={sensorName}/>
      <SensorBody temperature = {temperature} timestamp = {timestamp}
      />
      <SensorDuration duration={duration}/>
    </div>
  );
};

export default SensorCard;
