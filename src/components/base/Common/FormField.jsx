/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormLabel from './FormLabel';
import Select from './Select';

const TextField = ({
  className = '',
  error,
  errorMessage = 'Field Required', // Default value if not set
  value,
  onChange,
  onBlur,
  name,
  type,
  readOnly = false,
  label,
  required = false,
  disabled = false,
  placeholder = '',
  max
}) => {
  return (
    <>
      <FormLabel text={label} htmlFor={name} required={required} />
      <Field
        className={`block w-full border-solid border-[1px] ${
          type === 'text' && name !== 'email' && 'capitalize'
        } ${
          (error && required) || error
            ? `border-[#E43B26] placeholder-[#f19d94] ${
                value ? 'text-[14px]' : 'text-[12px] '
              } focus:outline-none focus:border-[#E43B26]`
            : 'border-[#eaeaea] text-[14px] placeholder-[rgba(35,41,50,0.3)]'
        } ${
          readOnly || disabled
            ? 'focus:outline-none bg-[#F7F7F7]'
            : 'focus:outline-none focus:border-[#000] bg-white'
        }  rounded text-[#232932] font-stolzlBook leading-[17px] h-10 pl-2 pr-3  ${className}`}
        type={type}
        name={name}
        id={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={error && required ? errorMessage : placeholder}
        max={max}
        disabled={disabled}
      />
    </>
  );
};

const ImageField = ({
  preview,
  image,
  defaultImage,
  type,
  name,
  onChange,
  id,
  isEdit,
  firstName,
  lastName,
  suffix,
  idNo,
  email
}) => {
  return (
    <>
      <div className="w-[120px] h-[120px] border-[1px] border-solid border-[#eaeaea] rounded">
        {preview ? (
          <img
            src={preview}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <img
            src={image || defaultImage}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        )}
        <label
          htmlFor="image"
          className="align-top mt-2.5 text-[12px] font-stolzlBook leading-[14px] text-[#458FFF] underline hover:text-[#458FFF] focus:text-[#458FFF] cursor-pointer flex justify-center hover:text-opacity-50"
        >
          <input
            type={type}
            id="image"
            name={name}
            onChange={onChange}
            hidden
          />

          {!isEdit && !id ? (
            <span>Upload Image</span>
          ) : (
            isEdit && <span>Change Image</span>
          )}
        </label>
      </div>
      <div className="flex-1">
        <h5
          className={`text-[22px] font-stolzlMedium leading-[27px] mt-5 capitalize ${
            firstName || lastName ? 'text-input' : 'text-[#eaeaea]'
          }`}
        >
          {`${firstName}` || `${lastName}`
            ? `${firstName} ${lastName} ${suffix}`
            : `Auto Input Name`}
        </h5>
        <p
          className={`text-[14px] font-normal leading-[14px] mt-[11px] ${
            idNo ? 'text-input' : 'text-[#eaeaea]'
          }`}
        >
          {idNo ? `ID: ${idNo}` : 'ID: '}
        </p>
        <p
          className={`text-[14px] font-normal leading-[14px] mt-[13px] ${
            email ? 'text-input' : 'text-[#eaeaea]'
          }`}
        >
          {email ? `${email}` : `Auto Input Email Address`}
        </p>
      </div>
    </>
  );
};

const SearchField = ({
  className = '',
  error,
  onChange,
  name,
  placeholder,
  readOnly = false,
  label,
  required = false,
  innerRef,
  autoComplete = 'off',
  errorMessage = ''
}) => {
  return (
    <>
      <FormLabel text={label} htmlFor={name} required={required} />
      <input
        className={`block w-full bg-white border-solid border-[1px] mt-2.5 ${
          (error && required) || error
            ? 'border-[#E43B26] placeholder-[#f19d94] text-[14px] focus:outline-none focus:border-[#E43B26]'
            : 'border-[#eaeaea] text-[14px] placeholder-[rgba(35,41,50,0.3)]'
        } ${
          readOnly ? 'focus:outline-none bg-[#f7f7f7]' : 'focus:border-[#000]'
        } rounded  font-stolzlBook text-[#232932] focus:outline-none  leading-[17px] h-10 pl-[34px] pr-3 bg-no-repeat bg-[12px_13px] bg-[url('/src/assets/base/icons/black-search-icon.svg')] ${className}`}
        onChange={onChange}
        ref={innerRef}
        type="text"
        name={name}
        id={name}
        placeholder={error && required ? errorMessage : placeholder}
        autoComplete={autoComplete}
        readOnly={readOnly}
      />
    </>
  );
};

const SelectField = ({
  label,
  name,
  required = false,
  options = [],
  onChangeValue,
  selectedValue,
  disabled = false,
  placeholder = '',
  selectName,
  errors = null,
  currentValue,
  errorMessage = 'Field Required' // Default value
}) => {
  return (
    <>
      <FormLabel text={label} htmlFor={name} required={required} />
      <Select
        options={options}
        onChangeValue={onChangeValue}
        selectedValue={selectedValue}
        disabled={disabled}
        selectName={selectName}
        errorMessage={errorMessage}
        placeholder={placeholder}
        required={required}
        errors={errors}
        currentValue={currentValue}
      />
    </>
  );
};

const TextArea = ({
  error,
  errorMessage = 'Field Required', // Default value if not set
  value,
  onChange,
  onBlur,
  name,
  label,
  required = false,
  placeholder = '',
  max
}) => {
  return (
    <>
      <FormLabel text={label} htmlFor={name} required={required} />
      <textarea
        className={`block w-full bg-white resize-none border-solid border-[1px] rounded-default text-[#232932] leading-[17px] p-1 ${
          error && required
            ? `border-[#E43B26] placeholder-[#f19d94] ${
                value ? 'text-[14px]' : 'text-[12px] '
              } focus:outline-none focus:border-[#E43B26]`
            : 'border-[#eaeaea] text-[14px] placeholder-[rgba(35,41,50,0.3)] focus:outline-none focus:border-[#000]'
        }  `}
        name={name}
        placeholder={error && required ? errorMessage : placeholder}
        rows="4"
        maxLength={max}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};

const FormField = ({
  className = '',
  error,
  errorMessage = 'Field Required', // default value
  value,
  onChange,
  onBlur,
  name,
  type,
  readOnly = false,
  label,
  required = false,
  placeholder = '',
  max,

  options = [],
  onChangeValue,
  selectedValue,
  disabled = false,
  selectName,
  currentValue,
  errors = null,

  innerRef,
  autoComplete = 'off',

  preview,
  image,
  defaultImage,
  id,
  isEdit,
  firstName,
  lastName,
  suffix,
  idNo,
  email
}) => {
  const renderField = fieldType => {
    switch (fieldType) {
      case 'text':
        return (
          <TextField
            label={label}
            className={className}
            error={error}
            errorMessage={errorMessage}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        );
      case 'email':
        return (
          <TextField
            label={label}
            className={className}
            error={error}
            errorMessage={errorMessage}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        );
      case 'date':
        return (
          <TextField
            label={label}
            className={className}
            error={error}
            errorMessage={errorMessage}
            value={value}
            onChange={onChange}
            name={name}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder}
            type={type}
            max={max}
          />
        );
      case 'tel':
        return (
          <TextField
            label={label}
            className={className}
            error={error}
            errorMessage={errorMessage}
            value={value}
            onChange={onChange}
            name={name}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder}
            type={type}
          />
        );
      case 'select':
        return (
          <SelectField
            label={label}
            htmlFor={name}
            required={required}
            options={options}
            onChangeValue={onChangeValue}
            selectedValue={selectedValue}
            errorMessage={errorMessage}
            disabled={disabled}
            selectName={selectName}
            errors={error}
            currentValue={currentValue}
            placeholder={placeholder}
          />
        );
      case 'search':
        return (
          <SearchField
            label={label}
            htmlFor={name}
            onChange={onChange}
            innerRef={innerRef}
            value={value}
            name={name}
            id={name}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            readOnly={readOnly}
            errorMessage={errorMessage}
            error={error}
          />
        );
      case 'file':
        return (
          <ImageField
            preview={preview}
            image={image}
            defaultImage={defaultImage}
            id={id}
            isEdit={isEdit}
            firstName={firstName}
            lastName={lastName}
            suffix={suffix}
            idNo={idNo}
            email={email}
            name={name}
            onChange={onChange}
            type={type}
          />
        );
      case 'number':
        return (
          <TextField
            label={label}
            className={className}
            error={error}
            errorMessage={errorMessage}
            value={value}
            onChange={onChange}
            name={name}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder}
            type={type}
          />
        );
      case 'textarea':
        return (
          <TextArea
            label={label}
            className={className}
            error={error}
            errorMessage={errorMessage}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            required={required}
            placeholder={placeholder}
            type={type}
            max={max}
          />
        );
      case 'radio':
        return (
          <RadioGroupField
            label={label}
            className={className}
            error={error}
            errorMessage={errorMessage}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            required={required}
            placeholder={placeholder}
            type={type}
            options={options}
            disabled={disabled}
          />
        );
      default:
        return null;
    }
  };

  return renderField(type);
};

const RadioGroupField = ({
  value,
  onChange,
  name,
  label,
  required = false,
  disabled = false,
  options = [
    { label: 'Option 1', value: 'value-1' },
    { label: 'Option 2', value: 'value-2' }
  ]
}) => {
  return (
    <>
      <FormLabel text={label} htmlFor={name} required={required} />
      <div role="group" aria-labelledby="radio-group" className="flex gap-4">
        {options.map(item => (
          <label
            key={item.label}
            className={`flex items-center ${
              !disabled ? 'hover:cursor-pointer' : ''
            }`}
          >
            <Field
              type="radio"
              name={name}
              value={item.value}
              className="mr-1"
              disabled={disabled}
              onChange={onChange}
              checked={value === item.value}
            />
            {item.label}
          </label>
        ))}
      </div>
    </>
  );
};

ImageField.propTypes = {
  preview: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  image: PropTypes.string,
  defaultImage: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  isEdit: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  suffix: PropTypes.string,
  email: PropTypes.string,
  idNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.number
};

TextField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  max: PropTypes.string
};

RadioGroupField.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({ Object })),
    PropTypes.array
  ])
};

SearchField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  errorMessage: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

SelectField.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({ Object })),
    PropTypes.array
  ]),
  onChangeValue: PropTypes.func,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  selectName: PropTypes.string,
  currentValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool
};

TextArea.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  max: PropTypes.string
};

FormField.propTypes = {
  // PropTypes for TextField
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  max: PropTypes.string,

  // PropTypes for SelectField
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({ Object })),
    PropTypes.array
  ]),
  onChangeValue: PropTypes.func,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  selectName: PropTypes.string,
  currentValue: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  autoComplete: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),

  // PropTypes for File Image
  preview: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  image: PropTypes.string,
  defaultImage: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  idNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.number
};
export default FormField;
