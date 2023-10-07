import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { IoAlertOutline } from "react-icons/io5";

export default function Notification() {
  const notif = [
    {
      body: "Mesin 1 diatas suhu normal",
      icon: <IoAlertOutline color="red" />,
    },
    {
      body: "Mesin 2 dibawah suhu normal",
      icon: <IoAlertOutline color="red" />,
    },
    {
      body: "Mesin 3 diatas suhu normal",
      icon: <IoAlertOutline color="red" />,
    },
    {
      body: "Mesin 4 dibawah suhu normal",
      icon: <IoAlertOutline color="red" />,
    },
  ];
  return (
    <div className="mx-auto mb-10 w-[85%]">
      <div className="rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <div className="">
            <IoMdNotifications color="#f0b429" size={25} />{" "}
          </div>
          <h3 className="text-lg font-bold text-teal-600">Notifikasi</h3>
        </div>

        <ul className="">
          {notif.map((val, index) => {
            return (
              <li
                key={index}
                className="border-slate-20 mb-5 flex items-center gap-4 rounded-md border"
              >
                <div className="pl-1">{val.icon}</div>
                <p className="text-xs font-medium">{val.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
