import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="w-[650px] max-w-full text-center absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
        <figure className="block w-[145px] h-[140px] relative my-0 mx-auto mb-[22px] before:content-[''] before:block before:w-[254px] before:h-0 before:border-[2px] before:border-solid before:border-[#bbbdc0] before:rounded before:absolute before:bottom-[1px] before:left-[100%] after:content-[''] after:block after:w-[254px] after:h-0 after:border-[2px] after:border-solid after:border-[#bbbdc0] after:rounded after:absolute after:bottom-[1px] after:right-[100%]">
          <img
            className="block w-[110px] h-full my-0 mx-auto"
            src="images/padlock-401.png"
            alt="padlock"
          />
        </figure>
        <h1 className="font-stolzlBold text-[188px] leading-[100%] text-[#232932] mb-[11px] tracking-[5.64px] ml-[5px]">
          401
        </h1>
        <h2 className="font-stolzlMedium text-[32px] leading-[38px] text-[#232932] mb-[6px]">
          Access Denied
        </h2>
        <p className="font-stolzlBook text-[12px] leading-[22px] text-[#232932] mb-[37px]">
          You do not have permission to access this page or resource. <br />
          Please contact an administrator to get permission to access this page.
        </p>
        <button
          type="button"
          className="text-[12px] text-white font-normal leading-[100%] bg-[#232932] border-none pt-[10px] pb-3 px-2.5 rounded h-10 w-[130px]"
          onClick={() => navigate('/')}
        >
          Back to page
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
