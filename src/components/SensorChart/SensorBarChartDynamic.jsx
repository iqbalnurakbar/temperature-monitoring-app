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
import { apiConfigurations1 } from "../../data/apiConfigurations";
import { calculateStatsWeekly } from "../../data/sensorUtils";

function SensorBarChartDynamic({
  name,
  startDate,
  endDate,
  startTime,
  endTime,
}) {
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
      const getAPI = apiConfigurations1(startDate, endDate, startTime, endTime);

      try {
        const response = await fetchData(getAPI, name);
        const dataGraph = response[0].map((feed) => ({
          time: formatDateToDDMMYYYY(feed.waktu),
          temp: feed.suhu,
        }));
        const barChartData = calculateStatsWeekly(dataGraph);
        setData(barChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 menit dalam milisekon

    return () => clearInterval(intervalId);
  }, [name, startDate, endDate]);

  const maxValue = Math.max(...data.map((entry) => parseFloat(entry.temp)));
  const upperBound = maxValue + 5; // Sesuaikan kebutuhan

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
