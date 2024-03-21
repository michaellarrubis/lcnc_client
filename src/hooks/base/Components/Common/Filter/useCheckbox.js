import { useWatch } from 'react-hook-form';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const useCheckBox = ({ form, name, submitFilter }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onSelectCheckbox = useCallback(() => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    form.setValue(name, newValue);
    submitFilter();
  }, [form, isChecked, name, submitFilter]);

  useWatch({ control: form.control, name, defaultValue: false });

  return {
    isChecked,
    onSelectCheckbox
  };
};

useCheckBox.propTypes = {
  form: PropTypes.node,
  name: PropTypes.string,
  submitFilter: PropTypes.func
};

export default useCheckBox;
