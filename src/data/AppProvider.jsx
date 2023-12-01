import React, { createContext, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const handleSensorClick = (menu) => {
    if (menu.route !== activeMenu) {
      setActiveMenu(menu.route);
    }
    if (menu.name === "Keluar") {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AppContext.Provider value={{ activeMenu, handleSensorClick }}>
      {children}
    </AppContext.Provider>
  );
};
