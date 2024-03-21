import PropTypes from 'prop-types';

const CheckboxOption = ({ value, isChecked, children, onChange }) => {
  return (
    <li className="react-select-option">
      <label
        className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
        htmlFor={value}
      >
        <input
          type="checkbox"
          id={value}
          value={value}
          checked={isChecked}
          onChange={e => onChange(e.target.value)}
          hidden
        />
        <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative">
          <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-md" />
          <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-md" />
        </span>
        <i className="inline-block align-middle cursor-pointer ml-2.5 -mt-[1px] not-italic text-[14px] text-[#222222] font-normal leading-[14px] font-stolzlBook">
          {children}
        </i>
      </label>
    </li>
  );
};

CheckboxOption.propTypes = {
  value: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired
};

export default CheckboxOption;
