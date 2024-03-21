import { useRef } from 'react';
import PropTypes from 'prop-types';

const useSidebarItem = ({ item, menuIndex, activeDropDown }) => {
  const ref = useRef(null);
  const isOpen =
    menuIndex === activeDropDown ||
    (activeDropDown === undefined && item.isActive);

  return {
    ref,
    isOpen
  };
};

useSidebarItem.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.shape({
      isActive: PropTypes.bool
    })
  ),
  menuIndex: PropTypes.number,
  activeDropDown: PropTypes.number
};

export { useSidebarItem };
