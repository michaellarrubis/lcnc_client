import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Event = ({ events }) => {
  const eventList = events.map(event => {
    const date = new Date(event.date);
    const month = date.toLocaleDateString('en-GB', { month: 'short' });
    const day = date.toLocaleDateString('en-GB', { day: '2-digit' });

    return (
      <div className="event__list" key={event}>
        <div className="event__date">
          <span className="event__month">{month}</span>
          <span className="event__day">{day}</span>
        </div>
        <div className="event__name-container">
          <p className="event__name">{event.eventName}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="event__container">
        <h3 className="event__title">Events</h3>
        <Button modifier="button__add default" name="Add Event" />
      </div>

      <div className="event__menu">{eventList}</div>
    </>
  );
};

Event.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.date,
      eventName: PropTypes.string
    })
  ).isRequired
};

export default Event;
