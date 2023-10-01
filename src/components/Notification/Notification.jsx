import React from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { IoAlertOutline } from 'react-icons/io5';

export default function Notification() {
  const notif = [
    { body: 'Mesin 1 diatas suhu normal', icon: <IoAlertOutline color='red'/> },
    { body: 'Mesin 2 dibawah suhu normal', icon: <IoAlertOutline color='red' /> },
    { body: 'Mesin 3 diatas suhu normal', icon: <IoAlertOutline color='red'/> },
    { body: 'Mesin 4 dibawah suhu normal', icon: <IoAlertOutline color='red'/> },
  ];
  return (
    <div className="flex flex-1">
      <div className="w-full px-4">
        <div className="mb-10 rounded-xl bg-white shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <IoMdNotifications color="#f0b429" size={28} />{' '}
              </div>
              <h3 className="text-3xl font-bold">Notifikasi</h3>
            </div>
            <div className="mb-4">
              <ul>
                {notif.map((val, index) => {
                  return (
                    <li
                      key={index}
                      className="mb-4 flex items-center border border-slate-20 rounded-lg"
                    >
                      <div className="px-2">{val.icon}</div>
                      <div className="pl-2 text-base font-semibold">{val.body}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p class="mb-4 text-base font-medium"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
