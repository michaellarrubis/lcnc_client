import React from 'react';
import PropTypes from 'prop-types';

import Event from '@baseComponents/Common/Event';
import Member from './Member';

const SideSection = ({ events, members }) => {
  return (
    <div className="dashboard__side-content">
      {events ? <Event events={events} /> : null}
      {members ? <Member members={members} /> : null}
    </div>
  );
};

SideSection.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      team: PropTypes.string
    })
  ),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.date,
      eventName: PropTypes.string
    })
  )
};

export default SideSection;
