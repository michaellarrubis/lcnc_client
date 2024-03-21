import { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserGroupsService } from 'src/api/modules/base/userGroups';
import { STATUS_OPTIONS } from '@baseUtils/constants/selectInputOptions';
import { filterData, getLowerCasedValue, autoCapitalize } from '@baseUtils';
import { useForm } from 'react-hook-form';

const useUserGroup = () => {
  const groups = useSelector(state => state.userGroup.groups);

  const [showModal, setShowModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [page, setPage] = useState(1);
  const form = useForm({ defaultValues: undefined });
  const location = useLocation();
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const loggedUser = useSelector(state => state?.user?.user?.user);

  const userColumns = [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'name',
      label: 'Group'
    },
    {
      key: 'userNames',
      label: 'Members'
    },
    {
      key: 'menuCodes',
      label: 'Menu'
    },
    {
      key: 'status',
      label: 'Status'
    }
  ];

  const inputs = [
    {
      type: 'multiselect',
      options: filterData(STATUS_OPTIONS, 'label', 'value'),
      multiOptions: STATUS_OPTIONS,
      name: 'status',
      label: 'Status'
    }
  ];
  const joinGroup = {};
  const groupListMemo = useMemo(() => {
    return groupList?.map(group => {
      const GROUP_NAME = autoCapitalize(group?.name);
      const menu = group.menus.map(data => {
        return data.code;
      });
      const user = group.users.map(data => {
        const FIRST_NAME = autoCapitalize(data?.first_name);
        const LAST_NAME = autoCapitalize(data?.last_name);
        const SUFFIX = data.suffix ? autoCapitalize(data.suffix) : '';
        if (!loggedUser.is_system_admin) {
          if (data.id === loggedUser.id) {
            joinGroup[group.id] = group;
          }
        }

        return `${FIRST_NAME} ${LAST_NAME} ${SUFFIX}`;
      });

      // eslint-disable-next-line no-param-reassign
      group.menuCodes = menu.join(', ');
      // eslint-disable-next-line no-param-reassign
      group.userNames = user.join(', ');
      // eslint-disable-next-line no-param-reassign
      group.name = GROUP_NAME;

      return group;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupList, joinGroup]);

  const pushQuery = params => {
    const searchParamsObject = { ...params };
    delete searchParamsObject.page;

    if (params.search === '') {
      delete searchParamsObject.search;
    }

    if (params.status === '') {
      delete searchParamsObject.status;
    }

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'search' || key === 'status') return;
      if (value !== 'all') {
        Object.assign(searchParamsObject, { [key]: getLowerCasedValue(value) });
      }
      if (value === 'all' || (value === '' && searchParamsObject[key])) {
        delete searchParamsObject[key];
      }
    });

    const searchParams = createSearchParams(searchParamsObject).toString();
    navigate({
      pathname: location.pathname,
      search: searchParams
    });

    // Save search params in localStorage
    localStorage.setItem('lcnc-users-search-params', searchParams);
  };

  const submitFilter = form.handleSubmit(params => {
    setPage(1);
    pushQuery(params);
  });

  const handleModal = useCallback(
    (modal, id = null) => {
      setShowModal(modal);
      setGroupId(modal ? id : null);
      setIsOpen(!!modal);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [setShowModal, setGroupId]
  );

  const handleBulkDeleteModal = useCallback(
    modal => {
      setShowBulkDeleteModal(modal);
      setIsOpen(!!modal);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [setShowBulkDeleteModal]
  );

  const handleDeleteModal = useCallback(
    ({ modal, id, name }) => {
      setShowDeleteModal(modal);
      setGroupId(modal ? id : null);
      setGroupName(modal ? name : null);
      setIsOpen(!!modal);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [setShowDeleteModal, setGroupId, setGroupName]
  );

  const handleViewModal = useCallback(
    (modal, id = null) => {
      setShowViewModal(modal);
      setGroupId(modal ? id : null);
      setIsOpen(!!modal);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [setShowViewModal, setGroupId]
  );

  const fetchGroupData = useCallback(async () => {
    try {
      const savedSearchParams = localStorage.getItem(
        'lcnc-users-search-params'
      );
      const savedPageIndex = parseInt(
        localStorage.getItem('lcnc-users-page-no'),
        10
      );
      const params = new URLSearchParams(savedSearchParams);
      getUserGroupsService(savedPageIndex, params)
        .then(res => {
          const newList =
            savedPageIndex !== 1
              ? groupList.concat(res.data.items)
              : res.data.items;
          setGroupList(newList);
          if (
            res.data.items.length === 0 ||
            res.data.current_page >= res.data.total_pages
          ) {
            setHasMore(false);
          } else {
            setPage(prevPage => prevPage + 1);
          }
        })
        .catch(err => {
          return err;
        });
    } catch (error) {
      toast.error('Error fetching data:');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    getUserGroupsService,
    setGroupList,
    setPage,
    setHasMore,
    groupList
  ]);

  useEffect(() => {
    const savedSearchParams = localStorage.getItem(
      'lcnc-users-search-params'
    );
    const savedPageIndex = localStorage.getItem('lcnc-users-page-no');
    if (savedPageIndex) {
      setPage(parseInt(savedPageIndex, 10));
    }
    if (savedSearchParams) {
      const parsedSearchParams = new URLSearchParams(savedSearchParams);
      localStorage.setItem('lcnc-users-page-no', JSON.stringify(1));
      form.reset(Object.fromEntries(parsedSearchParams));
      fetchGroupData();
    } else {
      // set default status
      form.reset({ status: 'A' });
      pushQuery({ status: 'A' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!location.search && form.getValues('status')) {
      form.reset({ status: 'A' });
      pushQuery({ status: 'A' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setPage(1);
    localStorage.setItem('lcnc-users-page-no', JSON.stringify(1));
    fetchGroupData();
    setHasMore(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, groups]);

  useEffect(() => {
    localStorage.setItem('lcnc-users-page-no', JSON.stringify(page));
  }, [page]);

  return {
    groupListMemo,
    showModal,
    showDeleteModal,
    showViewModal,
    showBulkDeleteModal,
    groupId,
    groupName,
    userColumns,
    inputs,
    hasMore,
    form,
    joinGroup,
    isOpen,
    submitFilter,
    handleModal,
    handleDeleteModal,
    handleViewModal,
    handleBulkDeleteModal,
    fetchGroupData
  };
};

export default useUserGroup;
