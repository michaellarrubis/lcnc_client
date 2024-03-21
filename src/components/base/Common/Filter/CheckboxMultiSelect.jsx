import PropTypes from 'prop-types';
import useCheckboxMultiSelect from '@baseHooks/Components/Common/Filter/useCheckboxMultiSelect';
import CheckboxOption from './CheckboxOption';

const CheckboxMultiSelect = ({ form, name, item, submitFilter, isOpen }) => {
  const {
    defaultValue,
    currentValues,
    isDropdownDisplayed,
    dropdownRef,
    buttonRef,
    getLabelByValue,
    handleAllCheckboxChange,
    handleChange,
    handleDropdown
  } = useCheckboxMultiSelect({ form, name, item, submitFilter, isOpen });

  return (
    <div className="react-select">
      <button
        type="button"
        ref={buttonRef}
        disabled={isOpen}
        className={`w-[255px]  font-stolzlBook h-10 p-[10px_40px_10px_10px] flex items-center ${
          isDropdownDisplayed ? 'border-black' : 'border-[#DEDEDE]'
        } text-[#222222] text-[12px] bg-white border rounded capitalize bg-no-repeat bg-[center_right_18px] bg-[url('/src/assets/base/icons/dropdown.svg')]`}
        onClick={handleDropdown}
      >
        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
          {currentValues.length > 0
            ? currentValues?.map(value => getLabelByValue(value)).join(', ')
            : defaultValue}
        </span>
      </button>
      {isDropdownDisplayed && (
        <div
          style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)' }}
          className="w-[255px] bg-white rounded p-5 absolute z-10"
          ref={dropdownRef}
        >
          <ul className="grid grid-cols-2 gap-[20px_3px]">
            <label
              className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
              htmlFor="selectAll"
            >
              <input
                type="checkbox"
                className="react-select-option__checkbox"
                id="selectAll"
                checked={currentValues.length === item?.length}
                onChange={e => handleAllCheckboxChange(e.target.checked)}
                hidden
              />
              <span className="react-select-option__label">All</span>
              <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative">
                <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-md" />
                <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-md" />
              </span>
              <i className="inline-block align-middle cursor-pointer ml-2.5 -mt-[1px] not-italic text-[14px] text-[#222222] leading-[14px] font-stolzlBook">
                All
              </i>
            </label>
            {item?.map(option => (
              <CheckboxOption
                key={option.label}
                value={option.value}
                isChecked={currentValues.includes(option.value)}
                onChange={handleChange}
              >
                {option.label}
              </CheckboxOption>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

CheckboxMultiSelect.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  item: PropTypes.arrayOf(String),
  isOpen: PropTypes.bool,
  submitFilter: PropTypes.func.isRequired
};

export default CheckboxMultiSelect;
