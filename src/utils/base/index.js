import _ from 'lodash';
import { store } from 'src/store';
import { DateTime } from 'luxon';

export const isEqual = (a, b) => {
  return _.isEqual(a, b);
};

export const filterData = (array, key, keyValue = null) => {
  return array
    ?.map(value => (!keyValue ? value[key] : [value[key], value[keyValue]]))
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .filter(test => test != null || test !== undefined);
};

export const arrayFillKeys = (keys, value) => {
  const retObj = [];
  Object.keys(keys).forEach(e => {
    retObj[keys[e]] = value;
  });
  return retObj;
};

export const joinValuesByKey = (array, key) => {
  if (!array.length) return '';
  const values = [];
  array.forEach(arr => values.push(arr[key]));
  return values.join(', ');
};

export const formatDate = date => {
  const newDate = new Date(date);
  const year = newDate.toLocaleDateString('default', { year: 'numeric' });
  const month = newDate.toLocaleDateString('default', { month: '2-digit' });
  const day = newDate.toLocaleDateString('default', { day: '2-digit' });
  return `${month}/${day}/${year}`;
};

export const getCostCenter = (type, costCenterCode = null) => {
  const state = store.getState();
  if (!state) return null;

  const costCenterList = state?.costCenter?.all?.items.sort((a, b) => a - b);
  const divisions = state?.divisions?.all?.items || null;
  const departments = state?.departments?.all?.items || null;
  const sections = state?.sections?.all?.items || null;
  const subSections = state?.subSections?.all?.items || null;
  console.log('costCenterList: ', costCenterList);

  function handleDisplayData(arr, arr_field, data, arr_field_to_return) {
    if (!arr_field) return null;

    const result = arr?.find(arrs => arrs[arr_field] === data);
    if (!result) return null;

    if (
      !arr_field_to_return === undefined ||
      !arr_field_to_return ||
      arr_field_to_return.length === 0
    ) {
      return result[arr_field];
    }

    return result[arr_field_to_return];
  }

  function getCostCenterInfo(costCenterValue) {
    const costCenterCodeData = handleDisplayData(
      costCenterList,
      'cost_center_code',
      costCenterValue,
      ''
    );

    if (!costCenterCodeData) return null;
    const getCostCenterCode = costCenterCodeData?.match(/(..?)/g);
    const costCenterLength = getCostCenterCode?.length;
    const lastItem = getCostCenterCode[costCenterLength - 1];
    let result;

    switch (costCenterLength) {
      case 1: {
        const divisionName = handleDisplayData(
          divisions,
          'division_code',
          lastItem,
          'name'
        );
        const divisionHead = handleDisplayData(
          divisions,
          'division_code',
          lastItem,
          'head'
        );
        if (type === 'name') result = divisionName;
        if (type === 'head') result = divisionHead;
        return result ?? null;
      }
      case 2: {
        const departmentName = handleDisplayData(
          departments,
          'department_code',
          lastItem,
          'name'
        );
        const departmentHead = handleDisplayData(
          departments,
          'department_code',
          lastItem,
          'head'
        );
        if (type === 'name') result = departmentName;
        if (type === 'head') result = departmentHead;
        return result ?? null;
      }
      case 3: {
        const sectionName = handleDisplayData(
          sections,
          'section_code',
          lastItem,
          'name'
        );
        const sectionHead = handleDisplayData(
          sections,
          'section_code',
          lastItem,
          'head'
        );
        if (type === 'name') result = sectionName;
        if (type === 'head') result = sectionHead;
        return result ?? null;
      }
      case 4: {
        const subSectionName = handleDisplayData(
          subSections,
          'sub_section_code',
          lastItem,
          'name'
        );
        const subSectionHead = handleDisplayData(
          subSections,
          'sub_section_code',
          lastItem,
          'head'
        );
        console.log('subSectionName: ', subSectionName);
        console.log('subSectionHead: ', subSectionHead);
        if (type === 'name') result = subSectionName;
        if (type === 'head') result = subSectionHead;
        return result ?? null;
      }
      default:
        return '';
    }
  }

  switch (type) {
    case 'name':
      return getCostCenterInfo(costCenterCode);
    case 'head':
      return getCostCenterInfo(costCenterCode);
    case 'division':
      return divisions?.sort((a, b) => (a?.id || null) - (b?.id || null));
    case 'department':
      return departments?.sort((a, b) => (a?.id || null) - (b?.id || null));
    case 'section':
      return sections?.sort((a, b) => (a?.id || null) - (b?.id || null));
    case 'sub-section':
      return subSections?.sort((a, b) => (a?.id || null) - (b?.id || null));
    default:
      return costCenterList;
  }
};

export function getCostCenterFull() {
  const state = store.getState();
  const { costCenterList } = state?.costCenter || null;
  return costCenterList?.map(costCenter => {
    const { cost_center_code: costCenterCode } = costCenter;
    const costCenterName = getCostCenter('name', costCenterCode);
    return { cost_center_code: `${costCenterCode} - ${costCenterName}` };
  });
}

export const dateFormat = date => {
  return DateTime.fromJSDate(new Date(date)).toLocaleString();
};

export const getLowerCasedValue = value =>
  typeof value === 'string' ? value.toLowerCase() : value;

export const autoCapitalize = words => {
  if (!words) return '';
  return words
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const queryParamsBuilder = (path, page, params) => {
  let paramsPage = page;
  if (!page || typeof page !== 'number') paramsPage = 1;

  let endpoint = `${path}?page=${paramsPage}`;
  if (params) {
    const searchParamsString = new URLSearchParams(params).toString();
    endpoint += `&${searchParamsString}`;
  }
  return endpoint;
};

export const setOverflowStyle = modal => {
  document.body.style.overflow = modal ? 'hidden' : 'unset';
};

export const getCustomMenuCode = menuCode => {
  return menuCode.includes('CUST_') ? 'CUST_01' : menuCode;
};

export const getFilteredList = (list, key) => {
  return list.filter((obj, index) => {
    return index === list.findIndex(o => obj[key] === o[key]);
  });
};
