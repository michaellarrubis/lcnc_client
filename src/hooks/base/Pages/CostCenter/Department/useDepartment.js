import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

import { getAllUsersList } from '@baseStores/users/userActions';
import { getDepartmentsServiceByPage } from 'src/api/modules/base/departments';
import {
  getLowerCasedValue,
  autoCapitalize,
  setOverflowStyle
} from '@baseUtils';

const useDepartment = () => {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.departments.departments.items);
  const [departmentList, setDepartmentList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [uniqueCode, setuniqueCode] = useState(null);
  const [uniqueCodeName, setUniqueCodeName] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(null);
  const form = useForm({ defaultValues: undefined });
  const location = useLocation();
  const navigate = useNavigate();

  const departmentColumns = [
    { key: 'id', label: 'ID' },
    { key: 'department_code', label: 'Department Code' },
    { key: 'name', label: 'Department Name' },
    { key: 'head', label: 'Department Head' }
  ];

  const handleBulkDeleteModal = useCallback(
    modal => {
      setShowBulkDeleteModal(modal);
      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowBulkDeleteModal]
  );

  const fetchData = useCallback(async () => {
    try {
      const savedSearchParams = localStorage.getItem(
        'lcnc-department-params'
      );
      const savedPageIndex = parseInt(
        localStorage.getItem('lcnc-department-page-no'),
        10
      );

      let params = '';
      if (savedSearchParams) {
        params = new URLSearchParams(savedSearchParams);
      }
      const res = await getDepartmentsServiceByPage(savedPageIndex, params);
      const newList =
        savedPageIndex !== 1
          ? departmentList.concat(res.data.items)
          : res.data.items;

      setDepartmentList(
        newList.map(o => {
          return {
            id: o.id,
            department_code: o.code,
            name: autoCapitalize(o.name ?? ''),
            head: autoCapitalize(o.head ?? '')
          };
        })
      );

      if (
        res.data.items.length === 0 ||
        res.data.current_page >= res.data.total_pages
      ) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      toast.error('Error fetching data:');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    getDepartmentsServiceByPage,
    setDepartmentList,
    setPage,
    setHasMore,
    departmentList
  ]);

  const departmentListMemo = useMemo(() => {
    return departmentList ?? [];
  }, [departmentList]);

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
      if (key === 'search') return;
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
    localStorage.setItem('lcnc-department-params', searchParams);
  };

  const submitFilter = form.handleSubmit(params => {
    setPage(1);
    pushQuery(params);
  });

  const handleModal = useCallback(
    (modal, id = null) => {
      setShowModal(modal);
      setuniqueCode(modal ? id : null);

      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowModal, setuniqueCode]
  );

  const handleViewModal = useCallback(
    (modal, id = null) => {
      setShowViewModal(modal);
      setuniqueCode(modal ? id : null);

      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setShowModal, setuniqueCode]
  );

  const handleDeleteModal = useCallback(
    ({ modal, id, department_code }) => {
      setShowDeleteModal(modal);
      setuniqueCode(modal ? id : null);
      setUniqueCodeName(modal ? department_code : null);
      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowDeleteModal, setuniqueCode, setUniqueCodeName]
  );

  useEffect(() => {
    dispatch(getAllUsersList());

    const savedSearchParams = localStorage.getItem(
      'lcnc-department-params'
    );
    const savedPageIndex = localStorage.getItem(
      'lcnc-department-page-no'
    );
    if (savedPageIndex) {
      setPage(1);
      localStorage.setItem('lcnc-department-page-no', JSON.stringify(1));
    }
    if (savedSearchParams) {
      const parsedSearchParams = new URLSearchParams(savedSearchParams);
      localStorage.setItem('lcnc-department-page-no', JSON.stringify(1));
      form.reset(Object.fromEntries(parsedSearchParams));
      pushQuery({});
      fetchData();
    } else {
      // set default status
      form.reset({});
      pushQuery({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
    localStorage.setItem('lcnc-department-page-no', JSON.stringify(1));
    setHasMore(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, dataList]);

  useEffect(() => {
    localStorage.setItem('lcnc-department-page-no', JSON.stringify(page));
  }, [page]);

  return {
    page,
    form,
    hasMore,
    dataList,
    uniqueCode,
    uniqueCodeName,

    fetchData,
    showModal,
    handleModal,
    submitFilter,
    showViewModal,
    showDeleteModal,
    departmentList,
    departmentListMemo,
    departmentColumns,
    handleViewModal,
    handleDeleteModal,
    handleBulkDeleteModal,
    showBulkDeleteModal
  };
};

export default useDepartment;
