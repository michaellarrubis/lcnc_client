import React from 'react';
import PropTypes from 'prop-types';
import useCheckBox from '@baseHooks/Components/Common/Filter/useCheckbox';

const Checkbox = ({ form, name, item, submitFilter }) => {
  const { isChecked, onSelectCheckbox } = useCheckBox({
    form,
    name,
    submitFilter
  });

  return (
    <div className="mb-2.5">
      <label
        className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
        htmlFor={name}
      >
        <input
          checked={isChecked}
          type="checkbox"
          name={name}
          id={name}
          value={item}
          hidden
          onChange={onSelectCheckbox}
        />
        <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative">
          <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-md" />
          <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-md" />
        </span>
        <i className="inline-block align-middle cursor-pointer ml-[11px] -mt-[1px] not-italic text-[12px] text-[#222222] font-normal leading-[14px] font-stolzlBook">
          {item}
        </i>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  item: PropTypes.arrayOf(String),
  submitFilter: PropTypes.func.isRequired
};

export default Checkbox;
