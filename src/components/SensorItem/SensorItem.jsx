import React from "react";
import SensorItemBody from "./SensorItemBody";
import SensorDuration from "./SensorDuration";
import SensorName from "./SensorName";

export const SensorItem = () => {
  return (
    <div className="mb-10 w-[95%]">
      <SensorName />
      <SensorItemBody />
      <SensorDuration />
    </div>
  );
};

export default SensorItem;
