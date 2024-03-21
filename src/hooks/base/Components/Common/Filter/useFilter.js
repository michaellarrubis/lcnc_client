import { useCallback } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@baseComponents/Common/Filter/Checkbox';
import Date from '@baseComponents/Common/Filter/Date';
import CheckboxMultiSelect from '@baseComponents/Common/Filter/CheckboxMultiSelect';

const useFilter = ({ form, submitFilter, isOpen }) => {
  const handleFiltersDisplay = useCallback(
    input => {
      switch (input.type) {
        case 'checkbox': {
          return (
            <Checkbox
              form={form}
              name={input?.name}
              item={input?.options}
              submitFilter={submitFilter}
            />
          );
        }
        case 'multiselect': {
          return (
            <CheckboxMultiSelect
              form={form}
              name={input?.name}
              item={input.multiOptions}
              submitFilter={submitFilter}
              defaultValue="A"
              isOpen={isOpen}
            />
          );
        }
        case 'date-range': {
          return (
            <Date
              form={form}
              item={input.options}
              submitFilter={submitFilter}
            />
          );
        }
        default: {
          return null;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, isOpen]
  );

  return {
    handleFiltersDisplay
  };
};

useFilter.propTypes = {
  form: PropTypes.node,
  isOpen: PropTypes.bool,
  submitFilter: PropTypes.func
};

export default useFilter;
