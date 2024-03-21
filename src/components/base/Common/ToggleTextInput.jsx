import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import LabeledText from './LabeledText';

const ToggleTextInput = ({
  isEditing = false,
  label,
  value,
  type,
  inputType,
  onChange,
  name,
  placeholder,
  selectOptions
}) => {
  return isEditing ? (
    <Input
      label={label}
      value={value}
      type={type}
      inputType={inputType}
      selectOptions={selectOptions}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  ) : (
    <LabeledText label={label} text={value} />
  );
};

ToggleTextInput.propTypes = {
  isEditing: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  selectOptions: PropTypes.instanceOf(Array)
};

export default ToggleTextInput;
