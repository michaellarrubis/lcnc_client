import React from 'react';
import PropTypes from 'prop-types';

const DropdownMenu = ({ options, dropdownRef }) => {
  return (
    <div
      className="right-[5px] top-[42px] opacity-100 pointer-events-auto inline-block absolute pointer-events-none bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)] z-[2] px-[19px] py-[21px] rounded"
      ref={dropdownRef}
    >
      <span className="absolute border-x-[transparent] border-x-[12px] border-solid border-l-transparent border-b-white border-b-[12px] right-[15px] -top-3 drop-shadow-[0_-1.3px_1px_rgba(0,0,0,0.1)]" />
      <ul className="text-xs w-[161px] max-w-full list-none">
        {options?.map(opt => (
          <li
            key={opt.label}
            className="cursor-pointer transition duration-300 ease-in-out pt-2 pb-[7px] px-2.5 rounded hover:bg-[#f8f9fa]"
            onClick={opt.onClick}
            aria-hidden="true"
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropdownMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ Object })),
  dropdownRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Object) })
  ])
};
export default DropdownMenu;
