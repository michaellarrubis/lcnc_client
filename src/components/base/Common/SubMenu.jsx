import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubMenu = ({ submenus, to, icon, label, sidebar }) => {
  const [eleHeight, seEletHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const pageName = useLocation().pathname.split('/');
  const dropDown = isOpen ? 'active' : '';
  const DropDownHeight = isOpen ? eleHeight : 0;

  const openDropdown = () => {
    setIsOpen(!isOpen);
    seEletHeight(ref.current.clientHeight);
  };

  const resetDropDown = () => {
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    seEletHeight(ref.current.clientHeight);
    window.addEventListener('resize', resetDropDown);
  }, [eleHeight]);

  useEffect(() => {
    seEletHeight(ref.current.clientHeight);
  }, [sidebar]);

  const subMenuItemJSX = submenus.map(item => {
    const menu = item.to.substring(item.to.lastIndexOf('/') + 1);
    return (
      <li
        className={`sidebar__sublist-item ${
          menu === pageName.slice(-1)[0] ? 'active' : ''
        }`}
        key={item.name}
      >
        <Link className="sidebar__sublist-link" to={to + item.to}>
          {item.name}
        </Link>
      </li>
    );
  });

  return (
    <>
      <div
        className={`sidebar__submenu sidebar__item flex ${dropDown}`}
        onClick={openDropdown}
      >
        <img className="sidebar__img" src={icon} alt="" />
        <p className="sidebar__text">{label}</p>
        <div className="sidebar__subicon" />
      </div>
      <div
        className={`sidebar__dropdown ${dropDown}`}
        style={{ height: `${DropDownHeight}px` }}
      >
        <ul className="sidebar__sublist" ref={ref}>
          {subMenuItemJSX}
        </ul>
      </div>
    </>
  );
};
SubMenu.propTypes = {
  submenus: PropTypes.arrayOf(PropTypes.shape(Object)),
  to: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  sidebar: PropTypes.string
};

export default SubMenu;
