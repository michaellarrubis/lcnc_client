import React from 'react';
import PropTypes from 'prop-types';
import 'src/assets/base/css/table.scss';

const Table = ({ tableData, headingColumns, title, breakOn = 'medium' }) => {
  let tableClass = 'table__container-table';

  if (breakOn === 'small') {
    tableClass += ' table-container__table--break-sm';
  } else if (breakOn === 'medium') {
    tableClass += ' table-container__table--break-md';
  } else if (breakOn === 'large') {
    tableClass += ' table-container__table--break-lg';
  }

  const data = tableData.map(row => {
    const rowData = [];
    let i = 0;

    for (const key in row) {
      rowData.push({
        key: headingColumns[i],
        val: row[key]
      });
      i++;
    }

    return (
      <tr key={row}>
        {rowData.map(_data => (
          <td key={_data} data-heading={_data.key}>
            {_data.val}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <div className="table__container">
      {title ? (
        <div className="table__container-title">
          <h2>{title}</h2>
        </div>
      ) : null}

      <table className={tableClass}>
        <thead>
          <tr>
            {headingColumns.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Table;
