import PropTypes from 'prop-types';
import { useEffect } from 'react';

const useKeypressEscape = ({ isEdit = false, cancelEdit = null }) => {
  useEffect(() => {
    const keyDownHandler = event => {
      if (isEdit && typeof cancelEdit === 'function') {
        if (event.key === 'Escape') {
          event.preventDefault();
          cancelEdit();
        }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  });
};

useKeypressEscape.propTypes = {
  isEdit: PropTypes.boolean,
  cancelEdit: PropTypes.func || null
};

export default useKeypressEscape;
