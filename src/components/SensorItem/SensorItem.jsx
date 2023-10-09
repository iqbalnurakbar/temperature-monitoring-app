import React, { useEffect, useState } from "react";
import { generateOutput, fetchData } from '../../data/sensorStats';
import SensorCard from "./SensorCard";

const SensorItem = () => {
   const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data dari API menggunakan fetchData
    fetchData()
      .then((apiData) => {
        // Hasilkan output menggunakan generateOutput
        const output = generateOutput(apiData);
        setData(output);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error.message);
      });
  }, []);

  return (
    <div className="mb-10 w-[95%]">
      {data ? (
        <div>
          {data.sensortemp.map((sensor, index) => (
            <SensorCard key={index} sensorData={sensor}/>
          ))}
        </div>
      ) : (''
      )}
    </div>
  );
}

export default SensorItem;