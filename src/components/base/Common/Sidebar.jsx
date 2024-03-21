import { useSidebar } from '@baseHooks/Components/Common/useSideBar';
import { menus } from 'src/utils/sidebarMenus';
import PropTypes from 'prop-types';
import SideBarItem from './SidebarItem';

const Sidebar = ({ isSidebarOpen }) => {
  const {
    isFullWidth,
    isHovered,
    setIsHoveredState,
    activeDropDown,
    setActiveDropDown,
    items
  } = useSidebar({
    menuItems: menus,
    isSidebarOpen
  });

  return (
    <aside
      className={`
        flex fixed left-0 z-40 top-[60px] h-screen w-[250px] min-w-[250px] max-w-[250px] transition-all duration-900 ease-out bg-gray-400 text-white
        ${!isFullWidth && 'w-[50px] min-w-[50px] max-w-[50px]'}
        ${!isSidebarOpen && isHovered && 'shadow-[6px_0px_8px_#00000033]'}
      `}
      onMouseEnter={() => setIsHoveredState(true)}
      onMouseLeave={() => setIsHoveredState(false)}
    >
      <ul className="w-full">
        {items.map((item, menuIndex) => (
          <SideBarItem
            key={item.name}
            item={item}
            menuIndex={menuIndex}
            isFullWidth={isFullWidth}
            activeDropDown={activeDropDown}
            setActiveDropDown={setActiveDropDown}
          />
        ))}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool
};

export default Sidebar;
