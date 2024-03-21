import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ColorPicker = ({ value, onChange, disabled }) => {
  const defaultColor = { label: 'Default', color: '#BEBCBC' };
  const [selectedOption, setSelectedOption] = useState(defaultColor);
  const options = [
    { label: 'Gray', color: '#BEBCBC' },
    { label: 'Skyblue', color: '#ADE5E2' },
    { label: 'LightRed', color: '#E0726D' },
    { label: 'Blue', color: '#4E74CB' },
    { label: 'Peach', color: '#DF9277' },
    { label: 'LightViolet', color: '#8986E1' },
    { label: 'LightYellow', color: '#E8BE78' },
    { label: 'Violet', color: '#A970CE' },
    { label: 'Yellow', color: '#F4DF81' },
    { label: 'Pink', color: '#EDADEB' },
    { label: 'YellowGreen', color: '#B4CD67' },
    { label: 'LightPink', color: '#E278B0' },
    { label: 'Teal', color: '#6D9F85' },
    { label: 'LightPeach', color: '#ED9B9C' },
    { label: 'Green', color: '#70C8C3' },
    { label: 'DarkGray', color: '#6D6E6F' }
  ];
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value) {
      const selected = options.find(option => option.color === value);
      setSelectedOption(selected || defaultColor);
    } else {
      setSelectedOption(defaultColor);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleButtonClick = () => {
    toggleDropdown();
  };

  const handleOptionSelect = option => {
    if (!disabled) {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) {
        onChange(option.color);
      }
    }
  };

  const handleOptionKeyDown = (e, option) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      handleOptionSelect(option);
    }
  };

  return (
    <div className={`dropdown-container ${disabled ? 'disabled' : ''}`}>
      <div className="dropdown">
        <button
          type="button"
          className={` ${isOpen ? 'open' : ''}`}
          onClick={handleButtonClick}
        >
          <div className="selected-option">
            <div
              className="color-indicator"
              style={{ backgroundColor: selectedOption.color }}
            />
            <img
              alt="Dropdown Icon"
              src="../icons/dropdown.svg"
              className={`${
                isOpen ? 'rotate-180' : ''
              } transition-transform duration-500`}
            />
          </div>
        </button>
      </div>
      <ul className={`options ${isOpen ? 'visible' : ''} `}>
        {options.map(option => (
          <li key={option.label}>
            <button
              type="button"
              name="color_hex"
              onClick={() => handleOptionSelect(option)}
              onKeyDown={e => handleOptionKeyDown(e, option)}
              className={
                selectedOption.color === option.color ? 'selected' : ''
              }
            >
              <div
                className="color-indicator"
                style={{ backgroundColor: option.color }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};
export default ColorPicker;
