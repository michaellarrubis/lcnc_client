import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useUserAccess } from '@baseHooks/useUserAccess';

const useSidebar = ({ menuItems = [], isSidebarOpen }) => {
  const { menus } = useUserAccess();
  const pageNameSplit = useLocation().pathname.split('/');
  const pageName = pageNameSplit?.slice(-1)[0];
  const [isHovered, setIsHoveredState] = useState(false);
  const isFullWidth = isSidebarOpen || (!isSidebarOpen && isHovered);
  const [activeDropDown, setActiveDropDown] = useState(undefined);

  const filterMenuItem = list => {
    return list?.filter(menuItem => {
      const item = menuItem;
      const menu = menus[item.code];

      if (item.submenu?.length > 0) {
        item.submenus = filterMenuItem(item.submenu);
        item.isActive =
          pageName === item.path.substring(item.path.lastIndexOf('/') + 1) ||
          !!item.submenus?.find(i => i.isActive);

        return (
          item.submenus?.length ||
          (menu && menu.status === 'A' && menu.user_group_access?.can_view)
        );
      }

      item.submenus = null;
      item.isActive =
        pageName === item.path.substring(item.path.lastIndexOf('/') + 1) ||
        !!item.submenus?.find(i => i.isActive);

      return (
        item ||
        (menu && menu.status === 'A' && menu.user_group_access?.can_view)
      );
    });
  };

  const items = (menuItems?.length && filterMenuItem(menuItems)) || [];

  return {
    isFullWidth,
    isHovered,
    setIsHoveredState,
    activeDropDown,
    setActiveDropDown,
    items
  };
};

useSidebar.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.string),
  isSidebarOpen: PropTypes.bool
};

export { useSidebar };
