import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function formatDateToDDMMYYYYHHMM(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatDateToHHMM(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function SensorChart({ apiUrl, apiKey, field, results }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?api_key=${apiKey}&results=${results}`,
        );
        const apiData = response.data.feeds.map((feed) => ({
          time: formatDateToHHMM(feed.created_at),
          suhu: parseFloat(feed[field]),
        }));
        setData(apiData);
      } catch (error) {
        console.error("Gagal mengambil data dari API:", error);
      }
    };

    fetchDataFromAPI();
  }, [apiUrl, apiKey, field, results]);

  return (
    <div className="chart-container">
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickCount={12}
          interval={50}
          type="category"
          height={80}
          angle={-45}
          textAnchor="end"
        ></XAxis>
        <YAxis domain={[0, 200]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="suhu"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

export default SensorChart;
