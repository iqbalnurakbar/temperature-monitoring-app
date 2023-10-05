import React from 'react';
import HeaderIcon from './HeaderIcon/HeaderIcon';
import CalendarItem from './Calendar/CalendarItem';
import Notification from './Notification/Notification';
const RightSide = () => {
  return (
    <>
      <HeaderIcon />
      <CalendarItem />
      <Notification />
    </>
  );
};

export default RightSide;
