import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { setOverflowStyle } from '@baseUtils';

const useBaseComponent = ({
  setFormData,
  setFormValidation,
  setSelectedOption,
  setShowDeleteModal,
  setIsDropdownDisplayed,
  setEditModal
}) => {
  const onChangeSelectHandler = useCallback(
    (value, name, setFieldValue, setFieldTouched, setFieldError) => {
      setSelectedOption(value);
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));

      setFieldValue(name, value);
      setFieldTouched(name, true);
      setFieldError(name, '');
    },
    [setFormData, setSelectedOption]
  );

  const handleDeleteModal = useCallback(
    (modal, editModalName, id = null) => {
      setShowDeleteModal(modal);
      setEditModal(editModalName);

      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowDeleteModal, setEditModal]
  );

  const handleTrimSpaces = e => {
    const { name, value } = e.target;
    let trimEndValue = '';
    if (typeof value === 'string' && value.length > 1) {
      trimEndValue = value.trimEnd();
      setFormData(prevState => ({
        ...prevState,
        [name]: trimEndValue
      }));
    }
  };

  const handleChange = (e, setFieldValue, setFieldTouched, setFieldError) => {
    const { name, value, checked, type } = e.target;
    let fieldValue = value;
    if (type === 'checkbox') fieldValue = checked;
    if (type === 'radio') fieldValue = JSON.parse(value);

    setFormData(prevState => ({
      ...prevState,
      [name]: fieldValue
    }));

    setFieldValue(name, fieldValue);
    setFieldTouched(name, true);
    setFieldError(name, '');
    setFormValidation('');
  };

  const handleRadioChange = (name, event) => {
    const selectedValue = event.target.value;

    setIsDropdownDisplayed(prevState => !prevState);
    setSelectedOption(selectedValue);
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedValue
    }));
  };

  const handSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return {
    handleRadioChange,
    handleChange,
    handleTrimSpaces,
    handleDeleteModal,
    handSelectChange,
    onChangeSelectHandler
  };
};

useBaseComponent.propTypes = {
  setFormData: PropTypes.func,
  setFormValidation: PropTypes.func,
  setSelectedOption: PropTypes.func,
  setShowDeleteModal: PropTypes.func,
  setIsDropdownDisplayed: PropTypes.func,
  setEditModal: PropTypes.func
};

export { useBaseComponent };
