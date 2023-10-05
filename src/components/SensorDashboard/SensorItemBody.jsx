import React from 'react';

export default function SensorItemBody() {
  const dataTempRecap = [
    { text: 'Rata - Rata', date: '02/10/2023 12:30', value: '100°C' },
    { text: 'Minimum', date: '02/10/2023 12:30', value: '80°C' },
    { text: 'Maksimum', date: '02/10/2023 12:30', value: '120°C' },
  ];

  const dataTempNow = [{ text: '', date: '02/10/2023 12:30', value: '70°C' }];
  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center rounded-tr-lg shadow-lg border bg-white">
        <div className="w-full px-2 mr-8">
          <ul>
            {dataTempRecap.map((val, index) => {
              return (
                <li key={index}>
                  <div className="flex justify-between py-1">
                    <div className="">
                      <div className="font-bold">{val.text}</div>
                      <div className="text-sm ">{val.date}</div>
                    </div>
                    <div className="">
                      <div className="text-xl font-bold">{val.value}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-40 text-center z-10 text-white">
          <div>
            <p className="text-lg font-bold">Saat ini</p>
          </div>
          {dataTempNow.map((val, index) => {
            return (
              <div key={index} className="text-xl font-bold">
                {val.value}
              </div>
            );
          })}
        </div>
        <div className="absolute flex justify-end w-44 h-44 bg-[#17b897] rounded-full -right-14 lg:w-[180px] lg:h-[180px]">
        </div>
      </div>
    </div>
  );
}
