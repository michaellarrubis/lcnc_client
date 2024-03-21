import { useState, useCallback } from 'react';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

import { getLowerCasedValue, setOverflowStyle } from '@baseUtils';

const useBasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(null);

  const handleBulkDeleteModal = useCallback(
    modal => {
      setShowBulkDeleteModal(modal);
      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowBulkDeleteModal]
  );

  const pushQuery = (params, localStorageName) => {
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
    localStorage.setItem(localStorageName, searchParams);
  };

  return {
    showBulkDeleteModal,
    handleBulkDeleteModal,
    pushQuery
  };
};

export default useBasePage;
