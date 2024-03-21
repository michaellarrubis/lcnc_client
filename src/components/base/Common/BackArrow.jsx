import React from 'react';
import PropTypes from 'prop-types';

const BackArrow = ({ label }) => {
  return (
    <>
      <img
        className="m-auto cursor-pointer inline-block"
        src="icons/back-arrow.svg"
        alt="back button"
        id="backarrow"
      />
      <label
        className="inline-block text-[#232932] tracking-widest ml-5 text-[14px] font-stolzlBook cursor-pointer"
        htmlFor="backarrow"
      >
        {label}
      </label>
    </>
  );
};

BackArrow.propTypes = {
  label: PropTypes.string
};

export default BackArrow;
