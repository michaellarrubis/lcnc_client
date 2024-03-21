import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { getUserGroupByIdService } from 'src/api/modules/base/userGroups';

import { getAllUsersList } from '@baseStores/users/userActions';
import { getMenus } from '@baseStores/menus/menuActions';

const useViewModal = ({ id }) => {
  const dispatch = useDispatch();
  const userRef = useRef(null);
  const menuRef = useRef(null);

  const [groupForm, setGroupForm] = useState({
    id: null,
    name: '',
    status: 'A',
    users: [],
    menus: []
  });

  const [searchUser, setSearchUser] = useState([]);
  const [searchMenu, setSearchMenu] = useState([]);
  const statusOptions = [
    {
      value: 'A',
      label: 'Active'
    },
    {
      value: 'N',
      label: 'New'
    },
    {
      value: 'C',
      label: 'Cancelled'
    }
  ];

  const users = useMemo(() => {
    return groupForm.users;
  }, [groupForm]);

  const menus = useMemo(() => {
    return groupForm.menus;
  }, [groupForm]);

  useEffect(() => {
    dispatch(getAllUsersList());
    dispatch(getMenus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      getUserGroupByIdService(id).then(res => {
        const { ...rest } = res.data;
        setGroupForm(rest);
      });
    } else {
      setGroupForm({
        id: null,
        name: '',
        status: 'A',
        users: [],
        menus: []
      });
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Required')
      .matches(/^\S.*$/, 'Blank spaces are not allowed at the beginning or end')
      .max(50, 'Maximum 50 characters allowed'),

    members: Yup.lazy(() => {
      if (users && users.length === 0) {
        return Yup.string().required('At least one member is required');
      }
      return Yup.string();
    }),
    access_menus: Yup.lazy(() => {
      if (menus && menus.length === 0) {
        return Yup.string().required('At least one menu is required');
      }
      return Yup.string();
    })
  });
  return {
    userRef,
    menuRef,
    groupForm,
    searchUser,
    searchMenu,
    statusOptions,
    validationSchema,
    setSearchUser,
    setSearchMenu
  };
};

useViewModal.propTypes = {
  id: PropTypes.string
};

export { useViewModal };
