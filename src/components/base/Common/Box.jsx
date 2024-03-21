import PropTypes from 'prop-types';
import React from 'react';

const Box = ({ children, outline, modifier, small, padding }) => {
  const boxClass = small ? 'box small' : 'box';
  const bordered = outline ? ' outline' : '';

  return (
    <div>
      {padding ? (
        <div
          className={`box--padding${bordered} ${modifier}`}
          style={{ padding }}
        >
          {children}
        </div>
      ) : (
        <div className={`${boxClass}${bordered} ${modifier}`}>{children}</div>
      )}
    </div>
  );
};

Box.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({ Object })),
  outline: PropTypes.bool,
  modifier: PropTypes.string,
  small: PropTypes.string,
  padding: PropTypes.string
};
export default Box;
