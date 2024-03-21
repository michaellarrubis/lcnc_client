import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

import { getLowerCasedValue, setOverflowStyle } from '@baseUtils';

import { getAllDepartment } from '@baseStores/departments/departmentsActions';
import { getAllDivision } from '@baseStores/divisions/divisionsActions';
import { getAllSubSection } from '@baseStores/subsections/subsectionsActions';
import { getAllSection } from '@baseStores/sections/sectionsActions';

import { getCostCenterDataItems } from 'src/api/modules/base/costCenter';

const useCostCenterIndex = () => {
  const dispatch = useDispatch();

  const dataList = useSelector(state => state?.costCenter?.costCenterAll.items);
  const [costCenterList, setCostCenterList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [uniqueCode, setuniqueCode] = useState(null);
  const [uniqueCodeName, setUniqueCodeName] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(null);
  const form = useForm({ defaultValues: undefined });
  const location = useLocation();
  const navigate = useNavigate();

  const costCenterColumns = [
    { key: 'id', label: 'ID' },
    { key: 'cost_center_code', label: 'Cost Center' },
    { key: 'division_list', label: 'Division' },
    { key: 'department_list', label: 'Department' },
    { key: 'section_list', label: 'Section' },
    { key: 'sub_section_list', label: 'Sub Section' },
    { key: 'remarks', label: 'Remarks' }
  ];

  const getFields = () => {
    dispatch(getAllDepartment());
    dispatch(getAllDivision());
    dispatch(getAllSection());
    dispatch(getAllSubSection());
  };

  const fetchData = useCallback(async () => {
    try {
      const savedSearchParams = localStorage.getItem(
        'lcnc-cost-center-params'
      );
      const savedPageIndex = parseInt(
        localStorage.getItem('lcnc-users-page-no'),
        10
      );

      let params = '';
      if (savedSearchParams) {
        params = new URLSearchParams(savedSearchParams);
      }
      const res = await getCostCenterDataItems(savedPageIndex, params);
      const newList =
        savedPageIndex !== 1
          ? costCenterList.concat(res.data.items)
          : res.data.items;

      if (newList.length > 0) {
        setCostCenterList(
          newList.map(item => {
            const {
              remarks,
              section_list,
              division_list,
              department_list,
              sub_section_list,
              cost_center_code
            } = item;

            return {
              id: item.id,
              cost_center_code: cost_center_code || '',
              department_list: {
                department_code: department_list
                  ? `${department_list.code} - ${department_list.name}`
                  : ''
              },
              division_list: {
                division_code: division_list
                  ? `${division_list.code} - ${division_list.name}`
                  : ''
              },
              section_list: {
                section_code: section_list
                  ? `${section_list.code} - ${section_list.name}`
                  : ''
              },
              sub_section_list: {
                sub_section_code: sub_section_list
                  ? `${sub_section_list.code} - ${sub_section_list.name}`
                  : ''
              },
              remarks: remarks || ''
            };
          })
        );
      }

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
    getCostCenterDataItems,
    setCostCenterList,
    setPage,
    setHasMore,
    costCenterList
  ]);

  const costCenterListMemo = useMemo(() => {
    return costCenterList ?? [];
  }, [costCenterList]);

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
    localStorage.setItem('lcnc-cost-center-params', searchParams);
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

  const handleDeleteModal = useCallback(
    ({ modal, id, cost_center_code }) => {
      setShowDeleteModal(modal);
      setuniqueCode(modal ? id : null);
      setUniqueCodeName(modal ? cost_center_code : null);
      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowDeleteModal, setuniqueCode, setUniqueCodeName]
  );

  const handleBulkDeleteModal = useCallback(
    modal => {
      setShowBulkDeleteModal(modal);
      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowBulkDeleteModal]
  );

  useEffect(() => {
    getFields();

    const savedSearchParams = localStorage.getItem(
      'lcnc-cost-center-params'
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
      const newLocation = { ...location, search: '' };
      navigate(newLocation);
      form.reset({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    showDeleteModal,
    uniqueCode,
    uniqueCodeName,
    costCenterList,
    page,
    hasMore,
    costCenterColumns,
    form,
    costCenterListMemo,
    submitFilter,
    handleModal,
    handleDeleteModal,
    fetchData,
    handleBulkDeleteModal,
    showBulkDeleteModal
  };
};

export default useCostCenterIndex;
