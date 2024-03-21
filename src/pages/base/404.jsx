import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen text-center text-[#232932]">
      <div className="w-[100%] max-w-[1138px] mx-auto relative">
        <img
          className="m-auto absolute w-[18%] md:w-[30.3%] h-[7%] md:h-[16%] top-[14%] md:top-[23%] left-[18px] md:left-[-1px]"
          src="/images/plug-female.png"
          alt="plug male"
        />
        <h1 className="text-[20vw] md:text-[188px] leading-[1.2] font-stolzlBold tracking-[5.64px] relative mb-[13px]">
          404
        </h1>
        <img
          className="m-auto absolute w-[18%] md:w-[30.3%] h-[7%] md:h-[16%] top-[14%] md:top-[23%] right-[18px] md:right-[1px]"
          src="/images/plug-male.png"
          alt="plug female"
        />
        <h2 className="text-[16px] md:text-[32px] leading-[1.2] font-stolzlMedium mt-[-22px]">
          Page not found
        </h2>
        <p className="text-[12px] leading-[1.8] mb-[35px] mt-[6px] font-stolzlBook">
          The page you are looking for could not be found. Please check if the
          URL is correct.
        </p>
        <button
          type="button"
          className="text-[12px] flex items-center justify-center text-center bg-[#232932] text-white px-4 h-[40px] mx-auto  rounded border font-stolzlBook cursor-pointer"
          onClick={() => navigate('/', { replace: true })}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
