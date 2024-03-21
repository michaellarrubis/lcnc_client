import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addDivisionService,
  getDivisionByIDService,
  getDivisionItemsService,
  updateDivisionById
} from 'src/api/modules/base/divisions';
import {
  getDivisions,
  getAllDivision
} from '@baseStores/divisions/divisionsActions';
import { autoCapitalize, setOverflowStyle } from '@baseUtils';
import { toast } from 'react-toastify';
import { CgCheckO } from 'react-icons/cg';
import { MdOutlineErrorOutline } from 'react-icons/md';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const useAddEditModal = ({ handleModal, uniqueCode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    division_code: '',
    name: '',
    head: ''
  });
  const userByID = useSelector(state => state);
  const users = useSelector(state => state.user.users);

  const [isDropdownDisplayed, setDropdownDisplayed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [costCenterDetails, setCostCenterDetails] = useState('');
  const [divisionValidation, setDivisionValidation] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [codeNumber, setCodeNumber] = useState(null);
  const initialDummyData = {
    division_code: '01',
    name: 'TEST',
    head: 'TEST'
  };
  const renderCostCenterInfo = useMemo(() => {
    return (
      <div className="flex items-center h-[35px]">
        <div className="text-[14px] font-stolzlRegular mr-[5px]">
          Division Code:
        </div>
        <div className="text-[22px] font-stolzlMedium relative bottom-[2px]">
          {uniqueCode || formData.division_code}
        </div>
      </div>
    );
  }, [uniqueCode, formData]);

  const userOptions =
    users?.map(option => {
      const FIRST_NAME = autoCapitalize(option?.first_name);
      const MIDDLE_NAME = autoCapitalize(option?.middle_name);
      const LAST_NAME = autoCapitalize(option?.last_name);
      const SUFFIX = option.suffix ? autoCapitalize(option.suffix) : '';
      return {
        id: option.id,
        value: `${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME} ${SUFFIX}`,
        label: `${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME} ${SUFFIX}`
      };
    }) || [];

  const onChangeSelectHandler = useCallback(
    (value, name, setFieldValue, setFieldTouched, setFieldError) => {
      setSelectedOption(value);
      setFormData(prevState => ({
        ...prevState,
        head: value
      }));

      setFieldValue(name, value);
      setFieldTouched(name, true);
      setFieldError(name, '');
      setDivisionValidation('');
    },
    [setFormData]
  );

  const handleRadioChange = (
    event,
    setFieldValue,
    setFieldTouched,
    setFieldError
  ) => {
    const selectedValue = event.target.value;

    setDropdownDisplayed(prevState => !prevState);
    setSelectedOption(selectedValue);
    setFormData(prevState => ({
      ...prevState,
      head: selectedValue
    }));
    setFieldValue('head', selectedValue);
    setFieldTouched('head', true);
    setFieldError('head', '');
    setDivisionValidation('');
  };

  const fetchDivision = async code => {
    const response = await getDivisionByIDService(code);
    if (response.data) {
      const responseData = response.data;
      Object.keys(response.data).forEach(formKey => {
        if (typeof formData[formKey] === 'undefined') {
          delete responseData[formKey];
        }
        delete responseData.code;
      });
      setCostCenterDetails(response.data);
      setFormData(response.data);
    }
  };

  const handleDeleteModal = useCallback(
    (modal, editModalName, id = null) => {
      setShowDeleteModal(modal);
      setCodeNumber(modal ? id : null);
      setEditModal(editModalName);
      // disable scroll when modal is shown
      setOverflowStyle(modal);
    },
    [setShowDeleteModal, setEditModal, setCodeNumber]
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
    const fieldValue = type === 'checkbox' ? checked : value;
    const initialValue = value.match(/^\s/) !== null;

    if (
      (name === 'division_code' && initialValue) ||
      (name === 'name' && initialValue)
    ) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value.trim()
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: fieldValue
      }));
    }

    setFieldValue(name, fieldValue);
    setFieldTouched(name, true);
    setFieldError(name, '');
    setDivisionValidation('');
  };

  const handSelectChange = value => {
    setFormData(prevState => ({
      ...prevState,
      status: value
    }));
  };

  const fetchUpdateDivision = async () => {
    getDivisionItemsService(1)
      .then(() => {
        dispatch(getDivisions());
        dispatch(getAllDivision());
      })
      .catch(err => {
        return err;
      });
  };

  const updateDivision = async (code, payload) => {
    updateDivisionById(code, payload)
      .then(response => {
        if (response.success) {
          fetchUpdateDivision();
          toast.success('Successfully Updated!', {
            icon: <CgCheckO />,
            toastId: code
          });
          handleModal(null);
        }
        setFormData(formData);
      })
      .catch(err => {
        toast.error(err, { icon: <MdOutlineErrorOutline />, toastId: code });
      });
  };

  const addDivisionCode = async payload => {
    const newPayload = {
      ...payload,
      code: payload.division_code
    };
    delete newPayload.division_code;

    const response = await addDivisionService(newPayload);

    switch (response?.status) {
      case 201:
        fetchUpdateDivision();
        toast.success('Successfully Added!', { icon: <CgCheckO /> });
        handleModal(null);
        break;
      case 409:
        setDivisionValidation('Division Code already exists');
        break;
      default:
        setDivisionValidation('Invalid Division Code format');
        break;
    }
  };

  const handleSubmit = useCallback(async () => {
    if (uniqueCode) {
      updateDivision(uniqueCode, formData);
      return;
    }

    addDivisionCode(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDivision, addDivisionCode]);

  const nameRegex = /^[a-zA-Z .-]+(\.[a-zA-Z .-]+)*$/;
  const nameMessage =
    'Only letters with spaces, hyphens, or periods are allowed';
  const codeRegex = /^[0-9]+$/;
  const codeMessage = 'Must be a Number';
  const validationSchema = Yup.object().shape({
    uniqueCode: Yup.string(),
    division_code: uniqueCode
      ? ''
      : Yup.string()
          .trim()
          .required('Required')
          .test('is-code', codeMessage, value => {
            if (!value || value.match(codeRegex)) {
              return true;
            }
            return false;
          }),
    name: Yup.string()
      .trim()
      .required('Required')
      .test('is-code', nameMessage, value => {
        if (!value || value.match(nameRegex)) {
          return true;
        }
        return false;
      }),
    head: Yup.string().required('Required')
  });

  useEffect(() => {
    if (uniqueCode) {
      fetchDivision(uniqueCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formData,
    userByID,
    initialDummyData,
    isDropdownDisplayed,
    selectedOption,
    costCenterDetails,
    setDropdownDisplayed,
    handleChange,
    handleTrimSpaces,
    handleRadioChange,
    fetchDivision,
    handSelectChange,
    handleSubmit,
    handleDeleteModal,
    validationSchema,
    users,
    divisionValidation,
    showDeleteModal,
    editModal,
    renderCostCenterInfo,
    userOptions,
    onChangeSelectHandler
  };
};

useAddEditModal.propTypes = {
  handleModal: PropTypes.func,
  uniqueCode: PropTypes.string
};

export { useAddEditModal };
