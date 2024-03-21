import 'src/assets/base/css/input.scss';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Basic = ({
  name,
  id,
  modifier,
  inputValue,
  inputType,
  placeholder,
  onChange
}) => {
  return (
    <input
      className={`input ${modifier}`}
      name={name}
      id={id}
      key={id}
      value={inputValue}
      type={inputType ?? 'text'}
      placeholder={placeholder}
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  );
};

const Textarea = ({
  name,
  id,
  inputValue,
  modifier,
  placeholder,
  onChange
}) => {
  return (
    <textarea
      className={`input input__textarea ${modifier}`}
      name={name}
      id={id}
      key={id}
      value={inputValue}
      placeholder={placeholder}
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  );
};

const Select = ({
  name,
  id,
  modifier,
  inputValue,
  placeholder,
  selectOptions,
  onClick,
  onChange,
  disable,
  currentValue
}) => {
  const isEmpty =
    inputValue === '—' || inputValue === '' || inputValue === null;
  return (
    <select
      className={`input input__select ${modifier}`}
      name={name}
      id={id}
      key={id}
      onClick={onClick}
      disabled={isEmpty || disable}
      defaultValue={inputValue ?? currentValue}
      onChange={e => {
        onChange(e.target.value);
      }}
    >
      {placeholder ? (
        <option key="placeholder" disabled defaultValue="selected">
          {placeholder}
        </option>
      ) : null}
      {selectOptions.map(option => {
        return isEmpty ? (
          <option key={option.key}>N/A</option>
        ) : (
          <option key={option.key}>{option.label ?? option}</option>
        );
      })}
    </select>
  );
};

const CheckBox = ({ id, value, label, onToggle }) => {
  const [toggleCheckbox, setToggleCheckbox] = useState(value);

  useEffect(() => {
    onToggle(toggleCheckbox);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleCheckbox]);

  return (
    <div className="input input__checkbox" key={id}>
      <span
        className="input__checkbox--marker"
        onClick={() => {
          setToggleCheckbox(!toggleCheckbox);
        }}
        aria-hidden="true"
      >
        {toggleCheckbox ? '✓' : ''}
      </span>
      {!_.isEmpty(label) ? (
        <span
          className="input__checkbox--label"
          onClick={() => {
            setToggleCheckbox(!toggleCheckbox);
          }}
          aria-hidden="true"
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};

const DateBox = ({ name, id, inputValue, onChange }) => {
  return (
    <input
      className="input input__date"
      name={name}
      id={id}
      key={id}
      value={inputValue}
      type="date"
      onChange={e => {
        onChange(e.target.value);
      }}
      max="9999-12-31"
    />
  );
};

const NumberBox = ({ name, id, inputValue, onChange }) => {
  return (
    <input
      className="input"
      name={name}
      id={id}
      key={id}
      value={Number(inputValue)}
      type="number"
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  );
};

const MultiSelect = ({ selectOptions, getLabel, onSelect }) => {
  const label = [];
  const [isInitialized, setIsInitialized] = useState(false);
  const [dropdownLabel, setDropdownLabel] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    setDropdownLabel(label);
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getLabel(dropdownLabel.join(', '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownLabel]);

  const renderContent = (dropdownName, onToggleDropDown, template) => {
    if (!dropdownName.length) {
      if (template) {
        return <Link to="/#">+ Add Sheet</Link>;
      }
      return <span>Select</span>;
    }
    if (!onToggleDropDown) {
      return dropdownName.join(', ');
    }
    if (template) {
      return <Link to="/#">+ Add Sheet</Link>;
    }
    return <span>Select</span>;
  };

  return (
    <div className="input input__multi-select">
      <div
        role="button"
        tabIndex="0"
        className="input__multi-select--label"
        onClick={() => setToggleDropdown(true)}
        onKeyPress={setToggleDropdown(true)}
      >
        {renderContent}
      </div>

      <div
        className={`input__multi-select--dropdown ${
          toggleDropdown ? 'is-visible' : ''
        }`}
      >
        <div
          className="input__multi-select--label"
          onClick={() => setToggleDropdown(false)}
          aria-hidden="true"
        >
          {renderContent}
        </div>
        <div className="input__multi-select--options">
          {selectOptions.map((item, index) => (
            <div key={item.key}>
              <Input
                id={index}
                type="checkbox"
                label={item.label}
                value={item.selected}
                onToggle={selected => {
                  onSelect({
                    selected,
                    value: item.value,
                    label: item.label
                  });

                  if (selected) {
                    if (isInitialized) {
                      setDropdownLabel([...dropdownLabel, item.label]);
                    } else {
                      label.push(item.label);
                    }
                  } else if (isInitialized) {
                    setDropdownLabel(
                      dropdownLabel.filter(e => e !== item.label)
                    );
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Input = ({
  id,
  key,
  modifier = '',
  type = 'input',
  name = '',
  label = '',
  value,
  inputType = 'text',
  placeholder = '',
  disable,
  selectOptions = [],
  isTemplate,
  onChange = () => {},
  onToggle = () => {},
  onSelect = () => {},
  getLabel = () => {}
}) => {
  const renderInput = fieldType => {
    switch (fieldType) {
      case 'input':
        return (
          <Basic
            name={name}
            id={id}
            modifier={modifier}
            inputValue={value}
            inputType={inputType}
            placeholder={placeholder}
            onChange={data => onChange(data)}
          />
        );
      case 'select':
        return (
          <Select
            name={name}
            id={id}
            modifier={modifier}
            inputValue={value}
            disable={disable}
            placeholder={placeholder}
            selectOptions={selectOptions}
            onClick={() => {}}
            onChange={data => {
              onChange(data);
              onSelect(data);
            }}
          />
        );
      case 'checkbox':
        return (
          <CheckBox id={id} value={value} label={label} onToggle={onToggle} />
        );
      case 'date':
        return (
          <DateBox
            name={name}
            id={id}
            inputValue={value}
            onChange={data => onChange(data)}
          />
        );
      case 'number':
        return (
          <NumberBox
            name={name}
            id={id}
            inputValue={value}
            onChange={data => onChange(data)}
          />
        );
      case 'multiselect':
        return (
          <MultiSelect
            selectOptions={selectOptions}
            getLabel={getLabel}
            onSelect={onSelect}
            isTemplate={isTemplate}
          />
        );
      case 'textarea':
        return (
          <Textarea
            name={name}
            id={id}
            modifier={modifier}
            inputValue={value}
            placeholder={placeholder}
            onChange={data => onChange(data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="input__label" id={id} key={key} htmlFor={name}>
      {type !== 'checkbox' ? label : null}
      {/* BASIC INPUT */}
      {renderInput(type)}
    </div>
  );
};

Basic.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  modifier: PropTypes.string,
  inputValue: PropTypes.string,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

Textarea.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  modifier: PropTypes.string,
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

Select.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  modifier: PropTypes.string,
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  disable: PropTypes.bool,
  currentValue: PropTypes.string
};

CheckBox.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string,
  onToggle: PropTypes.func
};

NumberBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  inputValue: PropTypes.string,
  onChange: PropTypes.func
};

DateBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  inputValue: PropTypes.string,
  onChange: PropTypes.func
};

MultiSelect.propTypes = {
  selectOptions: PropTypes.arrayOf(PropTypes.shape({ Object })),
  getLabel: PropTypes.string,
  onSelect: PropTypes.func
};

Input.propTypes = {
  id: PropTypes.number,
  key: PropTypes.string,
  modifier: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({ Object })),
  isTemplate: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  getLabel: PropTypes.func
};
export default Input;
