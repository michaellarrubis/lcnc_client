import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCostCenterByIDService,
  updateCostCenterService,
  getCostCenterDataItems,
  addCostCenterService
} from 'src/api/modules/base/costCenter';
import {
  getAllCostCenterItems,
  getAllCostCenterService
} from '@baseStores/costcenter/costcenterActions';
import { toast } from 'react-toastify';
import { CgCheckO } from 'react-icons/cg';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const useAddEditModal = ({ handleModal, uniqueCode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    division_list: { code: '', name: '' },
    department_list: { code: '', name: '' },
    section_list: { section_code: '', name: '' },
    sub_section_list: { code: '', name: '' },
    remarks: ''
  });

  const costcenter = useSelector(
    state => state.costCenter?.costCenterList?.items
  );
  const divisionList = useSelector(state => state.divisions?.all?.items);
  const departmentList = useSelector(state => state.departments?.all?.items);
  const sectionList = useSelector(state => state.sections?.all?.items);
  const subSectionList = useSelector(state => state.subSections?.all?.items);
  const userByID = useSelector(state => state);

  const [isDropdownDisplayed, setDropdownDisplayed] = useState({
    division: false,
    department: false,
    section: false,
    sub_section: false
  });
  const [selectedOption, setSelectedOption] = useState({});
  const [formValidation, setFormValidation] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [codeNumber, setCodeNumber] = useState(null);
  const blankSpaceRegex2 = /^\s+$/;

  const divisionOptions = divisionList?.map(option => {
    return {
      id: option.id,
      value: option.code,
      label: `${option.code} / ${option.name} `,
      codeName: option.name
    };
  });

  const departmentOptions = departmentList?.map(option => {
    return {
      id: option.id,
      value: option.code,
      label: `${option.code} / ${option.name} `,
      codeName: option.name
    };
  });

  const sectionOptions = sectionList?.map(option => {
    return {
      id: option.id,
      value: option.code,
      label: `${option.code} / ${option.name} `,
      codeName: option.name
    };
  });

  const subSectionOptions = subSectionList?.map(option => {
    return {
      id: option.id,
      value: option.code,
      label: `${option.code} / ${option.name} `,
      codeName: option.name
    };
  });

  const transformFormData = data => {
    const transformedFormData = { ...data };

    // eslint-disable-next-line no-restricted-syntax
    for (const key in transformedFormData) {
      if (key.endsWith('_list')) {
        const list = transformedFormData[key];

        if (list === null) {
          transformedFormData[key] = null;
        } else {
          const code = list.code || '';
          const name = list.name || '';

          // Check if both code and name are empty strings
          if (code === '' && name === '') {
            transformedFormData[key] = null;
          } else {
            transformedFormData[key] = `${code} / ${name}`;
          }
        }
      }
    }

    return transformedFormData;
  };

  const currentCodeValue = transformFormData(formData);

  const renderCostCenterInfo = useMemo(() => {
    const costCenterCode = `
      ${formData.division_list?.code || ''}
      ${formData.department_list?.code || ''}
      ${formData.section_list?.code || ''}
      ${formData.sub_section_list?.code || ''}
    `;

    return (
      <div className="flex items-center">
        <div className="text-[14px] font-stolzlRegular mr-[5px]">
          Cost Center Code:
        </div>
        <div className="text-[22px] font-stolzlMedium">
          {costCenterCode.replace(/\D/g, '')}
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueCode, formData]);

  const handleDeleteModal = useCallback(
    (modal, editModalName, id = null) => {
      setShowDeleteModal(modal);
      setCodeNumber(modal ? id : null);
      setEditModal(editModalName);
      // disable scroll when modal is shown
      if (modal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
        // handleModal(null);
      }
    },
    [setShowDeleteModal, setEditModal, setCodeNumber]
  );

  const onChangeSelectHandler = useCallback(
    (value, name, codeName, setFieldValue, setFieldTouched, setFieldError) => {
      if (name === 'division_list.code') {
        // manipulate division_list parallel to intialized validationSchema
        const divisionListName = name.split('.').slice(0, 1);
        const division = name.split('_').slice(0, 1);

        setFormData(prevState => ({
          ...prevState,
          [divisionListName]: {
            code: value,
            name: codeName
          }
        }));

        setSelectedOption(prevState => ({
          ...prevState,
          [division]: value
        }));
      } else {
        setSelectedOption(prevState => ({
          ...prevState,
          [name]: value
        }));

        setFormData(prevState => ({
          ...prevState,
          [`${name}_list`]: {
            code: value,
            name: codeName
          }
        }));
      }

      setFieldValue(name, value);
      setFieldTouched(name, true);
      setFieldError(name, '');
      setFormValidation('');
    },
    [setFormData]
  );

  const fetchCostCenter = async code => {
    const response = await getCostCenterByIDService(code);
    if (response.data) {
      const responseData = response.data;
      Object.keys(response.data).forEach(formKey => {
        if (typeof formData[formKey] === 'undefined') {
          delete responseData[formKey];
        }
      });
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

    if (name === 'remarks' && initialValue) {
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

    setSelectedOption(prevState => ({
      ...prevState,
      [name]: fieldValue
    }));

    setFieldValue(name, fieldValue);
    setFieldTouched(name, true);
    setFieldError(name, '');
    setFormValidation('');
  };

  const handSelectChange = value => {
    setFormData(prevState => ({
      ...prevState,
      status: value
    }));
  };

  const fetchNewCostCenterList = async () => {
    getCostCenterDataItems(1)
      .then(() => {
        dispatch(getAllCostCenterService());
        dispatch(getAllCostCenterItems());
      })
      .catch(err => {
        return err;
      });
  };

  const updateCostCenterInfo = async (code, payload) => {
    const res = await updateCostCenterService(code, payload);
    if (res.status === 200) {
      toast.success('Successfully Updated!', { icon: <CgCheckO /> });
      handleModal(null);
      fetchNewCostCenterList();
    } else if (res.status === 409) {
      setFormValidation('Cost Center already exists');
    } else if (res.status === 400) {
      setFormValidation(`Unable to update existing cost center ${code}`);
    } else if (res.status === 405) {
      setFormValidation(`Unable to update: Cost Center ${code}`);
    }
  };

  const addCostCenterInfo = async payload => {
    const res = await addCostCenterService(payload);
    if (res.status === 201) {
      toast.success('Successfully Added!', { icon: <CgCheckO /> });
      handleModal(null);
      fetchNewCostCenterList();
    } else if (res.status === 400) {
      setFormValidation('Failed to add Cost Center!');
    } else if (res.status === 409) {
      setFormValidation('Cost Center already exists');
    }
  };

  const handleSubmit = useCallback(async () => {
    if (uniqueCode) {
      const transformedObject = {
        division: formData.division_list?.code || '',
        department: formData.department_list?.code || '',
        section: formData.section_list?.code || '',
        sub_section: formData.sub_section_list?.code || '',
        remarks: formData.remarks || ''
      };

      const updateFormData = transformedObject;
      Object.keys(transformedObject).forEach(formKey => {
        if (transformedObject[formKey] === '') {
          // Remove field consist no value
          delete updateFormData[formKey];
        }
      });

      // UPDATE COST CENTER CODE
      updateCostCenterInfo(uniqueCode, updateFormData);
    } else {
      // ADD COST CENTER CODE
      const trimWhiteSpace = selectedOption?.remarks;
      if (selectedOption?.remarks) {
        if (blankSpaceRegex2.test(trimWhiteSpace)) {
          selectedOption.remarks = trimWhiteSpace.trim();
        }
        selectedOption.remarks.trimEnd();
      }
      addCostCenterInfo(selectedOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCostCenterInfo, updateCostCenterInfo]);

  const divisionListSchema = Yup.object().shape({
    code: Yup.string().required('Required')
  });

  const validationSchema = Yup.object().shape({
    uniqueCode: Yup.string(),
    division_list: divisionListSchema,
    remarks: Yup.string()
      .required('Required')
      .test('is-not-blank-space', 'Required', value => {
        if (!value || !value.trim()) {
          return false;
        }
        return true;
      })
  });

  useEffect(() => {
    if (uniqueCode) {
      fetchCostCenter(uniqueCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formData,
    costcenter,
    userByID,
    isDropdownDisplayed,
    selectedOption,
    renderCostCenterInfo,
    divisionList,
    departmentList,
    sectionList,
    subSectionList,
    setDropdownDisplayed,
    handleChange,
    handSelectChange,
    handleSubmit,
    handleTrimSpaces,
    divisionListSchema,
    validationSchema,
    formValidation,
    handleDeleteModal,
    codeNumber,
    showDeleteModal,
    editModal,
    onChangeSelectHandler,
    currentCodeValue,
    divisionOptions,
    departmentOptions,
    sectionOptions,
    subSectionOptions
  };
};

useAddEditModal.propTypes = {
  handleModal: PropTypes.func,
  uniqueCode: PropTypes.string
};

export { useAddEditModal };
