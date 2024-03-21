import React from 'react';
import { useSelector } from 'react-redux';
import 'src/assets/base/css/greeting.scss';

const Greeting = () => {
  const currentDate = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
  const { user: userData } = useSelector(({ user }) => user.user);

  return (
    <div className="greeting__container">
      <h2 className="greeting__name">
        <span>Hello,</span> {userData.first_name} {userData.last_name}!
      </h2>
      <span className="greeting__current-date">Today is {currentDate} </span>
    </div>
  );
};

export default Greeting;
