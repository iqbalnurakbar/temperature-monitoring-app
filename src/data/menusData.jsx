import React from "react";
import { BiHomeAlt, BiUser, BiLogOut } from "react-icons/bi";
import { RiTempColdLine } from "react-icons/ri";

export const menusData = [
  {
    id: 100,
    name: "Dashboard",
    icon: <BiHomeAlt color="white" size={20} />,
    route: "/dashboard",
  },
  {
    id: 200,
    name: "Sensor",
    icon: <RiTempColdLine color="white" size={20} />,
    route: "/sensor",
  },
  {
    id: 300,
    name: "Profil",
    icon: <BiUser color="white" size={20} />,
    route: "/profil",
  },
  {
    id: 400,
    name: "Keluar",
    icon: <BiLogOut color="white" size={20} />,
    gap: true,
    route: "/",
  },
];

export const menusDataMobile = [
  {
    id: 100,
    name: "Dashboard",
    icon: <BiHomeAlt color="white" size={20} />,
    route: "/dashboard",
  },
  {
    id: 200,
    name: "Sensor",
    icon: <RiTempColdLine color="white" size={20} />,
    route: "/sensor",
  },
  {
    id: 300,
    name: "Profil",
    icon: <BiUser color="white" size={20} />,
    route: "/profil",
  },
];
