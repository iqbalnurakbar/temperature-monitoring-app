import React from "react";
import { IoMdNotifications } from "react-icons/io";
import NotificationMessages from "./NotificationMessages";

export default function Notification({data }) {
  let currentTemperatureArray = null
  if(data) {
    currentTemperatureArray= Object.keys(data).map((sensor)=>{
      return data[sensor].temperature.current
    })
  }
  return (
    <div className="mx-auto mb-10 w-[85%]">
      <div className="rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <div className="">
            <IoMdNotifications color="#f0b429" size={25} />{" "}
          </div>
          <h3 className="text-lg font-bold text-teal-600">Notifikasi</h3>
        </div>

        <div>
        {data ? (
            <>
              {Object.keys(data).map((sensor) => (
                data[sensor].name !== "Sumber Pemanas" && (
                  <NotificationMessages
                    key={sensor}
                    name={data[sensor].name}
                    currentTemp={data[sensor].temperature.current}
                    dateNotif={data[sensor].timestamp.current}
                    arrayTemp={currentTemperatureArray}
                  />
                )
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
