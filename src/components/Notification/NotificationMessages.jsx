import React, { useState, useEffect } from "react";
import { IoAlertOutline } from "react-icons/io5";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import NotificationService from "../../data/NotificationService";
const NotificationMessages = ({ name, currentTemp, dateNotif }) => {
  const [notifications, setNotifications] = useState([]);

  //Batas atas dan batas bawah suhu yang diatur untuk memunculkan notifikasi
  const topTemp = 130;
  const lowTemp = 20;

  const [datePart, timePart] = dateNotif.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  const formattedDate = new Date(year, month - 1, day, hour, minute);

  const formatDateNotif = format(formattedDate, "dd MMMM yyyy HH:mm", {
    locale: id,
  });

  useEffect(() => {
    const newNotifications = [];
    let backgroundNotificationBody = "";
    if (currentTemp >= topTemp || currentTemp < lowTemp) {
      backgroundNotificationBody = "Ada suhu yang berada diluar rentang pengukuran!";
    } 
    
    // else if (isNaN(parseFloat(currentTemp))) {
    //   backgroundNotificationBody = "Ada sensor yang tidak terbaca!";
    // }

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
    } else if (currentTemp === "-") {
      newNotifications.push({
        body: `Suhu pada ${name} tidak terbaca!`,
        icon: <IoAlertOutline color="red" />,
        timestamp: formatDateNotif,
      });
    }

    setNotifications(newNotifications);

    if (backgroundNotificationBody) {
      NotificationService.showNotification(
        backgroundNotificationBody,
        formatDateNotif,
      );
      triggerBackgroundSync({
        body: backgroundNotificationBody,
        timestamp: formatDateNotif,
      });
    }
  }, [currentTemp, formatDateNotif, name]);

  const triggerBackgroundSync = async (data) => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register("syncNotification", { data });
      } catch (error) {
        console.error("Background sync registration failed:", error);
      }
    }
  };

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
