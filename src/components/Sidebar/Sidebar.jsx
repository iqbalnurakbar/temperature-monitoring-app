import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { menusData } from "../../data/menusData";
import { BiChevronLeft, BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div className="relative">
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
            <ul className="">
              {menusData.map((val, index) => {
                return (
                  <React.Fragment key={index}>
                    <Link to={val.route}>
                      <li
                        key={val.id}
                        className={`flex cursor-pointer items-center gap-x-3 rounded-md p-2 text-white ${
                          val.gap ? "mt-10" : "mt-2"
                        } ${
                          selected === val.id
                            ? "bg-[#f0b429]"
                            : "hover:bg-teal-700"
                        } transition-all duration-300`}
                        onClick={() => setSelected(val.id)}
                      >
                        <div>{val.icon}</div>
                        <span
                          className={`mr-4 text-xs ${
                            !open && "hidden"
                          } origin-left duration-200`}
                        >
                          {val.name}
                        </span>

                        {val.subNav && (
                          <BiChevronDown
                            color="white"
                            onClick={() => setSubNavOpen(!subNavOpen)}
                            className={`${
                              subNavOpen && "rotate-180"
                            } duration-150`}
                          />
                        )}
                      </li>
                    </Link>
                    {val.subNav && subNavOpen && open && (
                      <ul className="">
                        {val.subNav.map((subNavItem) => (
                          <Link to={subNavItem.route}>
                            <li
                              key={subNavItem.idsubsensor}
                              className={`flex cursor-pointer items-center gap-x-3 rounded-md p-2 pl-10 text-xs text-white ${
                                selected === subNavItem.idsubsensor
                                  ? "bg-[#f0b429]"
                                  : "hover:bg-teal-700"
                              } duration-300`}
                              onClick={() =>
                                setSelected(subNavItem.idsubsensor)
                              }
                            >
                              {subNavItem.sensorname}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
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
