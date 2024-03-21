import { useWatch } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const useCheckboxMultiSelect = ({ form, name, item, submitFilter }) => {
  const [defaultValue] = useState(name);
  const [currentValues, setCurrentValues] = useState(['A']);
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const buttonRef = useRef();
  const dropdownRef = useRef();

  useWatch({ control: form.control, name, defaultValue: ['A'] });

  const handleDropdown = () => {
    setIsDropdownDisplayed(!isDropdownDisplayed);
  };

  const getToggledOptions = (currentOptions, value) => {
    if (currentOptions.includes(value)) {
      return currentOptions.filter(option => option !== value);
    }
    return [...currentOptions, value];
  };

  const handleChange = value => {
    setCurrentValues(getToggledOptions(currentValues, value));
  };

  const handleAllCheckboxChange = isChecked => {
    if (isChecked) {
      const allValues = item.map(option => option.value);
      setCurrentValues(allValues);
    } else {
      setCurrentValues([]);
    }
  };

  const getLabelByValue = value => {
    const selectedOption = item?.find(option => option.value === value);
    return selectedOption ? selectedOption.label : '';
  };

  useEffect(() => {
    form.setValue(name, currentValues.join(','));
    submitFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValues]);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(event.target) &&
        !buttonRef?.current?.contains(event.target)
      ) {
        setIsDropdownDisplayed(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return {
    currentValues,
    defaultValue,
    isDropdownDisplayed,
    dropdownRef,
    buttonRef,
    getLabelByValue,
    getToggledOptions,
    handleChange,
    handleAllCheckboxChange,
    handleDropdown
  };
};

useCheckboxMultiSelect.propTypes = {
  form: PropTypes.node,
  name: PropTypes.string,
  item: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.number
    })
  ),
  submitFilter: PropTypes.func
};

export default useCheckboxMultiSelect;
