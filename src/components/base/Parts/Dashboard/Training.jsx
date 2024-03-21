import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from '@baseComponents/Common/ProgressBar';
import Button from '@baseComponents/Common/Button';
import 'src/assets/css/training.scss';

const Training = ({ trainings }) => {
  const buttons = [
    {
      modifier: 'button__view default',
      name: 'View All'
    },
    {
      modifier: 'button__arrow dark',
      name: 'Go To App'
    }
  ];

  return (
    <div className="training__container">
      {trainings.map(training => (
        <div className="training__wrapper" key={training}>
          <span className="training__label">{training.training}</span>
          <div className="training__progress">
            <ProgressBar key={training} progress={training.progress} />
          </div>
        </div>
      ))}

      {buttons ? (
        <div className="training__buttons">
          {buttons.map(button => (
            <div className="training__button-inner" key={button}>
              <Button
                key={button}
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

Training.propTypes = {
  trainings: PropTypes.arrayOf(
    PropTypes.shape({
      training: PropTypes.string,
      progress: PropTypes.number
    })
  )
};

export default Training;
