import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

const Select = ({
  options,
  onChangeValue,
  selectedValue,
  selectName,
  currentValue,
  placeholder = 'Select Field',
  disabled = false,
  errorMessage = 'Field Required', // Default error message
  errors = null
}) => {
  const [isDropdownDisplayed, setDropdownDisplayed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue);
  const [statusText, setStatusText] = useState('');
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setSelectedOption(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    const selectedOptionLabel = options.find(
      option => option.value === selectedOption
    )?.label;
    setDisplayText(currentValue || selectedOptionLabel || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, options]);

  const handleRadioChange = (event, codeName) => {
    const selectedLabel = event.target.id;
    const { name, value } = event.target;

    setDropdownDisplayed(false);
    setSelectedOption(value);
    setStatusText(selectedLabel);
    setDisplayText(selectedLabel);
    onChangeValue(value, name, codeName);
  };

  const optionItems = options
    ?.filter(item => {
      if (selectedValue !== 'N') {
        return item.value !== 'N';
      }
      return item;
    })
    .map(option => {
      return (
        <div
          key={option.id || option.label || option}
          htmlFor={option.label || option}
          className="h-10 hover:bg-[#E8F1FF60]"
        >
          <label
            className="text-[0] cursor-pointer h-full w-full flex items-center content-center"
            htmlFor={option.label || option}
          >
            <input
              type="radio"
              name={selectName}
              value={option.value || option}
              id={option.label || option}
              checked={selectedOption === (option.value || option)}
              onChange={e => handleRadioChange(e, option.codeName)}
              hidden
            />
            <i className="inline-block align-middle cursor-pointer ml-2.5 -mt-[1px] not-italic text-[14px] text-[#222222] leading-[14px] font-stolzlBook">
              {option.label || option}
            </i>
          </label>
        </div>
      );
    });

  return (
    <div className="relative">
      <button
        type="button"
        className={`font-stolzlBook w-full h-10 p-[10px] flex items-center focus:border-[#000] ${
          errors ? 'border-[#E43B26] placeholder-[#E43B26]' : 'border-[#eaeaea]'
        } 
        ${
          disabled ? 'bg-[#F7F7F7]' : 'bg-white'
        } border text-[14px] rounded capitalize bg-no-repeat bg-[center_right_18px]`}
        onClick={() => setDropdownDisplayed(prevState => !prevState)}
        disabled={disabled}
      >
        <span className="overflow-hidden grow text-overflow-ellipsis line-clamp-1 text-[14px] font-stolzlBook text-left">
          {errors ? (
            <Text
              tag="p"
              className="text-[12px] text-[#f19d94]"
              markup={errorMessage}
            />
          ) : (
            statusText ||
            displayText || (
              <Text
                tag="p"
                className="text-[14px] font-stolzlBook text-[#bdbec1]"
                markup={placeholder}
              />
            )
          )}
        </span>
        <img
          alt="Dropdown Icon"
          src="../icons/dropdown.svg"
          className={`${
            isDropdownDisplayed ? 'rotate-180' : ''
          } transition-transform duration-500`}
        />
      </button>
      {isDropdownDisplayed && (
        <div className="w-full max-h-[160px] bg-white overflow-auto absolute top-full left-0 z-10 shadow-md">
          {optionItems}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  onChangeValue: PropTypes.func,
  selectedValue: PropTypes.string,
  selectName: PropTypes.string,
  currentValue: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  errors: PropTypes.string || null
};

export default Select;
