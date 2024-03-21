import PropTypes from 'prop-types';

const FormLabel = ({ className = '', text, htmlFor, required = false }) => {
  return (
    <label
      className={`${className} block mb-[5px] text-[#414141] font-stolzlBook text-[12px] leading-[14px]`}
      htmlFor={htmlFor}
    >
      {text} {required ? <span className="text-[#E43B26]">*</span> : ''}
    </label>
  );
};
FormLabel.propTypes = {
  required: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  htmlFor: PropTypes.string
};
export default FormLabel;
