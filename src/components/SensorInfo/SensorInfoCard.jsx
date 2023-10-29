import React from "react";

const SensorInfoCard = ({ data, name, icon, unit, data2, unit2 }) => {
  return (
<div className="rounded-lg bg-[#3ebd93] p-2 text-center text-white shadow-lg flex flex-col items-center">
  <div className="mx-auto mb-2 hidden md:block lg:hidden">{icon}</div>
  <div className="font-bold">{name}</div>
  <div className="flex items-center justify-center">
    <div className="pr-2 md:hidden lg:block">{icon}</div>
    <div className="text-2xl font-bold">
      {data}
      {unit} {data2}
      {unit2}
    </div>
  </div>
</div>

  );
};

export default SensorInfoCard;
