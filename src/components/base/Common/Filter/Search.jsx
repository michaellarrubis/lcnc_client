import React from 'react';
import PropTypes from 'prop-types';
import useSearch from '@baseHooks/Components/Common/Filter/useSearch';

const Search = ({ form, submitFilter, searchInputPlaceholder }) => {
  const { searchValue, handleInputChange, handleSubmit } = useSearch({
    form,
    submitFilter
  });

  return (
    <>
      <input
        name="search"
        className="w-full focus:outline-none focus:border-[#000] bg-white placeholder:text-[12px] text-[12px] h-10 px-[9px] font-stolzlBook mr-2.5 placeholder-[#797979]"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={searchInputPlaceholder}
      />
      <button
        className="bg-white hover:bg-gray-700 border-solid border-[1px] border-[#eaeaea] rounded text-[12px] text-[#232932] font-stolzlBook leading-[17px] h-10 px-[19px]"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </>
  );
};

Search.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  submitFilter: PropTypes.func.isRequired,
  searchInputPlaceholder: PropTypes.string.isRequired
};

export default Search;
