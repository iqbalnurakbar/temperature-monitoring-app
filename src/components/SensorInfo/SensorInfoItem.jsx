import React from "react";
import { sensorInfoData } from "../../data/sensorInfoData";
import SensorInfoCard from "./SensorInfoCard";

function SensorInfoItem({ temperature, duration, timestamp, sensorName }) {
  return (
    <>
      <div className="flex justify-evenly flex-col md:flex-row gap-4">
        <SensorInfoCard
          name={sensorInfoData[0].name}
          icon={sensorInfoData[0].icon}
          data={duration.hours}
          data2={duration.minutes}
          unit='j'
          unit2='m'
        />

        <SensorInfoCard
          name={sensorInfoData[1].name}
          icon={sensorInfoData[1].icon}
          data={temperature.current}
          unit='°C'
        />

        <SensorInfoCard
          name={sensorInfoData[2].name}
          icon={sensorInfoData[2].icon}
          data={temperature.minimum}
          unit='°C'
        />

        <SensorInfoCard
          name={sensorInfoData[3].name}
          icon={sensorInfoData[3].icon}
          data={temperature.maximum}
          unit='°C'
        />

        <SensorInfoCard
          name={sensorInfoData[4].name}
          icon={sensorInfoData[4].icon}
          data={temperature.average}
          unit='°C'
        />
      </div>
    </>
  );
}

export default SensorInfoItem;
