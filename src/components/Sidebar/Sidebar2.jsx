import React, { useState, useContext } from "react";
import Logo from "/icons/pwa-192x192.png";
import { BiChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { menusData } from "../../data/menusData";
import { AppContext } from "../../data/AppProvider";

export default function Sidebar2() {
  const [open, setOpen] = useState(true);
  const { activeMenu, handleSensorClick } = useContext(AppContext);

  return (
    <div className="relative md:flex">
      <div className={`absolute md:left-0 ${open ? "left-0" : "-left-12"}`}>
        <nav
          className={`${
            open ? "w-40" : "w-12"
          } fixed z-10 h-[97%] rounded-l-xl bg-[#3ebd93] p-2 duration-300`}
        >
          <div>
            <div
              className={`absolute -right-3 top-14 cursor-pointer rounded-full border bg-cyan-400 object-cover ${
                !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            >
              <BiChevronLeft color="white" size={22} />
            </div>
            <Link to="/dashboard">
              <div className="mb-5 mt-4 flex origin-left cursor-pointer items-center gap-x-2 px-1">
                <img src={Logo} alt="logo" className="h-6 w-6" />
                <h1
                  className={`origin-left text-xl font-bold text-white ${
                    !open && "scale-0"
                  }`}
                >
                  MonSu
                </h1>
              </div>
            </Link>
            <ul className="">
              {menusData.map((menuItem) => {
                return (
                  <React.Fragment key={menuItem.id}>
                    <Link to={menuItem.route}>
                      <li
                        key={menuItem.id}
                        className={`my-4 flex cursor-pointer items-center gap-x-3 rounded-md p-2 text-white ${
                          menuItem.gap ? "mt-10" : "mt-2"
                        } transition-all duration-300 ${
                          activeMenu === menuItem.route
                            ? "rounded bg-[#f0b429]"
                            : ""
                        }`}
                        onClick={() => handleSensorClick(menuItem)}
                      >
                        <div>{menuItem.icon}</div>
                        {open && (
                          <>
                            <span
                              className={`text-md mr-4 origin-left duration-200`}
                            >
                              {menuItem.name}
                            </span>
                          </>
                        )}
                      </li>
                    </Link>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
