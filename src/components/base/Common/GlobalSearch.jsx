import React from 'react';
import 'src/assets/base/css/globalSearch.scss';

const GlobalSearch = () => {
  return (
    <form className="g-search">
      <button type="button" className="g-search__button">
        <img src="/icons/black-search-icon.svg" alt="" />
      </button>
      <input
        type="search"
        className="g-search__input"
        id="mySearch"
        name="q"
        placeholder="Search"
      />
    </form>
  );
};

export default GlobalSearch;
