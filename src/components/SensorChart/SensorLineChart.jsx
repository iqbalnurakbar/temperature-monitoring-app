import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatDateToDDMMYYYYHHNN(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatDateToHHNN(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function SensorLineChart({ apiUrl, apiKey, field, today }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?timezone=Asia%2FJakarta&api_key=${apiKey}&start=${today}%2000:00:00&end=${today}%2023:59:59`,
        );
        const apiData = response.data.feeds.map((feed) => ({
          time: formatDateToHHNN(feed.created_at),
          suhu: parseFloat(feed[field]),
        }));
        setData(apiData);
      } catch (error) {
        console.error("Gagal mengambil data dari API:", error);
      }
    };

    fetchDataFromAPI();
    const intervalId = setInterval(fetchDataFromAPI, 30000)
    return () =>{
      clearInterval(intervalId);
    }
  }, [apiUrl, apiKey, field, today]);

  return (
    <>
      <div>Tanggal: {today}</div>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickCount={12}
            interval={65}
            type="category"
            height={80}
            angle={-45}
            textAnchor="end"
          ></XAxis>
          <YAxis domain={[]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="suhu"
            stroke="#8884d8"
            activeDot={{ r: 4 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default SensorLineChart;
