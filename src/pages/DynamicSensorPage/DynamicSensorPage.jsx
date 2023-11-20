import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorInfoItem from "../../components/SensorInfo/SensorInfoItem";
import DatePickerSensor from "../../components/Date Picker/DatePicker";
import SensorLineChartDynamic from "../../components/SensorChart/SensorLineChartDynamic";
import { sensorUtils } from "../../data/sensorUtils";
import SensorBarChartDynamic from "../../components/SensorChart/SensorBarChartDynamic";
import { apiConfigurations1 } from "../../data/apiConfigurations";

const DynamicSensorPage = ({ data, name }) => {
  const [sensorData, setSensorData] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });

  const [selectedDateLine, setSelectedDateLine] = useState(() => {
    const date = new Date();
    return date;
  });
  const [selectedStartDateBar, setSelectedStartDateBar] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 7);
    return date;
  });

  const [selectedEndDateBar, setSelectedEndDateBar] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });

  const handleDateChange = (date) => {
    if (date.isStart) {
      setSelectedEndDate(date.date);
    } else {
      setSelectedStartDate(date.date);
    }
  };

  const handleDateChangeBar = (date) => {
    if (date.isStart) {
      setSelectedEndDateBar(date.date);
    } else {
      setSelectedStartDateBar(date.date);
    }
  };

  const handleDateChangeLine = (date) => {
    if (date.isStart) setSelectedDateLine(date.date);
  };

  const formattedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const startTime = formattedDate(selectedStartDate).slice(11, 16);
  const endTime = formattedDate(selectedEndDate).slice(11, 16);

  const dateLine = formattedDate(selectedDateLine).slice(0, 10);
  useEffect(() => {
    const fetchSensorData = () => {
      const getAPI = apiConfigurations1(dateLine, dateLine, startTime, endTime);

      sensorUtils(getAPI)
        .then((result) => setSensorData(result))
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 menit dalam milisekon

    return () => clearInterval(intervalId);
  }, [startTime, endTime, dateLine]);


  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-sensormobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-sensortablet xl:grid-cols-sensorpc">
        <div className="flex flex-col">
          <Sidebar data={data} />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 pl-4 text-3xl font-bold">{name}</h1>
            <span className="w-1/2">
            <HeaderIcon  />
            </span>
          </div>
          <div className="mx-auto mb-10 w-[95%]">
            {sensorData ? (
              Object.keys(sensorData).map((sensor) => (
                <React.Fragment key={sensor}>
                  {sensorData[sensor].name === name ? (
                    <SensorInfoItem
                      key={sensor}
                      temperature={sensorData[sensor].temperature}
                      duration={sensorData[sensor].duration}
                      timestamp={sensorData[sensor].timestamp}
                      sensorName={sensorData[sensor].name}
                    />
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ))
            ) : (
              <p className="text-center font-semibold text-red-500">
                Terdapat masalah saat mengambil data sensor dari cloud! Cek data
                di waktu lain!
              </p>
            )}
          </div>
          <h2 className="mb-2 mt-4 pl-4 text-xl font-bold">Harian</h2>
          <div className="mx-auto mb-4 flex">
            <DatePickerSensor
              selectedDate={selectedDateLine}
              setSelectedDate={setSelectedDateLine}
              onDateChange={handleDateChangeLine}
              showTime={false}
            />
          </div>
          <div className="mx-auto flex flex-col justify-center gap-2 md:flex-row">
            <DatePickerSensor
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
              onDateChange={handleDateChange}
              showDate={false}
            />
            <div className="text-center">sampai</div>
            <DatePickerSensor
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
              onDateChange={handleDateChange}
              showDate={false}
            />
          </div>
          <div className="flex w-[95%] flex-col items-center md:justify-start">
            <SensorLineChartDynamic
              name={name}
              startDate={dateLine}
              endDate={dateLine}
              startTime={startTime}
              endTime={endTime}
            />
          </div>
          <h2 className="mb-2 mt-4 pl-4 text-xl font-bold">Mingguan</h2>
          <div className="mx-auto flex flex-col justify-center gap-2 md:flex-row">
            <DatePickerSensor
              selectedDate={selectedStartDateBar}
              setSelectedDate={setSelectedStartDateBar}
              onDateChange={handleDateChangeBar}
              showTime={false}
            />
            <div className="text-center">sampai</div>
            <DatePickerSensor
              selectedDate={selectedEndDateBar}
              setSelectedDate={setSelectedEndDateBar}
              onDateChange={handleDateChangeBar}
              showTime={false}
            />
          </div>
          <div className="flex w-[95%] flex-col items-center md:justify-start">
            <SensorBarChartDynamic
              name={name}
              startDate={formattedDate(selectedStartDateBar).slice(0, 10)}
              endDate={formattedDate(selectedEndDateBar).slice(0, 10)}
              startTime="00:00"
              endTime="23:59"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicSensorPage;
