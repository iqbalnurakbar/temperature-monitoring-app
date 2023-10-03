import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { menusBarData } from './menusBarData';
import { BiChevronLeft, BiChevronDown } from 'react-icons/bi';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [subNavOpen, setSubNavOpen] = useState(false);

  return (
    <nav
      className={`${
        open ? 'w-40' : 'w-12'
      } duration-300 h-screen bg-teal-600 relative p-2`}
    >
      <div>
        <div
          className={`rounded-full object-cover border absolute bg-cyan-400 -right-2 top-9 cursor-pointer ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        >
          <BiChevronLeft color="white" size={20} />
        </div>
        <div className="flex items-center gap-x-2 cursor-pointer mb-5 origin-left px-1">
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
          {menusBarData.map((val, index) => {
            return (
              <>
                <li
                  key={index}
                  className={`flex items-center gap-x-3 rounded-md hover:bg-teal-700 cursor-pointer p-2 ${
                    val.gap ? 'mt-9' : 'mt-2'
                  }`}
                >
                  <div>{val.icon}</div>
                  <span
                    className={`text-xs text-white mr-4 ${
                      !open && 'hidden'
                    } origin-left duration-200`}
                  >
                    {val.name}
                  </span>
                  {val.subNav && (
                    <BiChevronDown
                      color="white"
                      onClick={() => setSubNavOpen(!subNavOpen)}
                      className={`${subNavOpen && 'rotate-180'} duration-300`}
                    />
                  )}
                </li>
                {val.subNav && subNavOpen && open && (
                  <ul>
                    {val.subNav.map((subNavItem, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-x-3 rounded-md hover:bg-teal-700 cursor-pointer p-2 text-white text-xs pl-10"
                      >
                        {subNavItem.sensorname}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
