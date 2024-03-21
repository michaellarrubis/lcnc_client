import React, { useState, useEffect } from 'react';
import useKeypressEscape from '@baseHooks/useKeypressEscape';
import { getCostCenter } from '@baseUtils';
import PropTypes from 'prop-types';

const CostCenter = ({
  columns,
  onChange,
  tabIndex = 0,
  isEdit = true,
  full = false,
  currentValue = 0,
  ...margins
}) => {
  let keyCounter = 0;

  const generateUniqueKey = () => {
    keyCounter += 1;
    return `key-${keyCounter}`;
  };
  const costCenterList = getCostCenter();
  const isColumnsExist = columns !== undefined;
  const valueExist = currentValue !== undefined;
  const [costCenter, setCostCenter] = useState({
    cost_center_code: '',
    cost_center_name: ''
  });

  useKeypressEscape({
    isEdit,
    cancelEdit: () => {
      setCostCenter(prevState => ({
        ...prevState,
        cost_center_code: valueExist ? currentValue : '',
        cost_center_name: valueExist ? getCostCenter('name', currentValue) : ''
      }));
    }
  });

  useEffect(() => {
    const empty =
      currentValue === '' &&
      currentValue === null &&
      currentValue === undefined;
    setCostCenter(prevState => ({
      ...prevState,
      cost_center_code: empty ? '' : currentValue,
      cost_center_name: empty ? '' : getCostCenter('name', currentValue)
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onChange) onChange(costCenter);
  }, [costCenter, onChange]);

  function handleCostCenterDisplay(cost_center_code) {
    const costCenterName = getCostCenter('name', cost_center_code);
    if (!cost_center_code || !costCenterName) return null;
    if (!full) return cost_center_code;

    return `${cost_center_code} (${costCenterName})`;
  }

  function handleChange(event) {
    const { value, name } = event.target;
    const empty = value === '0' || value === '';
    setCostCenter(prevState => ({
      ...prevState,
      [name]: empty ? '' : value,
      cost_center_name: empty ? '' : getCostCenter('name', value)
    }));
  }

  function renderList(items) {
    return items?.length && items !== undefined ? (
      <>
        <option value={0}>Select</option>
        {items?.map(({ cost_center_code }) => (
          <option key={generateUniqueKey()} value={cost_center_code}>
            {`${cost_center_code} / ${getCostCenter('name', cost_center_code)}`}
          </option>
        ))}
      </>
    ) : (
      <option value={0}>Select</option>
    );
  }

  function getColumns(column) {
    if (typeof column !== 'number') return 'one';
    switch (column) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      default:
        return 'one';
    }
  }

  function getMargins(margin) {
    if (!Object?.keys(margin)?.length) return '';
    const classes = [];
    const getMargin = Object.keys(margin);
    getMargin?.forEach(marginData => {
      if (marginData === 'ml') classes?.push(' -ml');
      if (marginData === 'mr') classes?.push(' -mr');
    });
    return classes?.length ? classes?.join(' ') : '';
  }

  const costCenterDisplay = handleCostCenterDisplay(currentValue);

  return (
    <div>
      {isEdit ? (
        <div
          className={`costcenter__column${
            isColumnsExist ? ` --${getColumns(columns)}` : ''
          }${getMargins(margins)}`}
        >
          <select
            className="costcenter__input --select"
            name="cost_center_code"
            id="cost_center_field"
            tabIndex={tabIndex}
            onChange={handleChange}
            defaultValue={currentValue}
          >
            <option disabled label="Cost Center" />
            {renderList(costCenterList)}
          </select>
        </div>
      ) : (
        costCenterDisplay
      )}
    </div>
  );
};

CostCenter.propTypes = {
  columns: PropTypes.number,
  onChange: PropTypes.string,
  tabIndex: PropTypes.number,
  isEdit: PropTypes.bool,
  full: PropTypes.bool,
  currentValue: PropTypes.number
};

export default CostCenter;
