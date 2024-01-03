import React, { useEffect, useState } from "react";
import { fetchData } from "../../data/fetchGraphs";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
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

function formatDateToHHNNSS(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
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
            date: formatDateToDDMMYYYY(feed.waktu),
            time: formatDateToHHNNSS(feed.waktu),
            temp: feed.suhu,
          }));
          setData(dataGraph);
        } else setData(null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [startDate, endDate, startTime, endTime, name]);

  const handleDownload = () => {
    const excelDate = formatDateToDDMMYYYY(startDate);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SensorData");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Data ${name}_${excelDate}.xlsx`);
  };

  let upperBound = null;

  if (data !== null) {
    upperBound   = Math.max(...data.map((entry) => parseFloat(entry.temp)));
     // Sesuaikan kebutuhan
  }

  return (
    <>
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
          <YAxis domain={[0, upperBound]} />
          <Tooltip
            labelFormatter={(label) => `Waktu: ${label}`}
            formatter={(value) => [`Suhu: ${value} °C`]}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#06b6d4"
            activeDot={{ r: 4 }}
            dot={false }
          />
        </LineChart>
      </ResponsiveContainer>
      <button
        className="mb-5 mt-6 rounded-md bg-yellow-500 px-4 py-2 text-center font-bold text-white shadow-sm hover:bg-yellow-600 active:bg-yellow-700"
        onClick={handleDownload}
      >
        Download Data Harian
      </button>
    </>
  );
};

export default SensorLineChartDynamic;
