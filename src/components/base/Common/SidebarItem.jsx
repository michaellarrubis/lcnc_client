import { Link } from 'react-router-dom';
import { useSidebarItem } from '@baseHooks/Components/Common/useSideBarItem';
import PropTypes from 'prop-types';

const SideBarItem = ({
  item,
  menuIndex,
  isFullWidth = true,
  isSubMenu = false,
  activeDropDown,
  setActiveDropDown
}) => {
  const { ref, isOpen } = useSidebarItem({
    item,
    menuIndex,
    activeDropDown
  });

  return (
    <li
      className="relative select-none text-center whitespace-nowrap text-[14px]"
      key={item.name}
    >
      {item.submenus ? (
        <>
          <div
            className={`
              flex py-[12.5px] transition-all duration-300 ease-in-out cursor-pointer flex items-center min-h-[46px] max-h-[46px] hover:bg-gray-300
              ${isOpen && isFullWidth && 'bg-gray-300'}
            `}
            onClick={() => {
              setActiveDropDown(
                (activeDropDown === undefined && item.isActive) ||
                  menuIndex === activeDropDown
                  ? null
                  : menuIndex
              );
            }}
            aria-hidden="true"
          >
            <img
              className="h-[16.5px] w-auto items-center absolute left-[19px]"
              src={item.icon}
              alt=""
            />

            {isFullWidth && (
              <>
                <p className="ml-[43px] max-w-[175px] overflow-hidden text-white">
                  {item.name}
                </p>
                <img
                  className={`
                    absolute right-[20px] top-[20px] -rotate-90
                    ${isOpen && '!rotate-0'}
                  `}
                  src="icons/arrow-down.svg"
                  alt=""
                />
              </>
            )}
          </div>
          {isFullWidth && (
            <div
              className={`
                relative overflow-hidden h-0 transition-all duration-300 ease-in-out
                ${isFullWidth && 'w-auto'}
                ${isOpen && '!h-auto'}
              `}
            >
              <ul className={`block ${!isFullWidth && '!ml-0'}`} ref={ref}>
                {item.submenu?.map(submenu => (
                  <SideBarItem
                    key={submenu.code}
                    item={submenu}
                    isFullWidth={isFullWidth}
                    isSubMenu
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link className="" to={item.path}>
          <div
            className={`
              flex py-[12.5px] cursor-pointer flex items-center min-h-[46px] max-h-[46px]
              ${
                isSubMenu
                  ? 'hover:text-white bg-gray-200 !duration-100 text-gray-100 px-0'
                  : 'hover:bg-gray-300 text-white'
              }
              ${item.isActive && isSubMenu && 'text-white'}
              ${item.isActive && !isSubMenu && '!bg-gray-300'}
              ${!isFullWidth && 'px-[19px]'}
            `}
          >
            <img
              className="h-[16.5px] w-auto items-center absolute left-[19px]"
              src={item.icon}
              alt=""
            />
            {isFullWidth && (
              <p
                className={`
                  ml-[43px] max-w-[175px] overflow-hidden
                  ${isSubMenu && '!ml-[19px]'}
                  `}
              >
                {item.name}
              </p>
            )}
          </div>
        </Link>
      )}
    </li>
  );
};

SideBarItem.propTypes = {
  item: PropTypes.shape(Object),
  menuIndex: PropTypes.number,
  isFullWidth: PropTypes.bool,
  isSubMenu: PropTypes.bool,
  activeDropDown: PropTypes.number,
  setActiveDropDown: PropTypes.func
};

export default SideBarItem;
