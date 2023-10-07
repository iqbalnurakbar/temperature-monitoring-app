// MenuData.js
import React from 'react';
import { BiHomeAlt, BiUser, BiLogOut } from 'react-icons/bi';
import { RiTempColdLine } from 'react-icons/ri';

export const menusData = [
  {
    id: 100,
    name: 'Beranda',
    icon: <BiHomeAlt color="white" />,
    route: '/temperature-monitoring-app',
  },
  {
    id: 200,
    name: 'Sensor',
    icon: <RiTempColdLine color="white" />,
    subNav: [
      {
        idsubsensor: 1,
        sensorname: 'Sensor 1',
        route: '/temperature-monitoring-app/sensor1',
      },
      {
        idsubsensor: 2,
        sensorname: 'Sensor 2',
        route: '/temperature-monitoring-app/sensor2',
      },
      {
        idsubsensor: 3,
        sensorname: 'Sensor 3',
        route: '/temperature-monitoring-app/sensor3',
      },
      {
        idsubsensor: 4,
        sensorname: 'Sensor 4',
        route: '/temperature-monitoring-app/sensor4',
      },
    ],
  },
  {
    id: 300,
    name: 'Akun',
    icon: <BiUser color="white" />,
    route: '/temperature-monitoring-app/akun',
  },
  {
    id: 400,
    name: 'Keluar',
    icon: <BiLogOut color="white" />,
    gap: true,
    route: '/temperature-monitoring-app/logout',
    component: '',
  },
];
