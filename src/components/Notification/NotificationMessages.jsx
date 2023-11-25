import React, { useState, useEffect } from "react";
import { IoAlertOutline } from "react-icons/io5";
import { format } from "date-fns";
import { id } from "date-fns/locale";
8;
import NotificationService from "../../data/NotificationService";

const NotificationMessages = ({ name, currentTemp, dateNotif }) => {
  const [notifications, setNotifications] = useState([]);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDateTime;
  };

  const invalidTime = getCurrentDateTime().split(" ");
  const topTemp = 40;
  const lowTemp = 20;

  const [datePart, timePart] = dateNotif ? dateNotif.split(" ") : invalidTime;
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  const formattedDate = new Date(year, month - 1, day, hour, minute);

  const formatDateNotif = format(formattedDate, "dd MMMM yyyy HH:mm", {
    locale: id,
  });

  useEffect(() => {
    const newNotifications = [];
    if (currentTemp >= topTemp || currentTemp < lowTemp) {
      NotificationService.showNotification(
        "Ada suhu yang berada diluar rentang pengukuran!",
        formatDateNotif,
      );
    } else if (isNaN(parseFloat(currentTemp))) {
      NotificationService.showNotification(
        "Ada sensor yang tidak terbaca!",
        formatDateNotif,
      );
    }
    if (currentTemp >= topTemp) {
      newNotifications.push({
        body: `Suhu pada ${name} berada di atas ${topTemp}°C. Segera cek!`,
        icon: <IoAlertOutline color="red" />,
        timestamp: formatDateNotif,
      });
    } else if (currentTemp < lowTemp) {
      newNotifications.push({
        body: `Suhu pada ${name} berada di bawah ${lowTemp}. Segera cek!`,
        icon: <IoAlertOutline color="red" />,
        timestamp: formatDateNotif,
      });
    } else if (isNaN(parseFloat(currentTemp))) {
      newNotifications.push({
        body: `Suhu pada ${name} tidak terbaca!`,
        icon: <IoAlertOutline color="red" />,
        timestamp: formatDateNotif,
      });
    }

    setNotifications(newNotifications);
  }, [currentTemp, formatDateNotif, name]);


  return (
    <div>
      <ul>
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="border-slate-20 mb-5 flex flex-col gap-4 rounded-md border "
          >
            <div className="flex items-center">
              <span className="mr-2">{notification.icon}</span>
              <span className="text-sm">
                {notification.body}
                <span className="block text-xs italic">
                  {notification.timestamp}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationMessages;
