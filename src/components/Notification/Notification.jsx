import React from "react";
import { IoMdNotifications } from "react-icons/io";
import NotificationMessages from "./NotificationMessages";

export default function Notification({data }) {
  return (
    <div className="mx-auto mb-10 w-[85%]">
      <div className="rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <div className="">
            <IoMdNotifications color="#f0b429" size={25} />{" "}
          </div>
          <h3 className="text-lg font-bold text-teal-600">Notifikasi</h3>
        </div>

        <div className="">
          {data && data.sensortemp && data.sensortemp.length > 0 ? (
            <>
              {data.sensortemp.map((sensor, index) => (
                <NotificationMessages
                  key={index}
                  name={sensor.name}
                  currentTemp={sensor.temperature.current}
                  dateNotif={sensor.currentdate}
                />
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
