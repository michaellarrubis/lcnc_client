import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserMenus } from '@baseStores/userMenus/userMenuActions';

export const useUserAccess = (menuCode = undefined) => {
  const dispatch = useDispatch();
  const apiMenus = useSelector(state => state.userMenu.menus);

  let menus = {};
  if (apiMenus && Object.keys(apiMenus).length > 0) {
    menus =
      apiMenus?.reduce((obj, menu) => {
        const newObj = obj;
        newObj[menu.code] = menu;
        return newObj;
      }, {}) || {};
  }

  useEffect(() => {
    dispatch(getUserMenus());
  }, [dispatch]);

  return {
    menus,
    access: menus[menuCode]?.user_group_access ?? {}
  };
};
