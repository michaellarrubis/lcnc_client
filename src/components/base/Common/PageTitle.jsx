/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import 'src/assets/base/css/pageTitle.scss';

const PageTitle = ({ backButton = false, backPath = '', title = '' }) => {
  const navigate = useNavigate();

  return (
    <h1
      className={`text-[22px] text-[#222222] font-stolzlMedium leading-[27px] relative ${
        backButton ? ' has-back-btn pl-[60px]' : ''
      }`}
    >
      {backButton ? (
        <button
          type="button"
          className="block w-10 h-10 border-solid border-2 border-[#eeeeee] rounded-full absolute top-1/2 left-0 translate-y-[-50%] translate-x-0 bg-[url('/src/assets/base/icons/back.svg')] bg-no-repeat bg-center hover:opacity-50"
          onClick={() => navigate(backPath)}
        />
      ) : null}
      {title}
    </h1>
  );
};

PageTitle.propTypes = {
  backButton: PropTypes.bool,
  backPath: PropTypes.string,
  title: PropTypes.string
};

export default PageTitle;
