import React, { useState, useEffect } from "react";
import axios from "axios";
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

function SensorBarChartDaily({ apiUrl, apiKey, field, startDate, endDate }) {
  const [data, setData] = useState([]);

  function formatDateToDDMMYYYY(dateTimeString) {
    const monthAbbreviations = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = monthAbbreviations[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?timezone=Asia%2FJakarta&api_key=${apiKey}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59`,
        );
        const apiData = response.data.feeds.map((feed) => ({
          date: formatDateToDDMMYYYY(feed.created_at),
          suhu: parseFloat(feed[field]).toFixed(1),
        }));
        const dailyAverages = {};

        // Menghitung rata-rata harian
        apiData.forEach((entry) => {
          const { date, suhu } = entry;
          dailyAverages[date] = dailyAverages[date] || { totalTemperature: 0, count: 0 };
          if (!isNaN(suhu)) {
            dailyAverages[date].totalTemperature += parseFloat(suhu);
            dailyAverages[date].count++;
          }
        });

        const chartData = Object.entries(dailyAverages).map(([date, { totalTemperature, count }]) => ({
          date,
          suhu: count > 0 ? (totalTemperature / count).toFixed(1) : "NaN",
        }));

        setData(chartData);
      } catch (error) {
        console.error("Gagal mengambil data dari API:", error);
      }
    };

    fetchDataFromAPI();
    const intervalId = setInterval(fetchDataFromAPI, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [apiUrl, apiKey, field, startDate, endDate]);

  return (
<ResponsiveContainer width="90%" height={400}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis domain={[0, "auto"]} />
    <Tooltip />
    <Bar dataKey="suhu" fill="#06b6d4" barSize={50}>
      <LabelList dataKey="suhu" position="top" />
    </Bar>
  </BarChart>
</ResponsiveContainer>
  );
}

export default SensorBarChartDaily;
