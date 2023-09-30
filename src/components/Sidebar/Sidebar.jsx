import React from 'react';
import Logo from '../../assets/logo.png';
import {
  BiHomeAlt,
  BiUser,
  BiChevronRight,
  BiChevronDown,
  BiLogOut,
} from 'react-icons/bi';
import { RiTempColdLine } from 'react-icons/ri';
import { BsDot } from 'react-icons/bs';
export default function Sidebar() {
  const menu = [
    { name: 'Home', icon: <BiHomeAlt /> },
    { name: 'Sensor', icon: <RiTempColdLine />, icon1: <BiChevronRight /> },
    { name: 'Account', icon: <BiUser /> },
  ];

  const menuSensor = [
    { name: 'Sensor 1', icon: <BsDot /> },
    { name: 'Sensor 2', icon: <BsDot /> },
    { name: 'Sensor 3', icon: <BsDot /> },
    { name: 'Sensor 4', icon: <BsDot /> },
    { name: 'Sensor 5', icon: <BsDot /> },
    { name: 'Sensor 6', icon: <BsDot /> },
    { name: 'Sensor 7', icon: <BsDot /> },
    { name: 'Sensor 8', icon: <BsDot /> },
    { name: 'Sensor 9', icon: <BsDot /> },
    { name: 'Sensor 10', icon: <BsDot /> },
    { name: 'Sensor 11', icon: <BsDot /> },
    { name: 'Sensor 12', icon: <BsDot /> },
    { name: 'Sensor 13', icon: <BsDot /> },
    { name: 'Sensor 14', icon: <BsDot /> },
  ];

  const logOut = [{ name: 'Log Out', icon: <BiLogOut /> }];

  return (
    <div className="h-screen border-r border-gray-200 w-64 px-9">
      <div className="flex flex-row items-center mb-8 pt-4">
        <img src={Logo} alt="logo" className="w-9 h-9 mr-2" />
        <div>Monitoring Suhu</div>
      </div>
      <div className="space-y-24 mb-96">
        <div className="pt-4">
          <ul className="space-y-7">
            {menu.map((val, index) => {
              return (
                <li key={index} className="mb-7 flex flex-row items-center">
                  <div className="mr-6">{val.icon}</div>
                  <div>{val.name}</div>
                  <div className="mt-1 ml-20">{val.icon1}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="pt-80">
        {logOut.map((val, index) => {
          return (
            <li key={index} className="mb-7 flex flex-row items-center">
              <div className="mr-6">{val.icon}</div>
              <div>{val.name}</div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
