import React from "react";

const SensorBody = ({ temperature, time }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center rounded-tr-lg border bg-white shadow-lg">
        <div className="mr-8 w-full px-2">
          <ul>
            <li>
              <div className="flex justify-between py-1">
                <div className="">
                  <div className="font-bold">Minimum</div>
                  <div className="text-sm ">{time.minimum}</div>
                  <div className="font-bold">Maksimum</div>
                  <div className="text-sm ">{time.maximum}</div>
                  <div className="pt-2 font-bold">Rata-Rata</div>
                </div>
                <div className="space-y-4 py-2">
                  <div className="text-xl font-bold text-right">
                    {temperature.minimum}°C
                  </div>
                  <div className="text-xl font-bold text-right">
                    {temperature.maximum}°C
                  </div>
                  <div className="text-xl font-bold text-right">
                    {temperature.average}°C
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="z-10 w-40 text-center text-white">
          <div>
            <p className="text-lg font-bold">Saat ini</p>
          </div>
          <div className="text-xl font-bold">{temperature.current}°C</div>
        </div>
        <div className="absolute -right-14 flex h-44 w-44 justify-end rounded-full bg-[#17b897] lg:h-[180px] lg:w-[180px]"></div>
      </div>
    </div>
  );
};

export default SensorBody;
