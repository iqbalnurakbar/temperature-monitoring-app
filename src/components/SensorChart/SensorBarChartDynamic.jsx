import React, { useState, useEffect } from "react";
import { fetchData } from "../../data/fetchGraphs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function SensorBarChartDynamic({ name, startDate, endDate }) {
  const [data, setData] = useState([]);

  function formatDateToDDMMYYYY(dateTimeString) {
    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = monthAbbreviations[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    const fetchSensorData = async () => {
      const apiConfigurations = [
        {
          url: `https://api.thingspeak.com/channels/2342296/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        {
          url: `https://api.thingspeak.com/channels/2344351/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        {
          url: `https://api.thingspeak.com/channels/2347341/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59`,
          fieldIndices: [1, 2, 4, 5],
          timeIndices: [3, 3, 6, 6],
        },
        // Tambahkan konfigurasi API lainnya sesuai kebutuhan
      ];

      try {
        const response = await fetchData(apiConfigurations, name);
        const dataGraph = response[0].map((feed) => ({
          time: formatDateToDDMMYYYY(feed.waktu),
          temp: feed.suhu,
        }));
        const dailyAverages = {};

        dataGraph.forEach((entry) => {
          const { time, temp } = entry;
          dailyAverages[time] = dailyAverages[time] || {
            totalTemperature: 0,
            count: 0,
          };
          if (!isNaN(temp)) {
            dailyAverages[time].totalTemperature += parseFloat(temp);
            dailyAverages[time].count++;
          }
        });

        const barChartData = Object.entries(dailyAverages).map(
          ([time, { totalTemperature, count }]) => ({
            time,
            temp: count > 0 ? (totalTemperature / count).toFixed(1) : "NaN",
          }),
        );
    
        setData(barChartData);
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
  }, [name, startDate, endDate]);

  const maxValue = Math.max(...data.map(entry => parseFloat(entry.temp)));
  const upperBound = maxValue + 5; // Sesuaikan sesuai kebutuhan

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          interval={0}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis domain={[0, upperBound]} />
        <Tooltip />
        <Bar dataKey="temp" fill="#06b6d4" barSize={30}>
          <LabelList dataKey="temp" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SensorBarChartDynamic;
