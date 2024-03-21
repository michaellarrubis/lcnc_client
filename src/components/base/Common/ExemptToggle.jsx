import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ExemptToggle = ({ isEdit = true, onChange, defaultValue = 0 }) => {
  const [exempted, setExempted] = useState(defaultValue);

  const handleChangeExempt = e => {
    if (e.target.checked) {
      setExempted(1);
    } else {
      setExempted(0);
    }
  };

  useEffect(() => {
    if (onChange) onChange(exempted);
  }, [exempted, onChange]);

  return (
    <div>
      {isEdit ? (
        <div className="login-tab__col login-tab__checkbox">
          <div className="login-tab__checkbox-switch">
            <input
              id="exempt-toggle"
              type="checkbox"
              className="switch"
              checked={exempted}
              onChange={handleChangeExempt}
            />
          </div>
          <label
            className={`login-tab__checkbox-toggle ${
              exempted > 0 ? 'yes' : 'no'
            }`}
            htmlFor="exempt-toggle"
          >
            <span> {exempted > 0 ? 'YES' : 'NO'} </span>
          </label>
        </div>
      ) : (
        <div className="login-tab__exempt-status">
          <span className={exempted > 0 ? 'yes' : 'no'}>
            {exempted > 0 ? 'YES' : 'NO'}
          </span>
        </div>
      )}
    </div>
  );
};

ExemptToggle.propTypes = {
  isEdit: PropTypes.bool,
  onChange: PropTypes.string,
  defaultValue: PropTypes.number
};

export default ExemptToggle;
