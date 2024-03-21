import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { CgCheckO } from 'react-icons/cg';
import { MdOutlineErrorOutline } from 'react-icons/md';

import {
  updateDepartmentByIDService,
  getDepartmentsServiceByPage,
  addDepartmentService,
  getDepartmentByIDService
} from 'src/api/modules/base/departments';
import {
  getAllDepartment,
  getDepartments
} from '@baseStores/departments/departmentsActions';
import { autoCapitalize, setOverflowStyle } from '@baseUtils';

const useAddEditModal = ({ handleModal, uniqueCode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    department_code: '',
    name: '',
    head: ''
  });
  const userByID = useSelector(state => state);
  const users = useSelector(state => state.user.users);
  const initialDummyData = {
    department_code: '01',
    name: 'TEST',
    head: 'TES'
  };
  const [isDropdownDisplayed, setDropdownDisplayed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [costCenterDetails, setCostCenterDetails] = useState('');
  const [departmentValidation, setDepartmentValidation] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [codeNumber, setCodeNumber] = useState(null);

  const renderCostCenterInfo = useMemo(() => {
    return (
      <div className="flex items-center h-[35px]">
        <div className="text-[14px] font-stolzlRegular mr-[5px]">
          Department Code:
        </div>
        <div className="text-[22px] font-stolzlMedium relative bottom-[2px]">
          {uniqueCode || formData.department_code}
        </div>
      </div>
    );
  }, [uniqueCode, formData]);

  const userOptions = users?.map(option => {
    const FIRST_NAME = autoCapitalize(option?.first_name);
    const MIDDLE_NAME = autoCapitalize(option?.middle_name);
    const LAST_NAME = autoCapitalize(option?.last_name);
    const SUFFIX = option.suffix ? autoCapitalize(option.suffix) : '';
    return {
      id: option.id,
      value: `${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME} ${SUFFIX}`,
      label: `${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME} ${SUFFIX}`
    };
  });

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
      setDepartmentValidation('');
    },
    [setFormData]
  );

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
  };

  const fetchDepartment = async code => {
    const response = await getDepartmentByIDService(code, 'GET');
    if (response.data) {
      const responseData = response.data;
      Object.keys(response.data).forEach(formKey => {
        if (typeof formData[formKey] === 'undefined') {
          delete responseData[formKey];
        }
        delete responseData.department_code;
      });
      setCostCenterDetails(response.data);
      setFormData(response.data);
    }
  };

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
      (name === 'department_code' && initialValue) ||
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
    setDepartmentValidation('');
  };

  const handSelectChange = value => {
    setFormData(prevState => ({
      ...prevState,
      status: value
    }));
  };

  const fetchUpdateDepartment = async () => {
    getDepartmentsServiceByPage(1)
      .then(() => {
        dispatch(getDepartments());
        dispatch(getAllDepartment());
      })
      .catch(err => {
        return err;
      });
  };

  const updateDepartment = async (code, payload) => {
    updateDepartmentByIDService(code, payload)
      .then(response => {
        if (response.success) {
          fetchUpdateDepartment();
          toast.success('Successfully Updated!', { icon: <CgCheckO /> });
          handleModal(null);
        }
        setFormData(formData);
      })
      .catch(err => {
        toast.error(err, { icon: <MdOutlineErrorOutline /> });
      });
  };

  const addDepartmentCode = async payload => {
    const newPayload = {
      ...payload,
      code: payload.department_code
    };
    delete newPayload.department_code;

    const response = await addDepartmentService(newPayload);
    if (response.status === 201) {
      fetchUpdateDepartment();
      toast.success('Successfully Added!', { icon: <CgCheckO /> });
      handleModal(null);
    } else if (response.status === 409)
      setDepartmentValidation('Department Code already exists');
    else if (response.status === 400)
      setDepartmentValidation('Invalid Department Code format');
  };

  const handleSubmit = useCallback(async () => {
    if (uniqueCode) {
      updateDepartment(uniqueCode, formData);
      return;
    }

    addDepartmentCode(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDepartmentCode, updateDepartment]);

  const nameRegex = /^[a-zA-Z .-]+(\.[a-zA-Z .-]+)*$/;
  const nameMessage =
    'Only letters with spaces, hyphens, or periods are allowed';
  const codeRegex = /^[0-9]+$/;
  const codeMessage = 'Must be a Number';

  const validationSchema = Yup.object().shape({
    uniqueCode: Yup.string(),
    department_code: uniqueCode
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
      fetchDepartment(uniqueCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formData,
    userByID,
    isDropdownDisplayed,
    selectedOption,
    costCenterDetails,
    initialDummyData,
    setDropdownDisplayed,
    handleChange,
    handleTrimSpaces,
    handleRadioChange,
    fetchDepartment,
    handSelectChange,
    handleSubmit,
    handleDeleteModal,
    validationSchema,
    users,
    departmentValidation,
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
