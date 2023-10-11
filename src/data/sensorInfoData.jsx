// MenuData.js
import React from "react";
import {
  FaTemperatureFull,
  FaTemperatureEmpty,
  FaTemperatureHalf,
  FaRegClock,
  FaTemperatureLow,
} from "react-icons/fa6";

export const sensorInfoData = [
  {
    id: 1000,
    name: "Durasi Mesin",
    icon: <FaRegClock size={25}/>,
  },
  {
    id: 2000,
    name: "Suhu Saat Ini",
    icon: <FaTemperatureLow color="#065f46" size={25}/>,
  },
  {
    id: 3000,
    name: "Suhu Minimum",
    icon: <FaTemperatureEmpty color="#f7c948" size={25}/>,
  },
  {
    id: 4000,
    name: "Suhu Maksimum",
    icon: <FaTemperatureFull color="ef4e4e" size={25}/>,
  },
  {
    id: 5000,
    name: "Suhu Rata - Rata",
    icon: <FaTemperatureHalf color="#0284c7" size={25}/>,
  },
];
