import React from "react";
import { Link } from "react-router-dom";
const SensorName = ({ sensorname, sensorRoute }) => {
  return (
    <div className="w-1/4">
      <div className="rounded-t-xl bg-[#f0b429] py-1">
        <Link to={sensorRoute}>
        <p className="text-center font-bold text-white cursor-pointer">{sensorname}</p>
        </Link>
      </div>
    </div>
  );
};

export default SensorName;
