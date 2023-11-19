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
      const apiConfigurations = [
        {
          url: `https://api.thingspeak.com/channels/2342296/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        {
          url: `https://api.thingspeak.com/channels/2344351/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        {
          url: `https://api.thingspeak.com/channels/2347341/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        // Tambahkan konfigurasi API lainnya sesuai kebutuhan
      ];

      try {
        const response = await fetchData(apiConfigurations, name);
        const dataGraph = response[0].map((feed) => ({
          time: formatDateToHHNN(feed.waktu),
          temp: feed.suhu,
        }));

        setData(dataGraph)
        console.log(dataGraph);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch initially
    fetchSensorData();

    // Set up interval to fetch every 2 minutes
    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 minutes in milliseconds

    // Clean up interval on component unmount or when dependencies change
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
