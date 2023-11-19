import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { dynamicMenusData } from "../../data/dynamicMenusData";
import { BiChevronLeft, BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Sidebar({ data }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(null);

  const [menuStates, setMenuStates] = useState(
    dynamicMenusData(data).reduce((acc, menuItem) => {
      acc[menuItem.id] = { subNavOpen: false };
      return acc;
    }, {}),
  );

  const dynamicData = dynamicMenusData(data);

  const handleMenuClick = (menuItem) => {
    setSelected(menuItem.id);

    if (menuItem.subNav) {
      setMenuStates((prev) => ({
        ...prev,
        [menuItem.id]: {
          ...prev[menuItem.id],
          subNavOpen: !prev[menuItem.id].subNavOpen,
        },
      }));
    }
  };

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
              {dynamicData.map((menuItem) => {
                return (
                  <React.Fragment key={menuItem.id}>
                    <Link to={menuItem.route}>
                      <li
                        key={menuItem.id}
                        className={`flex cursor-pointer items-center gap-x-3 rounded-md p-2 text-white ${
                          menuItem.gap ? "mt-10" : "mt-2"
                        } ${
                          selected === menuItem.id
                            ? "bg-[#f0b429]"
                            : "hover:bg-teal-700"
                        } transition-all duration-300`}
                        onClick={() => handleMenuClick(menuItem)}
                      >
                        <div>{menuItem.icon}</div>
                        {open && (
                          <>
                            <span
                              className={`mr-4 origin-left text-xs duration-200`}
                            >
                              {menuItem.name}
                            </span>
                          </>
                        )}

                        {menuItem.subNav && (
                          <BiChevronDown
                            color="white"
                            onClick={() => handleMenuClick(menuItem)}
                            className={`${
                              menuStates[menuItem.id].subNavOpen && "rotate-180"
                            } duration-150`}
                          />
                        )}
                      </li>
                    </Link>
                    {menuItem.subNav && menuStates[menuItem.id].subNavOpen && (
                      <ul className="">
                        {menuItem.subNav.map((subMenuItem) => (
                          <Link
                            to={subMenuItem.route}
                            key={subMenuItem.idsubsensor}
                          >
                            {open && (
                              <li
                                className={`flex cursor-pointer items-center gap-x-3 rounded-md p-2 pl-10 text-xs text-white ${
                                  selected === subMenuItem.idsubsensor
                                    ? "bg-[#f0b429]"
                                    : "hover:bg-teal-700"
                                } duration-300`}
                                onClick={() =>
                                  setSelected(subMenuItem.idsubsensor)
                                }
                              >
                                {subMenuItem.sensorname}
                              </li>
                            )}
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
