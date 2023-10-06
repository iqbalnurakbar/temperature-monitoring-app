import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { menusData } from './menusData';
import { BiChevronLeft, BiChevronDown } from 'react-icons/bi';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div className="relative">
      <div className={`absolute md:left-0 ${open?'left-0' : '-left-12'}`}>
        <nav
          className={`${
            open ? 'w-40' : 'w-12'
          } duration-300 h-[97%] bg-[#3ebd93] fixed p-2 z-10 rounded-l-xl`}
        >
          <div>
            <div
              className={`rounded-full object-cover border absolute bg-cyan-400 -right-3 top-14 cursor-pointer ${
                !open && 'rotate-180'
              }`}
              onClick={() => setOpen(!open)}
            >
              <BiChevronLeft color="white" size={22} />
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer mb-5 origin-left px-1 mt-4">
              <img src={Logo} alt="logo" className="w-6 h-6" />
              <h1
                className={`font-bold origin-left text-white text-xl ${
                  !open && 'scale-0'
                }`}
              >
                MonSu
              </h1>
            </div>
            <ul className="">
              {menusData.map((val, index) => {
                return (
                  <React.Fragment key={index}>
                    <li
                      key={val.id}
                      className={`flex items-center gap-x-3 text-white rounded-md cursor-pointer p-2 ${
                        val.gap ? 'mt-10' : 'mt-2'
                      } ${
                        selected === val.id
                          ? 'bg-[#f0b429]'
                          : 'hover:bg-teal-700'
                      } transition-all duration-300`}
                      onClick={() => setSelected(val.id)}
                    >
                      <div>{val.icon}</div>
                      <span
                        className={`text-xs mr-4 ${
                          !open && 'hidden'
                        } origin-left duration-200`}
                      >
                        {val.name}
                      </span>
                      {val.subNav && (
                        <BiChevronDown
                          color="white"
                          onClick={() => setSubNavOpen(!subNavOpen)}
                          className={`${
                            subNavOpen && 'rotate-180'
                          } duration-150`}
                        />
                      )}
                    </li>
                    {val.subNav && subNavOpen && open && (
                      <ul className="">
                        {val.subNav.map(subNavItem => (
                          <li
                            key={subNavItem.idsubsensor}
                            className={`flex items-center gap-x-3 rounded-md hover:bg-teal-700 cursor-pointer p-2 text-white text-xs pl-10 `}
                          >
                            {subNavItem.sensorname}
                          </li>
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
