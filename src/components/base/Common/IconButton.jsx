import 'src/assets/base/css/iconButton.scss';
import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({
  className,
  icon,
  color = 'light',
  onClick = () => {}
}) => {
  return (
    <button
      type="button"
      className={`icon-button color-${color} ${className}`}
      onClick={onClick}
    >
      <div className={`icon-button__icon ${icon}-icon`} />
    </button>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default IconButton;
