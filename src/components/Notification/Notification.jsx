import React from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { IoAlertOutline } from 'react-icons/io5';

export default function Notification() {
  const notif = [
    {
      body: 'Mesin 1 diatas suhu normal',
      icon: <IoAlertOutline color="red" />,
    },
    {
      body: 'Mesin 2 dibawah suhu normal',
      icon: <IoAlertOutline color="red" />,
    },
    {
      body: 'Mesin 3 diatas suhu normal',
      icon: <IoAlertOutline color="red" />,
    },
    {
      body: 'Mesin 4 dibawah suhu normal',
      icon: <IoAlertOutline color="red" />,
    },
  ];
  return (
    <div className='w-72 mb-10 mx-auto'>

    <div className="border p-4 rounded-lg shadow-md ">
      <div className="flex items-center mb-4 gap-2">
        <div className="">
          <IoMdNotifications color="#f0b429" size={25} />{' '}
        </div>
        <h3 className="text-lg font-bold text-teal-600">Notifikasi</h3>
      </div>

      <ul className=''>
        {notif.map((val, index) => {
          return (
            <li
              key={index}
              className="flex items-center border border-slate-20 rounded-md gap-4 mb-5"
            >
              <div className="pl-1">{val.icon}</div>
              <p className="text-xs font-medium">{val.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
    </div>
  );
}
