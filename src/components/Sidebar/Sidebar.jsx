import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import {
  BiHomeAlt,
  BiUser,
  BiChevronRight,
  BiChevronLeft,
  BiLogOut,
} from 'react-icons/bi';
import { RiTempColdLine } from 'react-icons/ri';

export default function Sidebar() {
  const Menus = [
    { name: 'Home', icon: <BiHomeAlt color="white" /> },
    {
      name: 'Sensor',
      icon: <RiTempColdLine color="white" />,
      icon1: <BiChevronRight color="white" size={12} />,
    },
    { name: 'Account', icon: <BiUser color="white" /> },
    { name: 'Log Out', icon: <BiLogOut color="white" />, gap: true },
  ];
  const MenuSensor = [
    { sensorname: 'Sensor 1' },
    { sensorname: 'Sensor 2' },
    { sensorname: 'Sensor 3' },
    { sensorname: 'Sensor 4' },
  ];
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? 'w-40' : 'w-12'
      } duration-300 h-screen bg-teal-600 relative p-2`}
    >
      <div>
        <div
          className={`rounded-full object-cover border border-slate-300 absolute bg-white -right-2 top-9 cursor-pointer ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        >
          <BiChevronLeft />
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
          {' '}
          {Menus.map((val, index) => {
            return (
              <li
                key={index}
                className={`flex items-center gap-x-3 rounded-md hover:bg-teal-700 cursor-pointer p-2 ${
                  val.gap ? 'mt-9' : 'mt-2'
                } `}
              >
                <div>{val.icon}</div>
                <span
                  className={`text-xs text-white mr-4 ${
                    !open && 'hidden'
                  } origin-left duration-200`}
                >
                  {val.name}
                </span>
                <div>{val.icon1}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
