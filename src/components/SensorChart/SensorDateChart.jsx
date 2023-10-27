import React, { useState, useEffect } from "react";
import axios from "axios";

function formatDateToDDMMYYYY(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function SensorLineChart({ apiUrl, apiKey, field, results }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?api_key=${apiKey}&results=${results}`,
        );
        const apiData = response.data.feeds.map((feed) => ({
          time: formatDateToDDMMYYYY(feed.created_at),
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
    <>
    </>
  );
}

export default SensorLineChart;