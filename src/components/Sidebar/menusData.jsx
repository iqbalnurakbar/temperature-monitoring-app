// MenuData.js
import React from 'react';
import { BiHomeAlt, BiUser, BiLogOut } from 'react-icons/bi';
import { RiTempColdLine } from 'react-icons/ri';

export const menusData = [
  { id: 100, name: 'Beranda', icon: <BiHomeAlt color="white" /> },
  {
    id: 200,
    name: 'Sensor',
    icon: <RiTempColdLine color="white" />,
    subNav: [
      { idsubsensor: 0, sensorname: 'Sensor 1' },
      { idsubsensor: 1, sensorname: 'Sensor 2' },
      { idsubsensor: 2, sensorname: 'Sensor 3' },
      { idsubsensor: 3, sensorname: 'Sensor 4' },
    ],
  },
  { id: 300, name: 'Akun', icon: <BiUser color="white" /> },
  {
    id: 400,
    name: 'Keluar',
    icon: <BiLogOut color="white" />,
    gap: true,
  },
];
