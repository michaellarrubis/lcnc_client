import React from 'react';
import MainContent from '@baseComponents/Parts/Dashboard/MainContent';
import SideSection from '@baseComponents/Parts/Dashboard/SideSection';

const Dashboard = () => {
  const events = [
    {
      date: '09/01/2021',
      eventName: "National Heroes' Day"
    },
    {
      date: '09/01/2021',
      eventName: "National Heroes' Day"
    },
    {
      date: '09/01/2021',
      eventName: "National Heroes' Day"
    }
  ];

  const members = [
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 1'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 2'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 3'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 2'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 3'
    },
    {
      name: 'Piolo Pascual',
      image: '/images/user-sample.jpeg',
      team: 'Front End 2'
    }
  ];
  return (
    <div className="dashboard__container">
      <MainContent />
      <SideSection events={events} members={members} />
    </div>
  );
};

export default Dashboard;
