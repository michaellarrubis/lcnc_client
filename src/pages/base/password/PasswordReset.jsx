import React from 'react';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
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
            <img
              className="w-[146px] h-[70px] m-auto"
              src="images/logo-normal.svg"
              alt="Company Logo"
            />

            <div className="!mt-[77px] m-auto items-center">
              <h2 className="text-[22px] text-center font-stolzlMedium">
                Password Reset
              </h2>
              <p className="text-center tracking-[.08em] text-[14px] mt-4 font-stolzlBook">
                Your password has been successfully reset. Please log in your
                credentials.
              </p>
              <div className="mx-auto w-[500px]">
                <div className="mt-[37px]">
                  <Link to="/">
                    <button
                      type="button"
                      className="block w-full bg-gray-400 border-none hover:bg-gray-500 rounded text-white text-[12px] h-10"
                    >
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;
