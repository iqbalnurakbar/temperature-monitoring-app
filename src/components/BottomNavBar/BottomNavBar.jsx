import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../data/AppProvider";
import { menusDataMobile } from "../../data/menusData";

const BottomNavigationBar = () => {
  const { activeMenu, handleSensorClick } =
    useContext(AppContext);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex h-20 items-center justify-evenly bg-[#3ebd93]">
      {menusDataMobile.map((menu) => (
        <div key={menu.id} className="relative flex flex-col items-center justify-evenly w-20">
          <Link
            to={menu.route}
            onClick={() => handleSensorClick(menu)}
            className={`flex flex-col items-center text-white justify-evenly ${
              activeMenu === menu.route ? "rounded bg-[#f0b429] p-3" : ""
            }`}
          >
            {menu.icon}
            <span className="text-xs">{menu.name}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default BottomNavigationBar;
