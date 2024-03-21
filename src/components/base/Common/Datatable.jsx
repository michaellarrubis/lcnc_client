import React from 'react';
import PropTypes from 'prop-types';
import { useDatatable } from '@baseHooks/Components/Common/useDatatable';
import { FaFileExport } from 'react-icons/fa';
import Button from './Button';

const Datatable = ({
  datasource,
  headingColumns,
  title = null,
  breakOn = 'medium',
  link,
  keyField = 'id',
  clickableRows,
  openNewTab,
  pageSize = 10,
  isTemplate = false,
  onExport,
  isSelectedValue = false,
  shouldDisplayEditable = false,
  isExport = false,
  handleModal,
  handleViewModal,
  handleDeleteModal,
  handleCreateModal,
  modalName,
  deleteModal,
  createModal,
  actions = [],
  actionLinks,
  shouldEllipsis = false,
  noPadding = false,
  access = {},
  isCostCenter,
  codeField
}) => {
  const {
    columns,
    currentPage,
    tableClass,
    sortColumn,
    selectedIds,
    sorting,
    rowData,
    sortIcon,
    handleCheckAll
  } = useDatatable(
    datasource,
    headingColumns,
    actions,
    modalName,
    deleteModal,
    createModal,
    keyField,
    pageSize,
    isTemplate,
    shouldDisplayEditable,
    isSelectedValue,
    shouldEllipsis,
    noPadding,
    clickableRows,
    link,
    openNewTab,
    breakOn,
    handleModal,
    handleViewModal,
    handleDeleteModal,
    handleCreateModal,
    access,
    isCostCenter,
    codeField,
    actionLinks
  );

  return (
    <div className="w-full mt-[27px]">
      {title ? (
        <div
          className={`sort-table__container-title${isExport ? ' flex' : ''}`}
        >
          {isExport ? (
            <Button
              name="Export Score"
              modifier="button__default dark flex"
              type="button"
              onClick={onExport}
            >
              <FaFileExport />
            </Button>
          ) : null}
        </div>
      ) : null}
      <table className={`mt-5 w-full py-2.5 text-left table ${tableClass}`}>
        <thead>
          <tr>
            {columns?.map(column => {
              const { key, label } = column;
              if (column === 'actions' || column === 'delete-actions') {
                return (
                  <th
                    key={column}
                    data-key={column}
                    className="relative cursor-pointer"
                  />
                );
              }

              if (key === 'id') {
                return (
                  <th
                    key={column}
                    data-key={key}
                    className={`text-[14px] text-[#222222] font-stolzlBold leading-[24px] relative cursor-pointer py-[7px] px-[15px] ${
                      key === 'status' ? 'text-center' : ''
                    }`}
                  >
                    <div className="inline-flex transition-opacity">
                      <label
                        className="custom__checkbox inline-block align-middle text-[0] cursor-pointer"
                        htmlFor="checkAll"
                      >
                        <input
                          type="checkbox"
                          id="checkAll"
                          className="hover:opacity-50"
                          name="checkAll"
                          disabled={!access.can_delete}
                          hidden
                          checked={
                            datasource?.length === selectedIds?.length &&
                            datasource.length !== 0
                          }
                          onChange={handleCheckAll}
                        />
                        <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded-[4px] ease duration-200 relative">
                          <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-md" />
                          <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-md" />
                        </span>
                      </label>
                    </div>
                  </th>
                );
              }

              return (
                <th
                  key={key}
                  data-key={key}
                  onClick={() => sorting(key, currentPage)}
                  className={`text-[14px] text-[#222222] font-stolzlBold leading-[24px] relative cursor-pointer py-[7px] px-[15px] first:pl-[29px] last:pr-[29px] ${
                    key === 'status' ? 'text-center' : ''
                  }`}
                >
                  <div className="inline-flex">
                    {label}
                    {sortIcon(sortColumn, key)}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className="rounded-[4px] border-separate"
          style={{
            boxShadow: '0 0 0 1px #DEDEDE',
            borderRadius: '4px'
          }}
        >
          {rowData()}
        </tbody>
      </table>
    </div>
  );
};

Datatable.propTypes = {
  datasource: PropTypes.instanceOf(Object),
  headingColumns: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  breakOn: PropTypes.string,
  link: PropTypes.string,
  keyField: PropTypes.string,
  clickableRows: PropTypes.bool,
  openNewTab: PropTypes.bool,
  pageSize: PropTypes.number,
  isTemplate: PropTypes.bool,
  onExport: PropTypes.bool,
  isSelectedValue: PropTypes.bool,
  shouldDisplayEditable: PropTypes.bool,
  isExport: PropTypes.bool,
  handleModal: PropTypes.func,
  handleViewModal: PropTypes.func,
  handleDeleteModal: PropTypes.func,
  handleCreateModal: PropTypes.func,
  modalName: PropTypes.string,
  deleteModal: PropTypes.string,
  createModal: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.string),
  actionLinks: PropTypes.shape({}),
  shouldEllipsis: PropTypes.bool,
  noPadding: PropTypes.bool,
  access: PropTypes.instanceOf(Object),
  isCostCenter: PropTypes.bool,
  codeField: PropTypes.string
};

export default Datatable;
