import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSubSectionList,
  getSubSectionService,
  addSubSectionService,
  updateSubSectionService
} from 'src/api/modules/base/subsections';
import {
  getAllSubSection,
  getSubSections
} from '@baseStores/subsections/subsectionsActions';
import { autoCapitalize, setOverflowStyle } from '@baseUtils';
import { toast } from 'react-toastify';
import { CgCheckO } from 'react-icons/cg';
import { MdOutlineErrorOutline } from 'react-icons/md';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const useAddEditModal = ({ handleModal, uniqueCode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sub_section_code: '',
    name: '',
    head: ''
  });

  const initialDummyData = {
    sub_section_code: '01',
    name: 'TEST',
    head: 'TEST'
  };
  const userByID = useSelector(state => state);
  const [isDropdownDisplayed, setDropdownDisplayed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [costCenterDetails, setCostCenterDetails] = useState('');
  const [subSectionValidation, setSubSectionValidation] = useState('');
  const users = useSelector(state => state.user.users);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [codeNumber, setCodeNumber] = useState(null);

  const renderCostCenterInfo = useMemo(() => {
    return (
      <div className="flex items-center h-[35px]">
        <div className="text-[14px] font-stolzlRegular mr-[5px]">
          Sub Section Code:
        </div>
        <div className="text-[22px] font-stolzlMedium relative bottom-[2px]">
          {uniqueCode || formData.sub_section_code}
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
      setSubSectionValidation('');
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
    setSubSectionValidation('');
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

  const fetchDivision = async code => {
    const response = await getSubSectionService(code, 'GET');
    if (response.data) {
      const responseData = response.data;
      Object.keys(response.data).forEach(formKey => {
        if (typeof formData[formKey] === 'undefined') {
          delete responseData[formKey];
        }
        delete responseData.sub_section_code;
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
      (name === 'sub_section_code' && initialValue) ||
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
    setSubSectionValidation('');
  };

  const handSelectChange = value => {
    setFormData(prevState => ({
      ...prevState,
      status: value
    }));
  };

  const fetchSubSection = async () => {
    getSubSectionList(1)
      .then(() => {
        dispatch(getSubSections());
        dispatch(getAllSubSection());
      })
      .catch(err => {
        return err;
      });
  };

  const updateSubSection = async (code, payload) => {
    updateSubSectionService(code, payload)
      .then(response => {
        if (response.success) {
          fetchSubSection();
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

  const addSubSectionCode = async payload => {
    const newPayload = {
      ...payload,
      code: payload.sub_section_code
    };
    delete newPayload.sub_section_code;

    const response = await addSubSectionService(newPayload);
    if (response.status === 201) {
      fetchSubSection();
      toast.success('Successfully Added!', { icon: <CgCheckO /> });
      handleModal(null);
    } else if (response.status === 409) {
      setSubSectionValidation('Sub Section Code already exists');
    } else if (response.status === 400) {
      setSubSectionValidation('Invalid Sub Section Code format');
    }
  };

  const handleSubmit = useCallback(async () => {
    if (uniqueCode) {
      updateSubSection(uniqueCode, formData);
      return;
    }

    addSubSectionCode(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSubSection, addSubSectionCode]);

  const nameRegex = /^[a-zA-Z .-]+(\.[a-zA-Z .-]+)*$/;
  const nameMessage =
    'Only letters with spaces, hyphens, or periods are allowed';
  const codeRegex = /^[0-9]+$/;
  const codeMessage = 'Must be a Number';

  const validationSchema = Yup.object().shape({
    uniqueCode: Yup.string(),
    sub_section_code: uniqueCode
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
    isDropdownDisplayed,
    selectedOption,
    costCenterDetails,
    initialDummyData,
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
    showDeleteModal,
    editModal,
    renderCostCenterInfo,
    subSectionValidation,
    userOptions,
    onChangeSelectHandler
  };
};

useAddEditModal.propTypes = {
  handleModal: PropTypes.func,
  uniqueCode: PropTypes.string
};

export { useAddEditModal };
