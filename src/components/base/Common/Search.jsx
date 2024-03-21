import React from 'react';

const Search = () => {
  return (
    <form className="search">
      <input className="search__input" type="text" placeholder="Search" />
      <button className="search__button" type="submit">
        <img src="/icons/search-icon.svg" alt="" />
      </button>
    </form>
  );
};

export default Search;
