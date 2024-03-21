import PropTypes from 'prop-types';
import { getUserMenusServiceByMenuCode } from 'src/api/modules/base/userMenus';
import { useEffect, useState } from 'react';
import { getCustomMenuCode } from 'src/utils/base';

const PrivateRoute = ({ element }) => {
  const [menuComponent, setMenuComponent] = useState(null);

  useEffect(() => {
    if (element.props.menuCode) {
      const menuCode = getCustomMenuCode(element?.props?.menuCode || '');
      getUserMenusServiceByMenuCode(menuCode).then(res => {
        if (
          res?.response?.data.statusCode === 401 ||
          res.data[0] === undefined ||
          res?.data[0]?.user_group_access.can_view === false
        ) {
          window.location.href = '/access-denied';
        } else {
          setMenuComponent(element);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element.props.menuCode]);

  return menuComponent;
};

PrivateRoute.propTypes = {
  element: PropTypes.node
};

export default PrivateRoute;
