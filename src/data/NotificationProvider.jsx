//Kode dibuat agar notifikasi dapat berjalan di latar belakang halaman lain
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const newNotifications = [];

  const addNotification = (notification) => {
    newNotifications.push(notification);
    setNotifications(newNotifications);
  };
  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
