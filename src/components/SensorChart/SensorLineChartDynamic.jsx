import React, { useEffect, useState } from "react";
import { fetchData } from "../../data/fetchGraphs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { apiConfigurations1 } from "../../data/apiConfigurations";

function formatDateToHHNN(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

const SensorLineChartDynamic = ({
  name,
  startDate,
  endDate,
  startTime,
  endTime,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      const getAPI = apiConfigurations1(startDate, endDate, startTime, endTime);

      try {
        const response = await fetchData(getAPI, name);
        if (response && response.length > 0) {
          const dataGraph = response[0].map((feed) => ({
            time: formatDateToHHNN(feed.waktu),
            temp: feed.suhu,
          }));
          setData(dataGraph);
        } else setData(null)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 menit dalam milisekon

    return () => clearInterval(intervalId);
  }, [name, startDate, endDate, startTime, endTime]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickCount={12}
          type="category"
          height={80}
          angle={-45}
          textAnchor="end"
        />
        <YAxis domain={[]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#06b6d4"
          activeDot={{ r: 4 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorLineChartDynamic;
