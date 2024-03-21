import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';

const useSearch = ({ form, submitFilter }) => {
  const { control } = form;
  const [searchValue, setSearchValue] = useState('');

  useWatch({
    control,
    name: 'search',
    defaultValue: 'all'
  });

  const handleInputChange = useCallback(
    event => {
      setSearchValue(event.target.value);
    },
    [setSearchValue]
  );

  const handleSubmit = event => {
    event.preventDefault();
    form.setValue('search', searchValue);
    submitFilter(searchValue);
  };

  return {
    searchValue,
    handleInputChange,
    handleSubmit
  };
};

useSearch.propTypes = {
  form: PropTypes.node,
  submitFilter: PropTypes.func
};

export default useSearch;
