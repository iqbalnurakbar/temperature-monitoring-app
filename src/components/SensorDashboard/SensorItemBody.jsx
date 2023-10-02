import React from 'react';
import { FaTemperatureHalf } from 'react-icons/fa6';

export default function SensorItemBody() {
  const dataTempRecap = [
    { text: 'Rata - Rata', date: '02/10/2023 12:30', value: '100°C' },
    { text: 'Minimum', date: '02/10/2023 12:30', value: '80°C' },
    { text: 'Maksimum', date: '02/10/2023 12:30', value: '120°C' },
  ];

  const dataTempNow = [{ text: '', date: '02/10/2023 12:30', value: '70°C' }];
  return (
    <div className="w-full">
      <div className="mx-auto mt-10 mb-10">
        <div className="flex items-center shadow-lg rounded-lg px-4">
          <div>
            <FaTemperatureHalf color="#51ca58" size={67} />
          </div>
          <div className="w-full px-8">
            <ul>
              {dataTempRecap.map((val, index) => {
                return (
                  <li key={index}>
                    <div className="flex justify-between">
                      <div className="mb-2">
                        <div className="text-lg font-bold">{val.text}</div>
                        <div className="text-sm ">{val.date}</div>
                      </div>
                      <div className="flex mb-2">
                        <div className="text-2xl font-bold">{val.value}</div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-48 text-center -mt-2 ">
            <div>
              <p className="text-xl font-bold">Sekarang</p>
            </div>
            {dataTempNow.map((val, index) => {
              return (
                <div key={index} className="text-4xl font-bold">
                  {val.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
