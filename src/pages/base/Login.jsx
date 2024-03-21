/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogin } from '@baseHooks/useLogin';
import { getCompany } from '@baseStores/companyInfo/companyInfoActions';
import logoPlaceholder from 'src/assets/base/icons/lcnc-logo.png';
import 'src/assets/base/css/login.scss';

const Login = () => {
  const {
    formData,
    validation,
    isButtonEnabled,
    isLoading,
    handleChange,
    handleLoginSubmit,
    togglePassword,
    showPassword,
    inputRef
  } = useLogin();

  const dispatch = useDispatch();
  const company = useSelector(state => state.userCompany);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative w-[calc(800/1920*100vw)] h-full pc-only bg-[url('/src/assets/base/icons/login-mv.jpg')] bg-cover bg-no-repeat flex items-center justify-center">
        <div className="w-[100%] max-w-[calc(674/1920*100vw)] mx-[calc(30/1920*100vw)] text-white">
          <h1 className="text-[calc(80/1920*100vw)] leading-[calc(93/1920*100vw)] font-stolzlBold">
            Let us help you manage your business.
          </h1>
          <p className="block mt-[calc(10/1920*100vw)] leading-[calc(26/1920*100vw)] text-[calc(16/1920*100vw)] font-stolzlBook">
            Welcome to LCNC Web Development Inc. Customer Relationship <br />
            Management where you can manage and handle your future.
          </p>
        </div>
      </div>

      <div className="relative w-[calc(1120/1920*100vw)] h-full">
        <div className="flex flex-col items-center justify-center mt-[200px]">
          <div className="login__inner">
            {JSON.stringify()}
            <img
              src={company?.company?.logo || logoPlaceholder}
              className="w-[146px] h-[70px] m-auto object-cover"
              alt="Company Logo"
            />
            <form className="!mt-[73px] w-[500px] m-auto items-center">
              <div>
                <label
                  className="text-[12px] font-stolzlBook"
                  htmlFor="userEmailCode"
                >
                  Email / User Code
                </label>
                <input
                  className="mt-1.5 w-full h-10 px-3 mr-2.5 placeholder-[#bdbec1] focus:outline-none focus:border-[#000]"
                  type="text"
                  name="userEmailCode"
                  value={formData.userEmailCode}
                  placeholder="Enter your email address"
                  onChange={handleChange}
                />
                {validation.userEmailCode && (
                  <p className="login__hint text-[10px] font-stolzlBook">
                    {validation.userEmailCode}
                  </p>
                )}
              </div>

              <div className="!mt-3">
                <label
                  htmlFor="password"
                  className="text-[12px] font-stolzlBook"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="mt-1.5 w-full h-10 px-3 mr-2.5 placeholder-[#bdbec1] focus:outline-none focus:border-[#000]"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    ref={inputRef}
                  />
                  <button
                    className="absolute top-0 right-0 w-[40px] h-[40px] flex items-center justify-center"
                    type="button"
                    onClick={togglePassword}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                {validation.password && (
                  <p className="login__hint text-[10px] font-stolzlBook">
                    {validation.password}
                  </p>
                )}
              </div>
              <div className="text-[12px] font-stolzlBook mt-2  text-right my-1">
                <Link
                  to="forgot-password"
                  className="text-[#458FFF] underline hover:text-[#232932]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-[38px]">
                <button
                  disabled={!isButtonEnabled}
                  className={`block w-full bg-gray-400 border-none rounded active:opacity-100 text-white text-[12px] h-10 ${
                    isButtonEnabled
                      ? 'hover:bg-gray-500'
                      : '!bg-disabled is-disabled'
                  }`}
                  type="submit"
                  onClick={handleLoginSubmit}
                >
                  {isLoading ? (
                    <FaSpinner className="spinner mx-auto" />
                  ) : (
                    'Log In'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
