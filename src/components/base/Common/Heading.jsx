import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import 'src/assets/base/css/heading.scss';

const Heading = ({ heading, buttons }) => {
  return (
    <div className="heading__container">
      <div className="heading">{heading}</div>

      {buttons ? (
        <div className="heading__buttons">
          {buttons.map(button => (
            <div className="heading__button-inner" key={button.name}>
              <Button
                key={button.name}
                modifier={button.modifier}
                name={button.name}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

Heading.propTypes = {
  heading: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.instanceOf(Object))
};

export default Heading;
