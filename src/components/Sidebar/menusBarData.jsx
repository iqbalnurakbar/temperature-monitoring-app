// MenuData.js
import React from 'react';
import { BiHomeAlt, BiUser, BiLogOut } from 'react-icons/bi';
import { RiTempColdLine } from 'react-icons/ri';

export const menusBarData = [
  { name: 'Home', icon: <BiHomeAlt color="white" /> },
  {
    name: 'Sensor',
    icon: <RiTempColdLine color="white" />,
    subNav: [
      {
        sensorname: 'Sensor 1',
      },
      {
        sensorname: 'Sensor 2',
      },
      {
        sensorname: 'Sensor 3',
      },
      {
        sensorname: 'Sensor 4',
      },
    ],
  },
  { name: 'Account', icon: <BiUser color="white" /> },
  { name: 'Log Out', icon: <BiLogOut color="white" />, gap: true },
];
