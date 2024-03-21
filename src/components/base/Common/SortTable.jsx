import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

import Input from './Input';
import IconButton from './IconButton';
import 'src/assets/base/css/sortTable.scss';

const SortTable = ({
  tableData,
  headingColumns,
  title,
  link,
  clickableRows,
  breakOn = 'medium',
  editable = false
}) => {
  const [multiSelectLabel, setMultiSelectLabel] = useState('');
  const [editing, setEditing] = useState({ state: false, row: null });

  const setActionHeader = () => {
    if (headingColumns.indexOf('actions') === -1)
      headingColumns.push('actions');
  };

  const setActionButtons = () => {
    tableData.map(cell => {
      const isEditing = editing.state && cell.id === editing.row;
      const tableCell = { ...cell };
      tableCell.actions = (
        <IconButton
          key={tableCell.id}
          icon={isEditing ? 'save' : 'edit'}
          color={isEditing ? 'dark' : 'light'}
          onClick={() =>
            setEditing({
              state: !isEditing,
              row: isEditing ? null : tableCell.id
            })
          }
        />
      );

      return tableCell;
    });
  };

  if (editable) {
    setActionHeader();
    setActionButtons();
  }

  let tableClass = 'sort-table__container-table';

  if (breakOn === 'small') {
    tableClass += ' sort-table-container__table--break-sm';
  } else if (breakOn === 'medium') {
    tableClass += ' sort-table-container__table--break-md';
  } else if (breakOn === 'large') {
    tableClass += ' sort-table-container__table--break-lg';
  }

  const [list, setList] = useState(tableData);
  const [order, setOrder] = useState('ASC');
  const navigate = useNavigate();

  const handleOnClick = id => {
    if (clickableRows) {
      if (id) {
        navigate(`${link}/${id}`);
      }
    }
  };

  const data = list.map(row => {
    const getColumn = (dataField, isActions) => {
      return isActions
        ? {}
        : headingColumns.filter(col => col.dataField === dataField)[0];
    };

    const dateFormat = date => {
      return DateTime.fromJSDate(new Date(date)).toLocaleString();
    };

    return (
      <tr
        className={row.id === editing.row ? 'is-editing' : ''}
        key={row.id}
        onClick={() => handleOnClick(row.id)}
      >
        {Object.entries(row).map(objectData => {
          const [dataField, value] = objectData;
          if (dataField === 'id') return;
          const isActions = dataField === 'actions';
          const { type, selectOptions, readonly, onSelect } = {
            type: 'input',
            ...getColumn(dataField, isActions)
          };
          const isEditing =
            editing.state && editing.row === row.id && !isActions;
          const key = row.id + dataField;

          let content;
          if (isEditing && !readonly) {
            content = (
              <Input
                key={key}
                value={value}
                type={type}
                selectOptions={selectOptions}
                onSelect={onSelect}
                getLabel={setMultiSelectLabel}
              />
            );
          } else if (type === 'date') {
            content = dateFormat(value);
          } else if (type === 'multiselect') {
            content = multiSelectLabel || value;
          } else {
            content = value;
          }
          // eslint-disable-next-line consistent-return
          return (
            <td key={key} data-heading={value}>
              {content}
            </td>
          );
        })}
      </tr>
    );
  });

  const sorting = col => {
    if (order === 'ASC') {
      const sorted = [...list].sort((a, b) =>
        a[col.col.toLowerCase()] > b[col.col.toLowerCase()] ? 1 : -1
      );

      setList(sorted);
      setOrder('DSC');
    }

    if (order === 'DSC') {
      const sorted = [...list].sort((a, b) =>
        a[col.col.toLowerCase()] < b[col.col.toLowerCase()] ? 1 : -1
      );

      setList(sorted);
      setOrder('ASC');
    }
  };

  return (
    <div className="sort-table__container">
      {title ? (
        <div className="sort-table__container-title">
          <h2>{title}</h2>
        </div>
      ) : null}

      <table className={tableClass}>
        <thead>
          <tr>
            {headingColumns.map(cell => {
              const { dataField, label } = cell;

              return (
                <th
                  className={cell === 'actions' ? 'action-column' : ''}
                  key={dataField}
                  onClick={() => sorting({ label })}
                >
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </div>
  );
};

SortTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape(Object)).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large']),
  title: PropTypes.string,
  link: PropTypes.string,
  clickableRows: PropTypes.bool,
  editable: PropTypes.bool
};

export default SortTable;
