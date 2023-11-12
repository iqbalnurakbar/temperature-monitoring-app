import React, { useState, useEffect } from "react";
import { IoAlertOutline } from "react-icons/io5";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const NotificationMessages = ({ name, currentTemp, dateNotif }) => {
  const [notifications, setNotifications] = useState([]);

  const [datePart, timePart] = dateNotif.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  // Membuat objek Date menggunakan bagian-bagian yang dipisahkan
  const formattedDate = new Date(year, month - 1, day, hour, minute);

  // Menggunakan date-fns untuk memformat tanggal
  const formatDateNotif = format(formattedDate, "dd MMMM yyyy HH:mm", {locale: id});
  
  useEffect(() => {
    const newNotifications = [];

    if (currentTemp >= 50) {
      newNotifications.push({
        body: `Suhu pada ${name} berada diatas 50°C. Segera cek!`,
        icon: <IoAlertOutline color="red" />,
      });
    } else if (currentTemp < 50) {
      newNotifications.push({
        body: `Suhu pada ${name} berada dibawah 50°C. Segera cek!`,
        icon: <IoAlertOutline color="red" />,
      });
    } else if (currentTemp === "NaN") {
      newNotifications.push({
        body: `Suhu pada ${name} tidak terbaca!`,
        icon: <IoAlertOutline color="red" />,
      });
    }

    setNotifications(newNotifications);
  }, [dateNotif]);

  return (
    <div>
      <ul>
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="border-slate-20 mb-5 flex flex-col gap-4 rounded-md border"
          >
            <div className="flex items-center">
              <span className="mr-2">{notification.icon}</span>
              <span className="text-sm">
                {notification.body}
                <span className="block text-xs italic">{formatDateNotif}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationMessages;
