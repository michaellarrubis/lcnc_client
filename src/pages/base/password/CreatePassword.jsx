import React from 'react';
import ActivateAccountForm from './CreatePasswordForm';

const CreatePassword = () => {
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
          <div className="w-full">
            <img
              className="w-[146px] h-[70px] m-auto"
              src="images/logo-normal.svg"
              alt="Company Logo"
            />

            <div className="!mt-[77px] m-auto items-center">
              <h2 className="text-[22px] text-center font-stolzlMedium">
                Create your new password
              </h2>
              <ActivateAccountForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePassword;
