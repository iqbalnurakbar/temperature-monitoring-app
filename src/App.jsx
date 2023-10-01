import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import CalendarCard from './components/Calendar/CalendarCard';
import HeaderIcon from './components/HeaderIcon/HeaderIcon';
import { IoMdNotifications } from 'react-icons/io';
function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <Sidebar />
      <section className="flex-1">Content Left</section>
      <section className=" w-80  rounded-tl-3xl overflow-hidden ">
        <div className="container px-4">
          <HeaderIcon />
          <CalendarCard />
          <div className="bg-orange-500 h-80 rounded-lg shadow-md py-4 px-8 ">
            <div className="container flex flex-row items-center">
              <div className=''>
                <IoMdNotifications color='yellow' />
              </div>
              <h3 className="font-bold text-xl">Notifikasi</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
