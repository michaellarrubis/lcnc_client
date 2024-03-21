/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useActivateAccount } from '@baseHooks/Pages/account/useActivateAccount';
import BackArrow from '@baseComponents/Common/BackArrow';

const ActivateAccountForm = () => {
  const {
    inputRef,
    inputConfirmRef,
    formData,
    isLoading,
    validationSchema,
    isButtonEnabled,
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    handleChange,
    handleSubmit
  } = useActivateAccount();

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {({ setFieldValue, setFieldTouched, setFieldError }) => (
        <Form className="mx-auto mt-[31px] w-[500px]">
          <div>
            <label className="text-[12px] font-stolzlBook" htmlFor="password">
              Input Password
            </label>
            <div className="relative">
              <Field
                className="block w-full mt-1.5 bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 px-3 mr-2.5 placeholder-[#C4C9D4] focus:outline-none focus:border-[#000]"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={e =>
                  handleChange(e, setFieldValue, setFieldTouched, setFieldError)
                }
                value={formData.password ?? ''}
                placeholder="Enter your password"
                innerRef={inputRef}
              />
              <button
                className="absolute top-0 right-0 w-[40px] h-[40px] flex items-center justify-center"
                type="button"
                onClick={togglePassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-[10px] font-stolzlBook text-error mt-[10px]"
            />
          </div>
          <div className="mt-3">
            <label
              className="text-[12px] mt-6 font-stolzlBook"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Field
                className="block w-full mt-1.5 bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 px-3 mr-2.5 placeholder-[#C4C9D4] focus:outline-none focus:border-[#000]"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={e =>
                  handleChange(e, setFieldValue, setFieldTouched, setFieldError)
                }
                value={formData.confirmPassword ?? ''}
                placeholder="Enter your password"
                innerRef={inputConfirmRef}
              />
              <button
                className="absolute top-0 right-0 w-[40px] h-[40px] flex items-center justify-center"
                type="button"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-[10px] font-stolzlBook text-error mt-[10px]"
            />
          </div>
          <div className="mt-[29px]">
            <button
              disabled={!isButtonEnabled}
              className={`block w-full bg-gray-400 border-none rounded text-white text-[12px] h-10 ${
                isButtonEnabled
                  ? 'hover:bg-gray-500'
                  : '!bg-disabled is-disabled'
              }`}
              type="submit"
            >
              {isLoading ? <FaSpinner className="spinner mx-auto" /> : 'Submit'}
            </button>
          </div>
          <div className="mt-[28px] mx-auto text-center mb-3">
            <Link to="/" className="hover:opacity-50">
              <BackArrow label="Back to Login" />
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ActivateAccountForm;
