import React, { useEffect, useState } from "react";
import SensorCard from "./SensorCard";
import { sensorUtils } from "../../data/sensorUtils";
import { apiConfigurations1 } from "../../data/apiConfigurations";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function SensorItem({ startDate, endDate, startTime, endTime }) {
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowWidth = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkWindowWidth();

    window.addEventListener("resize", checkWindowWidth);

    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  useEffect(() => {
    const fetchSensorData = () => {
      const getAPI = apiConfigurations1(startDate, endDate, startTime, endTime);

      sensorUtils(getAPI)
        .then((result) => setData(result))
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 2 * 60 * 1000); // 2 menit dalam milisekon

    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Object.keys(data).length,
      );
      setActiveIndex((prevIndex) => (prevIndex + 1) % Object.keys(data).length);
      setIsFading(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Object.keys(data).length - 1 : prevIndex - 1,
      );
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? Object.keys(data).length - 1 : prevIndex - 1,
      );
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="mx-auto mb-10 flex w-full flex-col items-center justify-center lg:block">
      {data ? (
        isMobile ? (
          <>
            <div
              className={`relative transition-opacity duration-300  ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
            <button
                onClick={handlePrev}
                className="absolute top-1/2 z-50 -translate-y-1/2 transform rounded-xl bg-[#f0b429] shadow-md"
              >
                <BiChevronLeft color="white" size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-2 top-1/2 z-50 -translate-y-1/2 transform rounded-xl bg-[#f0b429] shadow-md"
              >
                <BiChevronRight color="white" size={24} />
              </button>
              <div className="mx-auto">
                
              <SensorCard
                key={Object.keys(data)[currentIndex]}
                sensorName={data[Object.keys(data)[currentIndex]].name}
                temperature={data[Object.keys(data)[currentIndex]].temperature}
                timestamp={data[Object.keys(data)[currentIndex]].timestamp}
                duration={data[Object.keys(data)[currentIndex]].duration}
              />
              </div>
            </div>
            <div className="-mt-6 z-10 flex items-center justify-center">
              
              {data &&
                Object.keys(data).map((key, index) => (
                  <div
                    key={key}
                    className={`mx-1 h-2 w-2 rounded-full ${
                      index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                    } cursor-pointer`}
                    onClick={() => setActiveIndex(index)}
                  ></div>
                ))}
            </div>
          </>
        ) : (
          <>
            {Object.keys(data).map((sensor) => (
              <SensorCard
                key={sensor}
                sensorName={data[sensor].name}
                temperature={data[sensor].temperature}
                timestamp={data[sensor].timestamp}
                duration={data[sensor].duration}
              />
            ))}
          </>
        )
      ) : (
        <p className="text-center font-semibold text-red-500">
          Terdapat masalah saat mengambil data sensor hari ini dari cloud!
        </p>
      )}
    </div>
  );
}

export default SensorItem;
