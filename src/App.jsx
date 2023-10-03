import React from 'react';
import CalendarItem from './components/Calendar/CalendarItem';
import Notification from './components/Notification/Notification';
import HeaderIcon from './components/HeaderIcon/HeaderIcon';
import Sensor from './components/SensorDashboard/Sensor';
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  return (
    <div className='container'>

    <div className="grid grid-cols-dashboardpc">
      
      <div className="flex flex-col">
      <Sidebar/>
      </div>
      <div className="flex flex-col ">
      <HeaderIcon />
        <CalendarItem />
        <Notification />
      </div>
      <div className='container'>
      <div className="flex flex-col ">
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
