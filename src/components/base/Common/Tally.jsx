import React from 'react';
import PropTypes from 'prop-types';

const Tally = props => {
  const { modifier, label, count } = props;

  return (
    <div className={`tally__container ${modifier}`}>
      <div className="tally__inner">
        <div className="tally__content">
          <span className="tally__label">{label.split(' ').join('\n')}</span>
          <span className="tally">{count}</span>
        </div>
      </div>
    </div>
  );
};

Tally.propTypes = {
  modifier: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.number
};

export default Tally;
