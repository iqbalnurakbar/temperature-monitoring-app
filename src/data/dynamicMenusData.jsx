// MenuData.js
import React from 'react';
import { BiHomeAlt, BiUser, BiLogOut } from 'react-icons/bi';
import { RiTempColdLine } from 'react-icons/ri';

const generateSensorSubNav = (data)=>{
    if(!data){
        return []
    }
    return Object.keys(data).map((sensor, index)=>({
        idsubsensor: index,
        sensorname: data[sensor].name,
        route: `/temperature-monitoring-app/${data[sensor].name}`
    }))
}
export const dynamicMenusData = (data) => [
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
    subNav: generateSensorSubNav(data)
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
  },
];
