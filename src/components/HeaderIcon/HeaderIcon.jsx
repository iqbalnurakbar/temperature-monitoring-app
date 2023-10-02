import React from 'react';
import UserPict from '../../assets/Iqbal.png'

export default function HeaderIcon() {
  return (
    <div className="w-full px-4 flex justify-end pt-4 mb-4 items-center">
      <p className='mr-4 font-medium'>Iqbal Nur Akbar</p>
      <img
        src={UserPict}
        alt="user"
        className="h-10 w-10 object-cover rounded-full"
      />
    </div>
  );
}
