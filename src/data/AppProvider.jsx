import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSensorSubNav, setShowSensorSubNav] = useState(false);

  const handleSensorClick = (menu) => {
    if (menu.route === activeMenu) {
      setShowSensorSubNav((prevShowSensorSubNav) => !prevShowSensorSubNav);
    } else {
      setActiveMenu(menu.route);
      setShowSensorSubNav(true);
    }
  };

  return (
    <AppContext.Provider
      value={{ activeMenu, showSensorSubNav, handleSensorClick }}
    >
      {children}
    </AppContext.Provider>
  );
};
