import React from 'react';
import PropTypes from 'prop-types';
import { useUserAccess } from '@baseHooks/useUserAccess';
import useFilter from '@baseHooks/Components/Common/Filter/useFilter';
import { useSelector } from 'react-redux';
import Button from '../Button';
import 'src/assets/base/css/search-filter.scss';
import Search from './Search';

const Filter = ({
  searchInputPlaceholder = 'Search',
  buttonName,
  buttonLink,
  inputs,
  showSearchBox = true,
  showActionBtn = true,
  buttonOnClick,
  bulkDeleteClick,
  menuCode,
  form,
  isOpen,
  submitFilter
}) => {
  const { access } = useUserAccess(menuCode);
  const { handleFiltersDisplay } = useFilter({ form, submitFilter, isOpen });
  const { ids } = useSelector(state => state.datatable);
  return (
    <div className="search-filter__container">
      <form
        onSubmit={e => {
          e.preventDefault();
          submitFilter();
        }}
      >
        <div className="flex items-end flex-wrap gap-[30px]">
          {showSearchBox ? (
            <div className="flex w-[350px] mr-[45px]">
              <Search
                form={form}
                searchInputPlaceholder={searchInputPlaceholder}
                submitFilter={submitFilter}
              />
            </div>
          ) : null}

          {!!inputs?.length &&
            inputs.map(input => (
              <div
                className={`${
                  input.type === 'date-range' ? 'w-[300px]' : 'w-[255px]'
                }`}
                key={input.name}
              >
                <div
                  className={`search-filter__label relative ${
                    isOpen ? '' : 'z-[1]'
                  }`}
                  htmlFor="inputs"
                >
                  {input.label ? (
                    <span className="block mb-2.5 text-[12px] font-stolzlBook leading-[14px]">
                      {input.label}
                    </span>
                  ) : null}
                  {handleFiltersDisplay(input)}
                </div>
              </div>
            ))}

          <div className="ml-auto">
            {bulkDeleteClick ? (
              <Button
                modifier="bg-[#FFFFFF] border border-solid border-1 text-white p-[10px_14px] text-[12px] leading-unset rounded mr-[10px] hover:bg-gray-700"
                spanModifier="before:w-[15px] before:h-[15px] before:absolute before:left-0 before:content-[url('/src/assets/base/icons/trash.svg')]"
                link={buttonLink}
                onClick={bulkDeleteClick}
                disabled={!ids.length || !access.can_delete}
              />
            ) : null}
            {showActionBtn && (
              <Button
                name={`Add ${buttonName}`}
                modifier="bg-gray-400 hover:bg-gray-500 text-white p-[8px_14px] text-[12px] leading-[24px] rounded"
                spanModifier="before:absolute before:left-0 before:content-[url('/src/assets/base/icons/addWhite.svg')]"
                link={buttonLink}
                onClick={buttonOnClick}
                disabled={!access.can_add}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

Filter.propTypes = {
  searchInputPlaceholder: PropTypes.string,
  buttonName: PropTypes.string,
  buttonLink: PropTypes.bool,
  inputs: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  showSearchBox: PropTypes.bool,
  showActionBtn: PropTypes.bool,
  buttonOnClick: PropTypes.func,
  bulkDeleteClick: PropTypes.func,
  menuCode: PropTypes.string,
  form: PropTypes.instanceOf(Object).isRequired,
  isOpen: PropTypes.bool,
  submitFilter: PropTypes.func.isRequired
};

export default Filter;
