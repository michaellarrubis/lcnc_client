import React from 'react';
import PropTypes from 'prop-types';
import 'src/assets/base/css/progressBar.scss';

const ProgressBar = props => {
  const { progress } = props;

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#232932',
    transition: 'width 1s ease-in-out',
    textAlign: 'right'
  };

  return (
    <div className="progressBar__container">
      <div style={fillerStyles} />
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number
};

export default ProgressBar;
