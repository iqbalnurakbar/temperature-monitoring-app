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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

function SensorBarChartDynamic({
  name,
  startDate,
  endDate,
  startTime,
  endTime,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      const getAPI = apiConfigurations1(startDate, endDate, startTime, endTime);

      try {
        const response = await fetchData(getAPI, name);
        if (response && response.length > 0) {
          const dataGraph = response[0].map((feed) => ({
            time: formatDateToDDMMYYYY(feed.waktu),
            temp: feed.suhu,
          }));
          const barChartData = calculateStatsWeekly(dataGraph);
          setData(barChartData);
        } else setData(null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 menit dalam milisekon

    return () => clearInterval(intervalId);
  }, [name, startDate, endDate]);

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

  const handleDownload = () => {
    const excelDate1 = formatDateToDDMMYYYY(startDate)
    const excelDate2 = formatDateToDDMMYYYY(endDate)
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
    saveAs(blob, `Data ${name}_${excelDate1}-${excelDate2}.xlsx`);
  };

  let maxValue = null;
  let upperBound = null;

  if (data !== null) {
    maxValue = Math.max(...data.map((entry) => parseFloat(entry.temp)));
    upperBound = maxValue + 5; // Sesuaikan kebutuhan
  }

  return (
    <>
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
          <Tooltip
            labelFormatter={(label) => `Waktu: ${label}`}
            formatter={(value) => [`Suhu: ${value} °C`]}
          />
          <Bar dataKey="temp" fill="#06b6d4" barSize={30}>
            <LabelList dataKey="temp" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <button
        className="mb-5 mt-6 rounded-md bg-yellow-500 px-4 py-2 text-center font-bold text-white shadow-sm hover:bg-yellow-600 active:bg-yellow-700"
        onClick={handleDownload}
      >
        Download Data Mingguan
      </button>
    </>
  );
}

export default SensorBarChartDynamic;
