/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BackArrow from '@baseComponents/Common/BackArrow';
import { FaSpinner } from 'react-icons/fa';
import { useForgotPassword } from '@baseHooks/Pages/password/useForgotPassword';

const ForgotPasswordForm = () => {
  const {
    formData,
    isLoading,
    isEmailUnregistered,
    isButtonEnabled,
    validationSchema,
    handleChange,
    handleSubmit
  } = useForgotPassword();

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {({ setFieldValue, setFieldTouched, setFieldError }) => (
        <Form>
          <div className="!mt-[77px] m-auto items-center">
            <h2 className="text-[22px] text-center font-stolzlMedium">
              Forgot your password?
            </h2>
            <p className="text-center text-[14px] mt-4 font-stolzlBook">
              Please enter your registered e-mail address associated with this
              account.
            </p>
            <div className="mx-auto mt-8 w-[500px]">
              <label className="text-[12px] font-stolzlBook" htmlFor="email">
                Email
              </label>
              <Field
                className="block w-full mt-1.5 font-stolzlBook bg-white border-solid border-[1px] border-[#eaeaea] focus:outline-none focus:border-[#000] rounded text-[14px] text-[#232932] leading-[17px] h-10 px-3 mr-2.5 placeholder-[#C4C9D4]"
                type="text"
                name="email"
                onChange={e =>
                  handleChange(e, setFieldValue, setFieldTouched, setFieldError)
                }
                value={formData.email ?? ''}
                placeholder="Enter your email address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-[10px] font-stolzlBook text-error mt-[10px]"
              />
              {isEmailUnregistered && (
                <p className="text-[10px] font-stolzlBook text-error mt-[10px]">
                  Unregistered Email
                </p>
              )}
              <div className="mt-[30px]">
                <button
                  disabled={!isButtonEnabled}
                  className={`block w-full bg-gray-400 border-none rounded text-white text-[12px] h-10 text-center ${
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
              <div className="mt-10 mx-auto text-center ">
                <Link to="/" className="hover:opacity-50">
                  <BackArrow label="Back to Login" />
                </Link>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
