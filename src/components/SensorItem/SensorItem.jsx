import React, { useEffect, useState } from "react";
import output from "../../data/sensorStats";
import SensorCard from "./SensorCard";

const SensorItem = () => {
  console.log(output)
  const [sensors, setSensors] = useState([])
  useEffect(()=>{
    setSensors(output.sensortemp);
  })

  return (
    <div className="mb-10 w-[95%]">
      {sensors.map((sensor, index)=> (
        <SensorCard key={index} sensorData={sensor}/>
      ))}
    </div>
  );
};

export default SensorItem;