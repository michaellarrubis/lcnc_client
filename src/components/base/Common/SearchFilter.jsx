import React, { useEffect, useState } from 'react';
import {
  useLocation,
  useSearchParams,
  useNavigate,
  createSearchParams
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useUserAccess } from '@baseHooks/useUserAccess';
import { formatDate, filterData } from '@baseUtils';

import Button from './Button';
import Datatable from './Datatable';

import 'src/assets/base/css/search-filter.scss';

const SearchFilter = ({
  pathName = null,
  searchInputPlaceholder = 'Search',
  buttonName,
  buttonLink,
  inputs,
  data,
  title,
  columns,
  showSearchBox = true,
  showActionBtn = true,
  clickableRows = true,
  keyField = 'id',
  onExport,
  shouldDisplayEditable = false,
  isExport = false,
  showModal,
  showViewModal,
  handleModal,
  handleViewModal,
  handleDeleteModal,
  handleCreateModal,
  modalName,
  deleteModal,
  createModal,
  buttonOnClick,
  actions,
  shouldEllipsis,
  bulkDeleteClick,
  noPadding,
  menuCode,
  isCostCenter = false,
  codeField
}) => {
  const { access } = useUserAccess(menuCode);
  const location = useLocation();
  const [queryParams] = useSearchParams();
  const queryParamsList = Object.fromEntries([...queryParams]);
  const navigate = useNavigate();
  const { ids } = useSelector(state => state.datatable);
  const [checkedItems, setCheckedItems] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [unfilteredData, setUnfiltereddata] = useState([]);
  const [filters, setFilters] = useState({ search: 'all', searchInput: '' });
  const [queryFilters, setQueryFilters] = useState(
    Object.fromEntries([...queryParams])
  );
  const [isDropdownDisplayed, setDropdownDisplayed] = useState(null);

  const getLowerCasedValue = value =>
    typeof value === 'string' ? value.toLowerCase() : value;

  const onDepthChecker = (filteredList, dataToFilter) => {
    const filterKeys = Object.keys(filteredList);
    return dataToFilter?.filter(item => {
      return filterKeys.every(key => {
        if (!filteredList[key].length) return true;

        if (filteredList[key][0].includes(',')) {
          const splittedFilterValues = filteredList[key][0].split(',');
          return splittedFilterValues.find(value => {
            if (item[key])
              return (
                getLowerCasedValue(value) === getLowerCasedValue(item[key])
              );
            return undefined;
          });
        }

        return filteredList[key].find(value => {
          if (item[key])
            return getLowerCasedValue(value) === getLowerCasedValue(item[key]);
          return undefined;
        });
      });
    });
  };

  const handleFilterData = filterList => {
    if (Object.entries(filterList).length < 1) setFilteredData(data);

    const updatedFilterList = {};
    const searchFilterList = {};
    const queryPage = filterList.page ?? null;
    let hasSearchInput = false;
    let currentFilteredData = null;

    Object.entries(filterList).forEach(([key, value]) => {
      if (key === 'search') {
        hasSearchInput = true;
        columns.forEach(column =>
          Object.assign(searchFilterList, {
            [column.key]: [getLowerCasedValue(value)]
          })
        );

        currentFilteredData = data.filter(dataItem => {
          return Object.entries(searchFilterList).some(
            ([category, searchValue]) =>
              dataItem[category]?.toString().toLowerCase().includes(searchValue)
          );
        });
      }

      if (key !== 'search' && key !== 'searchInput' && key !== 'page') {
        Object.assign(updatedFilterList, {
          [key]: [getLowerCasedValue(value)]
        });
      }
    });

    const dataToFilter = hasSearchInput ? currentFilteredData : data;
    const dataFiltered = onDepthChecker(updatedFilterList, dataToFilter);

    setFilteredData(dataFiltered);
  };

  // check/uncheck multiselect checkbox option list
  function handleSelectAll(e, filterObj) {
    let checkboxList = [];
    if (e.target.checked) {
      checkboxList = filterData(filterObj.options, 1)
        .map(checkboxData => getLowerCasedValue(checkboxData))
        .filter(checkFilterData => checkFilterData !== '');
    }
    setFilters(currentFilters => {
      return {
        ...currentFilters,
        [filterObj.name]: checkboxList.length ? checkboxList.join(',') : 'all'
      };
    });

    setCheckedItems(currentCheckedItems => {
      return {
        ...currentCheckedItems,
        [filterObj.name]: checkboxList.length ? checkboxList : null
      };
    });
  }

  // check if multiselect checkbox is all checked
  function checkSelectAll(filterObj) {
    if (Object.entries(queryParamsList).length > 0) {
      const checkboxList = filterData(filterObj.options, 1)
        .map(checkboxData => getLowerCasedValue(checkboxData))
        .filter(checkFilterData => checkFilterData !== '');
      return (
        checkboxList.length ===
        queryParamsList[filterObj.name]?.split(',').length
      );
    }

    return false;
  }

  // display selected multiselect checkbox filter
  function getSelectedCheckboxFilter(filterObj) {
    if (
      Object.entries(queryParamsList).length > 0 &&
      queryParamsList[filterObj.name]
    ) {
      return filterObj.options
        .filter(
          filteredObj =>
            filteredObj[1] &&
            queryParamsList[filterObj.name]?.includes(
              getLowerCasedValue(filteredObj[1])
            )
        )
        .map(mapData => mapData[0])
        .join(', ');
    }

    return null;
  }

  const searchParamsBuilder = () => {
    const searchParamsObject = { ...queryParamsList };
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'searchInput') return;
      if (value !== 'all')
        Object.assign(searchParamsObject, { [key]: getLowerCasedValue(value) });
      if (value === 'all' || (value === '' && searchParamsObject[key]))
        delete searchParamsObject[key];
    });

    navigate({
      pathname: location.pathname,
      search: createSearchParams(searchParamsObject).toString()
    });
  };

  useEffect(() => {
    if (inputs?.length) {
      const inputFilters = {};
      inputs.forEach(filter =>
        Object.assign(inputFilters, {
          [filter.name]: filter.name === 'status' ? 'a' : 'all'
        })
      );

      setFilters(currentFilters => {
        return { ...currentFilters, ...inputFilters, ...queryParamsList };
      });
    }

    if (Object.entries(queryParamsList).length > 0) {
      if (queryParamsList.search) {
        const searchInput = queryParamsList.search;

        setFilters(currentFilters => {
          return {
            ...currentFilters,
            searchInput: searchInput === 'all' ? '' : searchInput
          };
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFilterData(queryParamsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    searchParamsBuilder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    handleFilterData(queryFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilters]);

  useEffect(() => {
    setQueryFilters(queryParamsList);
    handleFilterData(queryParamsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const onSearchInput = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements[0].value;

    setFilters(currentFilters => {
      return { ...currentFilters, search: inputValue || 'all' };
    });
  };

  const onSelectDropdown = e => {
    inputs.map(input => {
      const fieldType = input.type === 'dropdown' ? 'select' : 'input';
      const fieldValue = document.querySelector(
        `${fieldType}[name='${input.name}']`
      ).value;

      const formattedValue =
        input.type === 'datetime' ? formatDate(fieldValue) : fieldValue;
      setFilters(currentFilters => {
        return {
          ...currentFilters,
          [input.name]:
            fieldValue === 'all' || fieldValue === '' ? 'all' : formattedValue
        };
      });
      return undefined;
    });
  };

  const onSelectCheckbox = event => {
    const isChecked = event.target.checked;
    const checkboxValue = event.target.value;
    const checkboxName = event.target.name;
    const queryParamsValue = queryParamsList[checkboxName];
    const selectedCheckboxField = checkedItems[checkboxName];
    let checkedList =
      selectedCheckboxField ??
      (queryParamsValue ? queryParamsValue.split(',') : []);

    if (isChecked)
      checkedList = [...checkedList, getLowerCasedValue(checkboxValue)];
    if (!isChecked)
      checkedList.splice(
        checkedList.indexOf(getLowerCasedValue(checkboxValue)),
        1
      );

    setFilters(currentFilters => {
      return {
        ...currentFilters,
        [checkboxName]: checkedList.length ? checkedList.join(',') : 'all'
      };
    });

    setCheckedItems(currentCheckedItems => {
      return {
        ...currentCheckedItems,
        [checkboxName]: checkedList.length ? checkedList : null
      };
    });
  };

  const handleFiltersDisplay = input => {
    let selectedValues = null;
    const checkboxOptions = input.options?.map(item => {
      return {
        item,
        isChecked: selectedValues?.includes(getLowerCasedValue(item)) ?? false
      };
    });
    switch (input.type) {
      case 'dropdown': {
        let defaultValue = 'all';
        if (queryParamsList[input.name]) {
          defaultValue = input.options.find(option =>
            getLowerCasedValue(option).includes(queryParamsList[input.name])
          );
        }

        return (
          <select
            className="search-filter__input search-filter__input--select"
            name={input.name}
            onChange={e => onSelectDropdown(e)}
            value={defaultValue}
          >
            <option value="all">All</option>
            {input.options?.map((option, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <option value={option} key={i}>
                {option}
              </option>
            ))}
          </select>
        );
      }
      case 'checkbox': {
        if (queryParamsList[input.name])
          selectedValues = queryParamsList[input.name].split(',');

        return (
          <div className="flex gap-[15px_28px]">
            {checkboxOptions?.map((option, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="mb-2.5">
                <label
                  className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
                  htmlFor={input.name}
                >
                  <input
                    checked={option.isChecked}
                    type="checkbox"
                    name={input.name}
                    id={input.name}
                    value={option.item}
                    hidden
                    onChange={onSelectCheckbox}
                  />
                  <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded-default ease duration-200 relative">
                    <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-default" />
                    <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-default" />
                  </span>
                  <i className="inline-block align-middle cursor-pointer ml-[11px] -mt-[1px] not-italic text-[12px] text-[#222222] font-normal leading-[14px] font-stolzlBook">
                    {option.item}
                  </i>
                </label>
              </div>
            ))}
          </div>
        );
      }
      case 'multiselect': {
        let selectedValues2 = null;

        if (queryParamsList[input.name]) {
          selectedValues2 = queryParamsList[input.name].split(',');
        }

        const multiOptions = input.options?.map(item => {
          return {
            item,
            isChecked:
              selectedValues2?.includes(getLowerCasedValue(item[1])) ?? false
          };
        });

        return (
          <>
            <button
              type="button"
              className={`w-[255px] h-10 p-[10px_30px_10px_10px] flex items-center ${
                isDropdownDisplayed ? 'border-black' : 'border-[#DEDEDE]'
              } text-[#222222] bg-white border rounded-default capitalize bg-no-repeat bg-[center_right_18px] bg-[url('/src/assets/base/icons/dropdown.svg')]`}
              onClick={() =>
                setDropdownDisplayed(prevState =>
                  prevState === input.name ? null : input.name
                )
              }
            >
              <span className="overflow-hidden text-overflow-ellipsis line-clamp-1 text-left">
                {getSelectedCheckboxFilter(input) ?? input.name}
              </span>
            </button>
            {isDropdownDisplayed === input.name && (
              <div
                style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)' }}
                className="w-[255px] bg-white rounded-default p-5 absolute grid grid-cols-2 z-10 gap-[20px_3px]"
              >
                {multiOptions.map((option, key) => {
                  if (!option.item[1]) {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={key}>
                        <label
                          className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
                          htmlFor={input.name + key}
                        >
                          <input
                            type="checkbox"
                            name={input.name}
                            value=""
                            id={input.name + key}
                            checked={checkSelectAll(input)}
                            onChange={e => handleSelectAll(e, input)}
                            hidden
                          />
                          <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded-default ease duration-200 relative">
                            <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-default" />
                            <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-default" />
                          </span>
                          <i className="inline-block align-middle cursor-pointer ml-2.5 -mt-[1px] not-italic text-[12px] text-[#222222] font-normal leading-[14px] font-stolzlBook">
                            {option.item[0]}
                          </i>
                        </label>
                      </div>
                    );
                  }

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={key}>
                      <label
                        className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
                        htmlFor={input.name + key}
                      >
                        <input
                          type="checkbox"
                          checked={option.isChecked}
                          name={input.name}
                          id={input.name + key}
                          value={getLowerCasedValue(option.item[1])}
                          hidden
                          onChange={onSelectCheckbox}
                        />
                        <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded-default ease duration-200 relative">
                          <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-default" />
                          <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-default" />
                        </span>
                        <i className="inline-block align-middle cursor-pointer ml-2.5 -mt-[1px] not-italic text-[12px] text-[#222222] font-normal leading-[14px] font-stolzlBook">
                          {option.item[0]}
                        </i>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );
      }
      default: {
        let value = queryParamsList[input.name] ?? '';
        if (value) {
          const splittedDate = value.split('/');
          value = `${splittedDate[2]}-${splittedDate[0]}-${splittedDate[1]}`;
        }
        return (
          <input
            className="search-filter__input search-filter__input--date"
            name={input.name}
            value={value}
            type="date"
            onChange={e => onSelectDropdown(e)}
          />
        );
      }
    }
  };

  return (
    <div className="search-filter__container">
      <div className="flex items-end justify-between flex-wrap gap-[30px] mb-[20px]">
        {showSearchBox ? (
          <div className="w-[350px] mr-[45px]">
            <form
              className="search"
              id="search-filter__button"
              onSubmit={e => onSearchInput(e)}
            >
              <input
                name="search"
                className="block w-full bg-white focus:outline-none focus:border-[#000] border-solid border-[1px] border-[#eaeaea] rounded-default text-[12px] placeholder:text-[12px] placeholder:font-stolzlBook text-[#232932] font-normal leading-[17px] h-10 px-[9px] mr-2.5 placeholder-[#797979]"
                type="text"
                defaultValue={filters.searchInput}
                placeholder={searchInputPlaceholder}
              />
              <button
                className="bg-white hover:bg-gray-700 border-solid border-[1px] border-[#eaeaea] rounded-default text-[12px] text-[#232932] font-normal leading-[17px] h-10 px-[19px]"
                type="submit"
              >
                {/* <img src="/icons/search-icon.svg" alt="" /> */}
                Search
              </button>
            </form>
          </div>
        ) : null}
        <div className="flex">
          <Button
            modifier="bg-[#FFFFFF] border border-solid border-1 text-white p-[10px_14px] text-[12px] leading-unset rounded mr-[9px] hover:bg-gray-700"
            spanModifier="before:w-[15px] before:h-[15px] before:absolute before:left-0 before:content-[url('/src/assets/base/icons/trash.svg')]"
            link={buttonLink}
            onClick={bulkDeleteClick}
            disabled={!ids.length && access.can_delete}
          />
          {showActionBtn ? (
            <div className="">
              <Button
                name={`Add ${buttonName}`}
                modifier={`text-white p-[8px_14px] text-[12px] leading-[24px] rounded ${
                  !access.can_add
                    ? 'bg-gray-400/20'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
                spanModifier="before:absolute before:left-0 before:content-[url('/src/assets/base/icons/addWhite.svg')]"
                link={buttonLink}
                onClick={buttonOnClick}
                disabled={!access.can_add}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex items-end flex-wrap gap-[9px]">
        {!!inputs?.length &&
          inputs.map((input, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="w-[255px]" key={i}>
              <div
                className={`search-filter__label search-filter__label-${input.name}`}
                htmlFor="inputs"
              >
                {input.label && (
                  <span className="search-filter__label-text block mb-2.5 text-[12px] text-[#414141] font-normal leading-[14px] capitalize">
                    {input.label}
                  </span>
                )}
                {handleFiltersDisplay(input)}
              </div>
            </div>
          ))}
      </div>

      <div className="search-filter__content">
        <div className="search-filter__table">
          <Datatable
            shouldDisplayEditable={shouldDisplayEditable}
            datasource={filteredData}
            rawDataSource={unfilteredData}
            clickableRows={clickableRows}
            link={pathName !== null ? pathName : location.pathname}
            keyField={keyField}
            headingColumns={columns}
            title={title}
            actions={actions}
            onExport={onExport}
            isExport={isExport}
            showModal={showModal}
            showViewModal={showViewModal}
            handleModal={handleModal}
            handleViewModal={handleViewModal}
            handleDeleteModal={handleDeleteModal}
            handleCreateModal={handleCreateModal}
            modalName={modalName}
            deleteModal={deleteModal}
            createModal={createModal}
            shouldEllipsis={shouldEllipsis}
            noPadding={noPadding}
            access={access}
            isCostCenter={isCostCenter}
            codeField={codeField}
          />
        </div>
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  pathName: PropTypes.string,
  searchInputPlaceholder: PropTypes.string,
  buttonName: PropTypes.string,
  buttonLink: PropTypes.bool,
  inputs: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  data: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  showSearchBox: PropTypes.bool,
  showActionBtn: PropTypes.bool,
  clickableRows: PropTypes.bool,
  keyField: PropTypes.string,
  onExport: PropTypes.func,
  shouldDisplayEditable: PropTypes.bool,
  isExport: PropTypes.bool,
  showModal: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.string
  ]),
  showViewModal: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.string
  ]),
  handleModal: PropTypes.func,
  handleViewModal: PropTypes.func,
  handleDeleteModal: PropTypes.func,
  handleCreateModal: PropTypes.func,
  modalName: PropTypes.string,
  deleteModal: PropTypes.string,
  createModal: PropTypes.string,
  buttonOnClick: PropTypes.func,
  actions: PropTypes.arrayOf(String),
  bulkDeleteClick: PropTypes.func,
  shouldEllipsis: PropTypes.bool,
  noPadding: PropTypes.bool,
  menuCode: PropTypes.string,
  isCostCenter: PropTypes.bool,
  codeField: PropTypes.string
};

export default SearchFilter;
