import { useWatch } from 'react-hook-form';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useDate = ({ form, name, submitFilter }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [dateValue, setDateValue] = useState();

  useWatch({ control: form.control, name, defaultValue: false });
  const onSelectDropdown = e => {
    const selectName = e.target.name;
    const { value } = e.target;
    form.setValue(selectName, value);

    setDateValue(value);
  };
  useEffect(() => {
    submitFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);

  return {
    isChecked,
    setIsChecked,
    dateValue,
    onSelectDropdown
  };
};

useDate.propTypes = {
  form: PropTypes.node,
  name: PropTypes.string,
  submitFilter: PropTypes.func
};

export default useDate;
