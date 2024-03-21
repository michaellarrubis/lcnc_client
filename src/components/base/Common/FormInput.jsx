import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const FormInput = ({ name, onChange }) => {
  return (
    <div className="mb-[20px] w-full">
      <Field
        className={`block w-full bg-white border-solid border-[1px] ${
          name && name
            ? 'border-[#E43B26] placeholder-[#E43B26] text-[10px]'
            : 'border-[#eaeaea] text-[14px]'
        }  rounded text-[#232932]  leading-[17px] h-10 pl-2 pr-3 text-verdana`}
        type="text"
        name="first_name"
        value=""
        onChange={onChange}
      />
      <ErrorMessage
        name="first_name"
        component="div"
        className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
      />
    </div>
  );
};

FormInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string
};
export default FormInput;
