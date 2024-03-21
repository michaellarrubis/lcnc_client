import _ from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback, Fragment } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import defaultPicture from 'src/assets/base/icons/defaultProfile2.png';
import { dateFormat } from '@baseUtils';
import Input from '@baseComponents/Common/Input';
import SortingArrows from '@baseComponents/Common/SortingArrows';
import { setIdSelection } from '@baseStores/datatable/datatableActions';

const useDatatable = (
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
  actionLinks,
  isEditing
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const queryParamsList = Object.fromEntries([...queryParams]);
  const [columns, setColumns] = useState(headingColumns);
  const [editing, setEditing] = useState({ state: false, row: null });
  const [selectedRow, setSelectedRow] = useState(null);
  const [multipleSelectedItems, setMultipleSelectedItems] = useState([]);
  const [multiSelectLabel, setMultiSelectLabel] = useState('');
  const [data, setData] = useState();
  const [paginationKey, setPaginationKey] = useState(1);
  const [order, setOrder] = useState('ASC');
  const [sortColumn, setSortColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState();
  const pageCount = data ? Math.ceil(data.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);
  const [isCurrentValue, setIsCurrentValue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const location = useLocation();

  let tableClass = 'text-sm';
  const statusClass = '';
  const status = '';

  switch (breakOn) {
    case 'small':
      tableClass += ' text-sm ';
      break;
    case 'medium':
      tableClass += 'text-base ';
      break;
    default:
      tableClass += 'text-lg ';
      break;
  }

  function setOnLoadColumns() {
    if (actions.length) {
      setColumns([...columns, 'actions']);
    }
  }

  useEffect(() => {
    setOnLoadColumns();
    const searchParamsObject = { ...queryParamsList };

    if (searchParamsObject.page) {
      setCurrentPage(Number(searchParamsObject.page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedIds([]);
  }, [location.search]);

  useEffect(() => {
    setPaginationKey(paginationKey + 1);
    setData(datasource);
    setPaginatedData(_(data).slice(0).take(pageSize).value());

    if (!!datasource?.length || datasource?.length === 0) setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasource]);

  useEffect(() => {
    dispatch(setIdSelection(selectedIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  if (actions.length) {
    datasource?.map(cell => {
      const actionItems = actions.map((action, i) => {
        // view action
        if (action === 'view') {
          return (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              type="button"
              className={`${tableClass} font-stolzlBook capitalize border-solid border-r-[1px] border-[#232932] pr-1.5 mr-1.5  last:pr-0 last:border-r-0 last:mr-0 ${
                !access.can_view ? '!text-disabled' : ''
              }`}
              onClick={() => {
                if (actionLinks) {
                  navigate(`${actionLinks.view}/${cell.id}`);
                } else {
                  handleViewModal(
                    modalName,
                    isCostCenter ? cell[codeField] : cell.id
                  );
                }
              }}
              disabled={!access.can_view}
            >
              {action}
            </button>
          );
        }
        // edit action
        if (action === 'edit') {
          return (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              type="button"
              className={`${tableClass} font-stolzlBook capitalize border-solid border-r-[1px] border-[#232932] pr-1.5 mr-1.5  last:pr-0 last:border-r-0 last:mr-0 ${
                !access.can_edit ? '!text-disabled' : ''
              }`}
              onClick={() => {
                if (modalName) {
                  handleModal(
                    modalName,
                    isCostCenter ? cell[codeField] : cell.id
                  );
                }
              }}
              disabled={!access.can_edit}
            >
              {action}
            </button>
          );
        }
        // delete action
        if (action === 'delete') {
          return (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              type="button"
              className={`${tableClass} font-stolzlBook capitalize border-solid border-r-[1px] border-[#232932] pr-1.5 mr-1.5 last:pr-0 last:border-r-0 last:mr-0 text-[#E56367] hover:text-opacity-50 ${
                !access.can_delete ? '!text-disabled' : ''
              }`}
              onClick={() => {
                if (deleteModal) {
                  handleDeleteModal({
                    modal: deleteModal,
                    id: isCostCenter ? cell[codeField] : cell.id,
                    first_name: cell.first_name || null,
                    last_name: cell.last_name || null,
                    suffix: cell.suffix || null,
                    name: cell.name || null
                  });
                }
              }}
              disabled={!access.can_delete}
            >
              {action}
            </button>
          );
        }
        return undefined;
      });

      // eslint-disable-next-line no-param-reassign, react/jsx-no-useless-fragment
      cell.actions = <>{actionItems}</>;
      return cell;
    });
  }

  const pagination = (pageNumber, source) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedPost = _(source).slice(startIndex).take(pageSize).value();
    setPaginatedData(paginatedPost);
  };

  const sortIcon = (column, key) => {
    if (column === key) {
      return (
        <div className="mx-1 py-1">
          <SortingArrows order={order} />
        </div>
      );
    }
    if (column !== key) {
      return (
        <div>
          <img
            alt="Sorting Icon"
            src="../icons/up-down-arrow.svg"
            className="mx-1 py-1 transition-opacity hover:opacity-50"
          />
        </div>
      );
    }
    return undefined;
  };

  const sorting = (column, pageNumber) => {
    if (order === 'ASC') {
      const asc = [
        ...data.sort((a, b) => {
          const isNum =
            typeof a[column] === 'number' && typeof b[column] === 'number';
          if (isNum) {
            return a[column] > b[column] ? 1 : -1;
          }
          return a[column.toLowerCase()] > b[column.toLowerCase()] ? 1 : -1;
        })
      ];
      pagination(pageNumber, asc);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const desc = [
        ...data.sort((a, b) => {
          const isNum =
            typeof a[column] === 'number' && typeof b[column] === 'number';
          if (isNum) {
            return a[column] < b[column] ? 1 : -1;
          }
          return a[column.toLowerCase()] < b[column.toLowerCase()] ? 1 : -1;
        })
      ];
      pagination(pageNumber, desc);
      setOrder('ASC');
    }
    setSortColumn(column);
  };

  const cellData = (row, column) => {
    const value = row[column];
    if (column === 'actions' || column === 'delete-actions') {
      return value;
    }
    // const isEditing = editing.state && row[keyField] === editing.row;
    const [
      {
        key,
        type,
        readOnly,
        selectOptions,
        placeholder,
        userIconKey,
        onChangeFn,
        lastNameKey
      }
    ] = headingColumns.filter(col => col.key === column);
    const keyId = type ? `${row.id}-${column}-${type}` : `${row.id}-${column}`;

    if (column === 'division_list') {
      return (
        <div className="flex items-center whitespace-nowrap">
          <div>{row.division_list?.division_code || '-'}</div>
        </div>
      );
    }

    if (column === 'department_list') {
      return (
        <div className="flex items-center whitespace-nowrap">
          <div>{row.department_list?.department_code || '-'}</div>
        </div>
      );
    }

    if (column === 'section_list') {
      return (
        <div className="flex items-center whitespace-nowrap">
          <div>{row.section_list?.section_code || '-'}</div>
        </div>
      );
    }

    if (column === 'sub_section_list') {
      return (
        <div className="flex items-center whitespace-nowrap">
          <div>{row.sub_section_list?.sub_section_code || '-'}</div>
        </div>
      );
    }

    if (column === 'cost_center_code') {
      const sectionName = row.cost_center_tree
        ? row.cost_center_tree[row.cost_center_tree.length - 1]
        : null;
      return (
        <div className="flex items-center whitespace-nowrap">
          <div>
            {value ? `${value} ${sectionName ? `/ ${sectionName}` : ''}` : '-'}
          </div>
        </div>
      );
    }

    if (column === 'isUser') {
      const userStatus = row.user?.status;
      const isUser = row.user?.id;

      return (
        <div className="flex items-center whitespace-nowrap">
          <div
            className={`${!access.can_add ? 'text-disabled' : 'text-input'}`}
          >
            {(() => {
              if (isUser) {
                return userStatus === 'N' ? 'Pending' : 'Yes';
              }
              return (
                <>
                  <span>No </span>
                  {createModal && (
                    <button
                      type="button"
                      onClick={() => {
                        if (createModal) {
                          handleCreateModal(
                            createModal,
                            row.id,
                            row.first_name || null,
                            row.last_name || null,
                            row.suffix || null
                          );
                        }
                      }}
                      disabled={!access.can_add}
                    >
                      <span
                        className={`${
                          !access.can_add ? 'text-disabled' : 'text-[#458FFF]'
                        } ${
                          access.can_add &&
                          'hover:underline hover:text-opacity-50'
                        }`}
                      >
                        (Create User)
                      </span>
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      );
    }

    if ((isEditing && !readOnly) || (shouldDisplayEditable && !readOnly)) {
      return (
        <div className="sort-table__container-edit">
          {userIconKey ? (
            <div className="sort-table__container-image">
              <img
                className="sort-table__container-image-data"
                src={row[userIconKey] || defaultPicture}
                alt="User Icon"
              />
            </div>
          ) : null}

          <Input
            id={keyId}
            value={value}
            currentValue={value}
            type={type}
            placeholder={placeholder}
            selectOptions={selectOptions}
            isTemplate={isTemplate}
            onSelect={selectData => {
              if (type === 'templateMultiSelect') {
                if (selectData.selected) {
                  setMultipleSelectedItems(item => {
                    return [...item, selectData];
                  });
                  return;
                }

                if (!selectData.selected) {
                  const selectedItemIndex = multipleSelectedItems.findIndex(
                    item => item.value === selectData.value
                  );
                  setMultipleSelectedItems(
                    multipleSelectedItems.splice(1, selectedItemIndex)
                  );
                  return;
                }
                return;
              }

              setSelectedRow(selectRow => {
                return {
                  ...selectRow,
                  [column]: selectData
                };
              });
            }}
            onChange={onChangeValue => {
              if (type !== 'select') return;
              const dataIndex = datasource.findIndex(
                dataFind => dataFind.id === row.id
              );
              const updatedDatasource = { ...datasource };
              if (updatedDatasource[dataIndex]) {
                updatedDatasource[dataIndex][column] = onChangeValue;
              }

              onChangeFn({
                data: updatedDatasource[dataIndex],
                selectOptions,
                key
              });

              if (isSelectedValue) {
                setIsCurrentValue(true);
              }
            }}
            getLabel={setMultiSelectLabel}
          />
        </div>
      );
    }
    switch (type) {
      case 'date':
        return dateFormat(value);
      case 'multiselect':
        return multiSelectLabel || value;
      case 'select':
        return selectOptions.find(x => x.value === value)?.label || value;
      default:
        if (!userIconKey) {
          if (!value || !value.toString().length) return '-';
          return value.toString();
        }
        return (
          <div
            className={`${
              !shouldEllipsis ? 'whitespace-nowrap' : ''
            } flex items-center py-2`}
          >
            <div>
              <img
                className="w-8 h-8 rounded-full object-cover max-w-none"
                src={row[userIconKey] || defaultPicture}
                alt="User Icon"
              />
            </div>
            <div
              className={`${
                shouldEllipsis
                  ? 'overflow-hidden text-ellipsis line-clamp-1'
                  : ''
              } ${
                column === 'first_name'
                  ? 'overflow-hidden text-ellipsis max-w-[180px]'
                  : ''
              } ml-[15px] capitalize`}
            >
              {value} {row[lastNameKey]} {row?.suffix}
            </div>
          </div>
        );
    }
  };

  const rowClick = useCallback(
    key => {
      if (clickableRows && !_.isEmpty(key.toString())) {
        if (openNewTab) window.open(`${link}/${key}`, '_blank');
        else navigate(`${link}/${key}`);
      }
    },
    [clickableRows, link, openNewTab, navigate]
  );

  const handleCheckAll = event => {
    const isChecked = event.target.checked;
    const allUserIds = isChecked ? datasource.map(row => row.id) : [];
    setSelectedIds(allUserIds);
  };

  const handleSingleCheck = idParam => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(idParam)) {
        return prevSelectedIds.filter(id => id !== idParam);
      }
      return [...prevSelectedIds, idParam];
    });
  };

  const rowData = () => {
    if (datasource?.length === 0) {
      return (
        <tr>
          <td colSpan="100%" />
        </tr>
      );
    }

    const columnSequence = columns.map(column => column.key);

    return datasource?.map((row, srcIndex) => {
      const cols = [];
      Object.entries(row).forEach(([key]) => {
        if (columns.find(e => (e.key || e) === key)) {
          if (columns.includes(key)) {
            columnSequence.push(key);
          }
          cols.push(key);
        }
      });

      cols.sort(
        (a, b) => columnSequence.indexOf(a) - columnSequence.indexOf(b)
      );

      const statusData = statusValue => {
        let badgeClassName = '';
        let badgeText = '';
        switch (statusValue) {
          case 'A':
            badgeClassName = 'bg-[#23B53A] text-white';
            badgeText = 'Active';
            break;
          case 'C':
            badgeClassName = 'bg-[#DE5858] text-white';
            badgeText = 'Cancelled';
            break;
          case 'F':
            badgeClassName = 'bg-[#F8803D] text-white';
            badgeText = 'Fulfilled';
            break;
          case 'N':
            badgeClassName = 'bg-[#e8f1ff] text-[#232932]';
            badgeText = 'New';
            break;
          case 'O':
            badgeClassName = 'bg-[#F2CC62] text-[#232932]';
            badgeText = 'Onhold';
            break;
          default:
            badgeClassName = 'bg-[#E8EAED] text-white';
            badgeText = '';
        }
        return (
          <div
            className={`rounded-full text-center text-[12px] leading-[100%] h-[26px] w-[84px] inline-flex items-center justify-center ${badgeClassName}`}
          >
            {badgeText}
          </div>
        );
      };

      const generateUserType = rowUserType => {
        let roleString = '';

        if (rowUserType.is_system_admin) {
          roleString += 'System Admin';
        } else {
          roleString = '-';
        }

        return (
          <div className="overflow-hidden text-ellipsis line-clamp-1 font-stolzlBook -mt-[3px]">
            {roleString}
          </div>
        );
      };

      const renderCol = (rowInput, col) => {
        if (col !== 'actions') {
          if (shouldEllipsis) {
            return (
              <div className="overflow-hidden text-ellipsis line-clamp-1 font-stolzlBook -mt-[3px] max-w-[180px]">
                {cellData(rowInput, col)}
              </div>
            );
          }
          return (
            <div className="font-stolzlBook">{cellData(rowInput, col)}</div>
          );
        }
        return (
          <div className="whitespace-nowrap text-right">
            {cellData(rowInput, col)}
          </div>
        );
      };

      const isChecked = selectedIds.includes(row.id);

      return (
        <Fragment key={`${row.id}-${Math.random()}`}>
          <tr
            className={`${
              isChecked ? 'bg-[#F8F8F8]' : ' '
            } border border-t-0 border-l-2 border-r-2 border-l-[transparent] border-r-[transparent] border-b-[#DEDEDE] rounded-[4px] border-separate last:border-b-0`}
            onClick={event => {
              const tagname = event.target.tagName.toLowerCase();
              if (shouldDisplayEditable && clickableRows && tagname === 'td')
                rowClick(row[keyField] ?? srcIndex);
              if (!shouldDisplayEditable && clickableRows)
                rowClick(row[keyField] ?? srcIndex);
            }}
          >
            {cols.map((col, colIndex) => {
              if (col === 'id')
                return (
                  <td
                    // eslint-disable-next-line react/no-array-index-key
                    key={colIndex}
                    className="px-[15px] text-[14px]"
                  >
                    <label
                      className={`custom__checkbox inline-block align-middle text-[0] cursor-pointer ${
                        access.can_delete ? 'hover:opacity-50' : ''
                      }`}
                      htmlFor={row.id}
                    >
                      <input
                        checked={isChecked}
                        type="checkbox"
                        id={row.id}
                        disabled={!access.can_delete}
                        hidden
                        onChange={() => handleSingleCheck(row.id)}
                      />
                      <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded-[4px] ease duration-200 relative transition-opacity">
                        <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded-md" />
                        <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded-md" />
                      </span>
                    </label>
                  </td>
                );
              if (col === 'status')
                return (
                  <td
                    // eslint-disable-next-line react/no-array-index-key
                    key={colIndex}
                    className={`${
                      !noPadding ? 'pt-[13px] pb-[8px]' : ''
                    } px-[15px] first:pl-[29px] last:pr-[29px] text-center`}
                  >
                    {statusData(row.status)}
                  </td>
                );
              if (col === 'is_system_admin') {
                return (
                  <td
                    // eslint-disable-next-line react/no-array-index-key
                    key={colIndex}
                    className={`${
                      !noPadding ? 'pt-[13px] pb-[8px]' : ''
                    } px-[15px] first:pl-[29px] last:pr-[29px] text-[14px]`}
                  >
                    {generateUserType(row)}
                  </td>
                );
              }
              return (
                <td
                  // eslint-disable-next-line react/no-array-index-key
                  key={colIndex}
                  className={`${
                    !noPadding ? 'pt-[13px] pb-[8px]' : ''
                  } px-[15px] first:pl-[29px] last:pr-[29px] text-[14px]`}
                >
                  {renderCol(row, col)}
                </td>
              );
            })}
          </tr>
        </Fragment>
      );
    });
  };

  return {
    columns,
    editing,
    selectedRow,
    multipleSelectedItems,
    multiSelectLabel,
    data,
    paginationKey,
    order,
    currentPage,
    paginatedData,
    pageCount,
    pages,
    isCurrentValue,
    loading,
    tableClass,
    statusClass,
    status,
    sortColumn,
    selectedIds,
    sortIcon,
    setEditing,
    setSelectedRow,
    setMultipleSelectedItems,
    setMultiSelectLabel,
    setData,
    setPaginationKey,
    setOrder,
    setCurrentPage,
    setPaginatedData,
    setIsCurrentValue,
    setOnLoadColumns,
    pagination,
    sorting,
    cellData,
    rowData,
    rowClick,
    handleCheckAll
  };
};

useDatatable.propTypes = {
  datasource: PropTypes.any,
  headingColumns: PropTypes.any,
  actions: PropTypes.arrayOf(PropTypes.string),
  modalName: PropTypes.string,
  deleteModal: PropTypes.string,
  createModal: PropTypes.string,
  keyField: PropTypes.string,
  pageSize: PropTypes.number,
  isTemplate: PropTypes.bool,
  shouldDisplayEditable: PropTypes.bool,
  isSelectedValue: PropTypes.bool,
  shouldEllipsis: PropTypes.bool,
  noPadding: PropTypes.bool,
  clickableRows: PropTypes.bool,
  link: PropTypes.string,
  openNewTab: PropTypes.bool,
  breakOn: PropTypes.string,
  handleModal: PropTypes.func,
  handleViewModal: PropTypes.func,
  handleDeleteModal: PropTypes.func,
  handleCreateModal: PropTypes.func,
  access: PropTypes.object,
  isCostCenter: PropTypes.bool,
  codeField: PropTypes.string,
  actionLinks: PropTypes.string
};

export { useDatatable };
