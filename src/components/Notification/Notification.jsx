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
          {data? (
            <>
              {Object.keys(data).map((sensor) => (
                <NotificationMessages
                  key={sensor}
                  name={data[sensor].name}
                  currentTemp={data[sensor].temperature.current}
                  dateNotif={data[sensor].timestamp.current}
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
