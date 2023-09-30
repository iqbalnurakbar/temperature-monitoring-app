import React from 'react'
import Logo from '../../assets/logo.png'
export default function Sidebar () {
  return (
    <div className='h-screen border-r border-gray-200 w-64'>
        <div className='flex flex-row'>
            <img src="{Logo}" alt="logo" className='w-9 h-36'/>
            <div>Monitoring Suhu</div>
        </div>
    </div>
  )
}
