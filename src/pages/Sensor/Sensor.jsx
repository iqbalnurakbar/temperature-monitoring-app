import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar2 from "../../components/Sidebar/Sidebar2";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorInfoItem from "../../components/SensorInfo/SensorInfoItem";
import DatePickerSensor from "../../components/Date Picker/DatePicker";
import SensorLineChartDynamic from "../../components/SensorChart/SensorLineChartDynamic";
import { sensorUtils } from "../../data/sensorUtils";
import SensorBarChartDynamic from "../../components/SensorChart/SensorBarChartDynamic";
import { apiConfigurations1 } from "../../data/apiConfigurations";
import BottomNavigationBar from "../../components/BottomNavBar/BottomNavBar";
import { useSpring, animated } from "react-spring";

const Sensor = () => {
  // useState
  const [sensorData, setSensorData] = useState(null);

  // useState untuk datePicker waktu linechart
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  // useState untuk datePicker waktu linechart
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });

  // useState untuk datePicker tanggal linechart
  const [selectedDateLine, setSelectedDateLine] = useState(() => {
    const date = new Date();
    return date;
  });

  // useState untuk datePicker tanggal barchart
  const [selectedStartDateBar, setSelectedStartDateBar] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 6);
    return date;
  });

  // useState untuk datePicker tanggal barchart
  const [selectedEndDateBar, setSelectedEndDateBar] = useState(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });

  // useState untuk auto checkbox sensor ketika menekan nama sensor di Dashboard
  const [selectedSensors, setSelectedSensors] = useState([]);

  //Filter dan mapping data dari API Thingspeak
  const selectedSensorData = sensorData
    ? Object.keys(sensorData)
        .filter((sensor) => selectedSensors.includes(sensor))
        .map((sensor) => ({
          id: sensor,
          name: sensorData[sensor].name,
          temperature: sensorData[sensor].temperature,
          duration: sensorData[sensor].duration,
          timestamp: sensorData[sensor].timestamp,
        }))
    : [];

  //Formatting waktu ke YYYY-MM-DD HH:nn
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

  const location = useLocation();

  // useEffect untuk auto checkbox
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sensorNameParam = searchParams.get("sensor");

    if (sensorNameParam) {
      // Jika ada query parameter sensor, checkbox langsung tercentang
      setSelectedSensors([sensorNameParam]);
    }
  }, [location.search]);

  // useEffect untuk GET API Thingspeak
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

  const handleSensorToggle = (sensor) => {
    if (selectedSensors.includes(sensor)) {
      setSelectedSensors(
        selectedSensors.filter((selected) => selected !== sensor),
      );
    } else {
      setSelectedSensors([...selectedSensors, sensor]);
    }
  };

  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-full w-full grid-cols-sensormobile gap-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:h-[97%] md:w-[97%] md:grid-cols-sensortablet md:rounded-xl md:bg-[#f0f4f8] xl:grid-cols-sensorpc">
        <div className="hidden md:flex">
          <Sidebar2 />
        </div>
        <div className="flex md:hidden">
          <BottomNavigationBar />
        </div>
        <div className="absolute mx-auto flex w-[95%] flex-col md:static md:mx-0">
          <div className="flex justify-between">
            <animated.h1
              className="mt-4 pl-4 text-3xl font-bold"
              style={fadeInAnimation}
            >
              Sensor
            </animated.h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <animated.div
            className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            style={fadeInAnimation}
          >
            {sensorData ? (
              Object.keys(sensorData).map((sensor) => (
                <React.Fragment key={sensor}>
                  <div className="abbg-blue mx-2 mb-4 flex items-center gap-2 rounded bg-[#3ebd93] px-4 py-2 text-white shadow-lg md:mx-4 md:mb-6 lg:mb-8">
                    <input
                      type="checkbox"
                      id={sensor}
                      checked={selectedSensors.includes(sensor)}
                      onChange={() => handleSensorToggle(sensor)}
                    />
                    <label htmlFor={sensor}>{sensorData[sensor].name}</label>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <p className="absolute -translate-x-1/2 transform text-center font-semibold text-red-500">
                Terdapat masalah saat mengambil data sensor!
              </p>
            )}
          </animated.div>

          {selectedSensorData.map((sensor) => (
            <React.Fragment key={sensor}>
              <div className="mx-auto mb-10 w-full">
                <div className="mb-8 pl-4 text-2xl font-bold">
                  {sensor.name}
                </div>
                <SensorInfoItem
                  key={sensor.id}
                  temperature={sensor.temperature}
                  duration={sensor.duration}
                  timestamp={sensor.timestamp}
                  sensorName={sensor.name}
                />
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
              <div className="mx-auto flex w-full flex-col items-center md:justify-start">
                <SensorLineChartDynamic
                  name={sensor.name}
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
              <div className="mx-auto flex w-full flex-col items-center md:justify-start">
                <SensorBarChartDynamic
                  name={sensor.name}
                  startDate={formattedDate(selectedStartDateBar).slice(0, 10)}
                  endDate={formattedDate(selectedEndDateBar).slice(0, 10)}
                  startTime="00:00"
                  endTime="23:59"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sensor;
