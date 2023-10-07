import React from "react";

const SensorName = ({ sensorname }) => {
  return (
    <div className="w-1/4">
      <div className="rounded-t-xl bg-[#f0b429] py-1">
        <p className="text-center font-bold text-white">{sensorname}</p>
      </div>
    </div>
  );
};

export default SensorName;
