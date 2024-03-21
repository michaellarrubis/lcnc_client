import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {
  createUserGroupService,
  updateUserGroupService,
  getUserGroupByIdService,
  getUserGroupsService
} from 'src/api/modules/base/userGroups';
import { getUserGroupList } from '@baseStores/userGroups/userGroupActions';

import { getAllUsersList } from '@baseStores/users/userActions';
import { getAllMenus } from '@baseStores/menus/menuActions';
import { toast } from 'react-toastify';
import { CgCheckO } from 'react-icons/cg';

const useAddEditModal = ({ handleModal, id }) => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.user.users);
  const menuList = useSelector(state => state.menu?.menus);
  const userRef = useRef(null);
  const menuRef = useRef(null);
  const [isDropdownDisplayed, setDropdownDisplayed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [groupForm, setGroupForm] = useState({
    id: null,
    name: '',
    status: 'A',
    users: [],
    menus: []
  });

  const initialDummyData = {
    name: 'Test Group',
    status: 'A',
    users: [],
    menus: []
  };

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

  const getLowerCasedValue = value =>
    typeof value === 'string' ? value.toLowerCase() : value;

  const users = useMemo(() => {
    return groupForm.users;
  }, [groupForm]);

  const menus = useMemo(() => {
    return groupForm.menus;
  }, [groupForm]);

  const handSelectChange = value => {
    setGroupForm(prevState => ({
      ...prevState,
      status: value
    }));
  };

  useEffect(() => {
    dispatch(getAllUsersList());
    dispatch(getAllMenus());
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

  function handleChange(
    e,
    names,
    values,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    isSubmitting
  ) {
    if (!names && !values) {
      const {
        target: { name, value }
      } = e;

      const initialValue = value.match(/^\s/) !== null;

      if (name === 'name' && initialValue) {
        setGroupForm(prevState => ({
          ...prevState,
          [name]: value.trim()
        }));
      } else {
        setGroupForm(prevState => ({
          ...prevState,
          [name]: value
        }));
      }

      if (name === 'name') {
        setFieldValue('name', value);
        setFieldTouched('name', true);
        setFieldError('name', '');
      }
    } else {
      setGroupForm(prevState => ({
        ...prevState,
        [names]: values
      }));
    }
  }

  function handleMenu(menuId, optionName) {
    const newMenu = groupForm?.menus.map(menu => {
      const updateMenu = { ...menu };
      if (updateMenu.id === menuId) {
        updateMenu.user_group_access[optionName] =
          !updateMenu.user_group_access[optionName];
      }

      return updateMenu;
    });
    handleChange(null, optionName, newMenu);
  }

  function handleSearchUser(e, setFieldValue, setFieldTouched, setFieldError) {
    let foundUser = [];
    const {
      target: { name, value }
    } = e;
    if (value.length) {
      foundUser = userList.filter(
        data =>
          `${getLowerCasedValue(data.first_name)} ${getLowerCasedValue(
            data.last_name
          )}`.includes(getLowerCasedValue(e.target.value)) ||
          `${getLowerCasedValue(data.last_name)} ${getLowerCasedValue(
            data.first_name
          )}`.includes(getLowerCasedValue(e.target.value)) ||
          `${getLowerCasedValue(data.last_name)} ${getLowerCasedValue(
            data.suffix
          )} ${getLowerCasedValue(data.first_name)}`.includes(
            getLowerCasedValue(e.target.value)
          ) ||
          `${getLowerCasedValue(data.last_name)} ${getLowerCasedValue(
            data.first_name
          )} ${getLowerCasedValue(data.suffix)}`.includes(
            getLowerCasedValue(e.target.value)
          )
      );
    }
    setSearchUser(foundUser);
    setFieldValue('members', value);
    setFieldTouched('members', true);
    setFieldError('members', '');
  }

  function handleSearchMenu(e, setFieldValue, setFieldTouched, setFieldError) {
    let foundMenu = [];
    const {
      target: { name, value }
    } = e;
    if (value.length) {
      foundMenu = menuList.filter(data =>
        `${getLowerCasedValue(data.code)} - ${getLowerCasedValue(
          data.name
        )}`.includes(getLowerCasedValue(e.target.value))
      );
    }
    setSearchMenu(foundMenu);
    setFieldValue('access_menus', value);
    setFieldTouched('access_menus', true);
    setFieldError('access_menus', '');
  }

  function handleAddMember(
    user,
    setFieldValue,
    setFieldTouched,
    setFieldError
  ) {
    const dataFind = groupForm?.users.some(data => data.id === user.id);
    if (dataFind) {
      setSearchUser([]);
      return;
    }
    if (!id) setIsEdit(true);
    setFieldValue('members', user.first_name);
    setFieldTouched('members', true);
    setFieldError('members', '');
    const userInfo = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      suffix: user.suffix,
      cost_center_code: user.cost_center_code,
      cost_center_tree: user.cost_center_tree,
      user_group_detail: {}
    };

    handleChange(null, 'users', [userInfo, ...groupForm.users]);
    setSearchUser([]);
    userRef.current.value = null;
  }

  const handleDeleteMember = userID => {
    const filteredArray = groupForm?.users.filter(data => data.id !== userID);
    handleChange(null, 'users', filteredArray);
  };

  function handleAddMenu(menu, setFieldValue, setFieldTouched, setFieldError) {
    const dataFind = groupForm?.menus.some(data => data.id === menu.id);
    if (dataFind) {
      setSearchUser([]);
      return;
    }
    if (!id) setIsEdit(true);
    setFieldValue('access_menu', menu.name);
    setFieldTouched('access_menu', true);
    setFieldError('access_menu', '');
    const menuDetail = {
      id: menu.id,
      code: menu.code,
      name: menu.name,
      type: menu.type,
      can_view: menu.can_view,
      can_add: menu.can_add,
      can_edit: menu.can_edit,
      can_delete: menu.can_delete,
      can_print: menu.can_print,
      can_approve: menu.can_approve,
      can_generate: menu.can_generate,
      status: menu.status,
      user_group_access: {}
    };
    handleChange(null, 'menus', [menuDetail, ...groupForm.menus]);
    setSearchMenu([]);
    menuRef.current.value = null;
  }

  const handleDeleteMenu = menu_code => {
    const filteredArray = groupForm?.menus.filter(
      data => data.code !== menu_code
    );
    handleChange(null, 'menus', filteredArray);
  };

  const fetchNewGroupList = async () => {
    getUserGroupsService(1)
      .then(res => {
        dispatch(getUserGroupList(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  const submitForm = () => {
    const data = {
      group_name: groupForm.name,
      status: groupForm.status,
      menus: [],
      users: []
    };

    groupForm.menus.forEach(gForm => {
      const tempMenu = {
        menu_id: gForm.id,
        can_view: true,
        can_add: gForm.user_group_access.can_add ?? false,
        can_edit: gForm.user_group_access.can_edit ?? false,
        can_delete: gForm.user_group_access.can_delete ?? false,
        can_print: gForm.user_group_access.can_print ?? false,
        can_approve: gForm.user_group_access.can_approve ?? false,
        can_generate: gForm.user_group_access.can_generate ?? false
      };
      data.menus.push(tempMenu);
    });

    groupForm.users.forEach(gForm => {
      const tempUser = {
        user_id: gForm.id
      };
      data.users.push(tempUser);
    });

    if (id) {
      updateUserGroupService(id, data).then(res => {
        fetchNewGroupList();
        if (res.statusCode === 200) {
          toast.success('Successfully Updated!', {
            icon: <CgCheckO />
          });
        }
        if (res?.response?.data?.statusCode === 500) {
          toast.error(res?.response.data.errors.message);
        }
        handleModal(null);
      });
    } else {
      createUserGroupService(data).then(res => {
        fetchNewGroupList();

        if (res?.data.statusCode === 201) {
          toast.success('Successfully Added!', {
            icon: <CgCheckO />
          });
        }
        if (res?.response?.data?.statusCode === 500) {
          toast.error(res?.response.data.errors.message);
        }
        handleModal(null);
      });
    }
  };

  const handleRadioChange = (
    event,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    name
  ) => {
    const selectedValue = event.target.value;

    setDropdownDisplayed(false);
    setSelectedOption(selectedValue);
    setGroupForm(prevState => ({
      ...prevState,
      [name]: selectedValue
    }));

    setFieldValue(name, selectedValue);
    setFieldTouched(name, true);
    setFieldError(name, '');
  };

  const statusLabel = status => {
    switch (status) {
      case 'A':
        return 'Active';
      case 'C':
        return 'Cancelled';
      default:
        return 'New';
    }
  };

  const blankSpaceRegex = /^\S.*$/;
  const blankSpageMessage =
    'Blank spaces are not allowed at the beginning or end';
  const nameRegex = /^[a-zA-Z .-]+(\.[a-zA-Z .-]+)*$/;
  const nameMessage =
    'Only letters with spaces, hyphens, or periods are allowed';

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(nameRegex, nameMessage)
      .required('Required')
      .max(50, 'Maximum 50 characters allowed'),
    members: Yup.string()
      // .matches(blankSpaceRegex, blankSpageMessage)
      .trim()
      .matches(nameRegex, nameMessage)
      // .required('one member is required')
      .test('members-length', 'At least one member is required', value => {
        if (users.length === 0) {
          return false;
        }
        return true;
      }),
    access_menus: Yup.string()
      .matches(nameRegex, nameMessage)
      // .required('one menu is required')
      // .matches(blankSpaceRegex, blankSpageMessage)
      .trim()
      .test('menu-length', 'At least one menu is required', value => {
        if (menus.length === 0) {
          return false;
        }
        return true;
      })
  });

  const validationEditSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(nameRegex, nameMessage)
      .required('Required')
      .max(50, 'Maximum 50 characters allowed'),
    members: Yup.string()
      // .required('one member is required')
      .matches(nameRegex, nameMessage)
      .trim()
      .test('members-length', 'At least one member is required', value => {
        if (users.length === 0) {
          return false;
        }
        return true;
      }),
    access_menus: Yup.string()
      // .required('one menu is required')
      .matches(nameRegex, nameMessage)
      .trim()
      .test('menu-length', 'At least one menu is required', value => {
        if (menus.length === 0) {
          return false;
        }
        return true;
      })
  });

  let title;
  if (id && isEdit) {
    title = 'Edit';
  } else if (id && !isEdit) {
    title = '';
  } else {
    title = 'Add';
  }
  const modalTitle = `${title} User Access Information`;

  return {
    userRef,
    menuRef,
    groupForm,
    searchUser,
    searchMenu,
    initialDummyData,
    handleChange,
    handleMenu,
    handleSearchMenu,
    handleSearchUser,
    handleAddMenu,
    handSelectChange,
    handleDeleteMenu,
    handleDeleteMember,
    handleAddMember,
    setIsEdit,
    isEdit,
    validationSchema,
    validationEditSchema,
    submitForm,
    modalTitle
  };
};

useAddEditModal.propTypes = {
  id: PropTypes.string,
  handleModal: PropTypes.func
};

export { useAddEditModal };
