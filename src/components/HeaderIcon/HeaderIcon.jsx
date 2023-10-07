import React from 'react';
import UserPict from '../../assets/Iqbal.png'

export default function HeaderIcon() {
  return (
    <div className='w-[85%] mx-auto mb-10 mt-4'>

    <div className="flex justify-end items-center gap-2">
      <p className='text-sm font-bold text-teal-800 text-right' >Iqbal Nur Akbar</p>
      <img
        src={UserPict}
        alt="user"
        className="h-8 w-8 object-cover rounded-full"
      />
    </div>
    </div>
  );
}
