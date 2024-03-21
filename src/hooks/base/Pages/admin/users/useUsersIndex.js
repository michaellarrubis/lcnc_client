/* eslint-disable import/no-unresolved */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

import { STATUS_OPTIONS } from '@baseUtils/constants';
import { getLowerCasedValue, filterData } from '@baseUtils';
import { getAllCostCenterItems } from '@baseStores/costcenter/costcenterActions';
import { getAllUsersService } from 'src/api/modules/base/user';

const useUsersIndex = () => {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.user.dataList);

  const [showModal, setShowModal] = useState(null);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const form = useForm({ defaultValues: undefined });
  const location = useLocation();
  const navigate = useNavigate();

  const filterOptions = [
    {
      value: 'system_admin',
      label: 'System Admin'
    }
  ];

  const inputs = [
    {
      type: 'multiselect',
      options: filterData(STATUS_OPTIONS, 'label', 'value'),
      multiOptions: STATUS_OPTIONS,
      name: 'status',
      label: 'Status'
    },
    {
      type: 'checkbox',
      options: filterData(filterOptions, 'label'),
      name: 'is_system_admin'
    }
  ];

  const userListMemo = useMemo(() => {
    return userList ?? [];
  }, [userList]);

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

  const fetchData = useCallback(async () => {
    try {
      const savedSearchParams = localStorage.getItem(
        'lcnc-users-search-params'
      );
      const savedPageIndex = parseInt(
        localStorage.getItem('lcnc-users-page-no'),
        10
      );

      const params = new URLSearchParams(savedSearchParams);
      const res = await getAllUsersService(savedPageIndex, params);
      const newList =
        savedPageIndex !== 1 ? userList.concat(res.data.items) : res.data.items;
      setUserList(newList);

      if (
        res.data.items.length === 0 ||
        res.data.current_page >= res.data.total_pages
      ) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, getAllUsersService, setUserList, setPage, setHasMore, userList]);

  const handleModal = useCallback(
    (modal, id = null) => {
      setShowModal(modal);
      setUserId(modal ? id : null);
      setIsOpen(!!modal);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [setShowModal, setUserId]
  );

  const handleViewModal = useCallback(
    (modal, id = null) => {
      setShowViewModal(modal);
      setUserId(modal ? id : null);
      setIsOpen(!!modal);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setShowModal, setUserId]
  );

  const handleDeleteModal = useCallback(
    ({ modal, id, first_name, last_name, suffix }) => {
      const name = `${first_name || ''} ${last_name || ''} ${suffix || ''} `;
      setIsOpen(!!modal);
      setShowDeleteModal(modal);
      setUserId(modal ? id : null);
      setUserName(modal ? name : null);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [setShowDeleteModal, setUserId, setUserName]
  );

  const handleBulkDeleteModal = useCallback(
    modal => {
      setShowBulkDeleteModal(modal);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [setShowBulkDeleteModal]
  );

  useEffect(() => {
    dispatch(getAllCostCenterItems());

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
      fetchData();
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
    setHasMore(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, dataList]);

  useEffect(() => {
    localStorage.setItem('lcnc-users-page-no', JSON.stringify(page));
  }, [page]);

  return {
    dataList,
    showModal,
    showViewModal,
    showDeleteModal,
    showBulkDeleteModal,
    userId,
    userName,
    userList,
    userListMemo,
    page,
    hasMore,
    inputs,
    form,
    isOpen,
    submitFilter,
    handleModal,
    handleViewModal,
    handleDeleteModal,
    handleBulkDeleteModal,
    fetchData
  };
};

export default useUsersIndex;
