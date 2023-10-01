import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import CalendarCard from './components/Calendar/CalendarCard';
import HeaderIcon from './components/HeaderIcon/HeaderIcon';
import Notification from './components/Notification/Notification';

function App() {
  return (
    <div className='w-screen'>
      <div className='flex flex-row min-h-screen'>
          <Sidebar/>
      <section className="flex-1">Content left</section>
      <section className="rounded-tl-3xl ">
        <div className="px-4 flex-1">
          <HeaderIcon />
          <CalendarCard />
          <Notification />
        </div>
      </section>

      </div>
    </div>
  );
}

export default App;
