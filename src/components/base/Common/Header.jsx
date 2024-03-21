import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import GlobalSearch from '@baseComponents/Common/GlobalSearch';
import { getCompany } from '@baseStores//companyInfo/companyInfoActions';
import logoPlaceholder from 'src/assets/base/icons/lcnc-logo.png';
import PropTypes from 'prop-types';
import User from './User';

const Header = ({ setSidebarState }) => {
  const [isOpen, setOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const dispatch = useDispatch();
  const company = useSelector(state => state.userCompany);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    if (company?.company?.logo) {
      setLogoUrl(company.company.logo);
    }
  }, [company]);

  const toggle = () => {
    setOpen(!isOpen);
    setSidebarState(isOpen);
  };

  return (
    <header className="flex fixed w-screen top-0 h-[60px] bg-white py-[13px] px-[9px] z-10 top-0 justify-between items-center shadow-[0_1px_26px_#00000012]">
      <div
        className={`
        flex items-center justify-center h-[34px] w-[34px] rounded-full cursor-pointer hover:opacity-50
        ${isOpen && 'bg-gray-50'}
        `}
        onClick={toggle}
        aria-hidden="true"
      >
        <img
          className="transition duration-300 ease-in-out"
          src="icons/hamburger.svg"
          alt=""
        />
      </div>
      <Link
        to="/"
        className="py-0 pl-[20px] hidden md:block hover:cursor-pointer"
      >
        <img
          src={logoUrl !== null ? logoUrl : logoPlaceholder}
          className="w-[65px] h-[30px] object-cover"
          alt="Company Logo"
        />
      </Link>
      <div>
        <GlobalSearch />
      </div>
      <div className="flex-1">
        <User />
      </div>
    </header>
  );
};

Header.propTypes = {
  setSidebarState: PropTypes.func
};

export default Header;
