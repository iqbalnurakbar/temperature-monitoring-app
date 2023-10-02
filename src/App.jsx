import React from 'react';
import CalendarItem from './components/Calendar/CalendarItem';
import Notification from './components/Notification/Notification';
import HeaderIcon from './components/HeaderIcon/HeaderIcon';

function App() {
  return (
    <div className='container mx-auto bg-blue-500'>

    <div className="grid grid-cols-dashboardmobile justify-around md:grid-cols-dashboardtablet lg:grid-cols-dashboardpc">
      <div className="flex flex-col bg-orange-500">
      <HeaderIcon />
        <CalendarItem />
        <Notification />
      </div>
      <div className="flex flex-col bg-green-500">
      <HeaderIcon />
        <CalendarItem />
        <Notification />
      </div>
      <div className='container'>
      <div className="flex flex-col bg-yellow-500">
        <HeaderIcon />
        <CalendarItem />
        <Notification />
      </div>
      </div>
    </div>
    </div>

    // <div className="container">
    //   <div className="flex flex-row min-h-screen ">
    //     <Sidebar />
    //     <section className="container">
    //       <SensorItemBody /> <SensorItemBody />
    //       <SensorItemBody /> <SensorItemBody />
    //       <SensorItemBody /> <SensorItemBody />
    //     </section>
    //     <section className="">
    //       <div className="container ">
    //         <HeaderIcon />
    //         <CalendarCard />
    //         <Notification />
    //       </div>
    //     </section>
    //   </div>
  );
}

export default App;
