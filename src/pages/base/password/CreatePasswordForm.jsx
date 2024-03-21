/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCreateNewPassword } from '@baseHooks/Pages/password/useCreateNewPassword';
import BackArrow from '@baseComponents/Common/BackArrow';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

const ActivateAccountForm = () => {
  const {
    formData,
    isLoading,
    isButtonEnabled,
    validationSchema,
    showPassword,
    showConfimPassword,
    handleChange,
    handleSubmit,
    togglePassword,
    toggleConfirmPassword
  } = useCreateNewPassword();

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
            <label
              className="text-[12px] font-stolzlBook"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <Field
                className="block w-full mt-1.5 bg-white border-solid border-[1px] border-[#eaeaea] focus:outline-none focus:border-[#000] placeholder:font-stolzlBook rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 px-3 mr-2.5 placeholder-[#C4C9D4]"
                // type="password"
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                onChange={e =>
                  handleChange(e, setFieldValue, setFieldTouched, setFieldError)
                }
                value={formData.newPassword ?? ''}
                placeholder="Enter your password"
              />
              <button
                className="absolute top-0 right-0 w-[40px] h-[40px] flex items-center justify-center"
                type="button"
                onClick={togglePassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-[10px] font-stolzlBook text-error mt-[10px]"
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              className="text-[12px] font-stolzlBook mt-6"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Field
                className="block w-full mt-1.5 bg-white border-solid border-[1px] border-[#eaeaea] focus:outline-none focus:border-[#000] placeholder:font-stolzlBook rounded text-[14px] text-[#232932] font-stozlBook leading-[17px] h-10 px-3 mr-2.5 placeholder-[#C4C9D4]"
                type={showConfimPassword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={e =>
                  handleChange(e, setFieldValue, setFieldTouched, setFieldError)
                }
                value={formData.confirmPassword ?? ''}
                placeholder="Enter your password"
              />
              <button
                className="absolute top-0 right-0 w-[40px] h-[40px] flex items-center justify-center"
                type="button"
                onClick={toggleConfirmPassword}
              >
                {showConfimPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-[10px] font-stolzlBook text-error mt-[10px]"
              />
            </div>
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
              {isLoading ? (
                <FaSpinner className="spinner mx-auto" />
              ) : (
                'Reset Password'
              )}
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
