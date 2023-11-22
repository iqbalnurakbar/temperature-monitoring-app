import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSensorSubNav, setShowSensorSubNav] = useState(false);

  const handleSensorClick = (menu) => {
    if (menu.route === activeMenu) {
      // If the clicked menu is already active, toggle the subnav visibility
      setShowSensorSubNav((prevShowSensorSubNav) => !prevShowSensorSubNav);
    } else {
      // If a different menu is clicked, set it as the active menu and show the subnav
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
