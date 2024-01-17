import React from "react";
import {useNavigate } from "react-router-dom";

const SensorName = ({ sensorName }) => {
  const navigate = useNavigate();

  //Kode untuk handleClick Nama Sensor agar langsung navigate ke grafiknya masing-masing
  const handleSensorClick = () => {
    navigate(`/sensor?sensor=${sensorName}`);
  };

  return (
    <div className="w-1/2 lg:w-1/4">
      <div className="rounded-t-xl bg-[#f0b429] py-1">
        <p
          onClick={handleSensorClick}
          className="text-center font-bold text-white cursor-pointer"
        >
          {sensorName}
        </p>
      </div>
    </div>
  );
};

export default SensorName;
