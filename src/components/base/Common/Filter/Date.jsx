import React from 'react';
import PropTypes from 'prop-types';
import useDate from '@baseHooks/Components/Common/Filter/useDate';

const Date = ({ form, item, submitFilter }) => {
  const { onSelectDropdown } = useDate({ form, item, submitFilter });

  return (
    <div className="inline-flex">
      <div htmlFor="inputs">
        <span className="block mb-2.5 text-[12px] font-stolzlBook text-[#414141] leading-[14px]">
          {item[0].label}
        </span>
        <label
          className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
          htmlFor={item[0].name}
        >
          <input
            className="block w-full border-solid border-[1px] text-[12px] border border-[#eaeaea] focus:outline-none focus:border-[#000] bg-white rounded text-[#232932] font-stolzlBook leading-[17px] h-10 pl-2 pr-3 mt-1"
            name={item[0].name}
            placeholder="mm/dd/yyyy"
            type="date"
            onChange={e => onSelectDropdown(e)}
          />
        </label>
      </div>
      <div className="leading-[14px] m-[40px_10px_0px]"> - </div>
      <div htmlFor="inputs">
        <span className="block mb-2.5 text-[12px] font-stolzlBook text-[#414141] leading-[14px]">
          {item[1].label}
        </span>
        <label
          className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
          htmlFor={item[1].name}
        >
          <input
            className="block w-full border-solid border-[1px] text-[12px] border border-[#eaeaea] focus:outline-none focus:border-[#000] bg-white rounded text-[#232932] font-stolzlBook leading-[17px] h-10 pl-2 pr-3 mt-1"
            name={item[1].name}
            placeholder="mm/dd/yyyy"
            type="date"
            onChange={e => onSelectDropdown(e)}
          />
        </label>
      </div>
    </div>
  );
};

Date.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  item: PropTypes.arrayOf(String),
  submitFilter: PropTypes.func.isRequired
};
export default Date;
