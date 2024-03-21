/* eslint-disable no-nested-ternary */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CgCheckO } from 'react-icons/cg';
import PropTypes from 'prop-types';
import {
  addUser,
  getAllUsersService,
  updateUserImage
} from 'src/api/modules/base/user';
import { ENV } from 'src/api/config';
import { toast } from 'react-toastify';
import { getAllUsers } from '@baseStores/users/userActions';
import * as Yup from 'yup';
import { getCostCenter } from '@baseUtils';
import { IoWarningOutline } from 'react-icons/io5';
import { EMAILREGEX } from '@baseUtils/constants';

const useAddModal = ({ handleModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    cost_center_code: '',
    image: '',
    email: '',
    user_code: '',
    status: 'N',
    is_system_admin: false,
    password: 'test'
  });

  const costcenter = useSelector(state => state.costCenter.all);
  const { user } = useSelector(state => state?.user?.user);
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDropdownDisplayed, setDropdownDisplayed] = useState(false);
  const [isAdminCheckboxDisabled, setIsAdminCheckboxDisabled] = useState(false);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [emailValidation, setEmailValidation] = useState('');

  const image = useMemo(() => {
    if (formData.image) {
      return `${ENV.url}/${formData.image}`;
    }
    return null;
  }, [formData.image]);

  const renderUserInfo = useMemo(() => {
    return (
      <div className="pl-[8px]">
        <div
          className={`text-[22px] mb-1 mt-[17px] font-bold font-stolzlMedium ${
            formData?.first_name || formData?.last_name ? '' : 'text-[#EAEAEA]'
          }`}
        >
          {formData?.first_name || formData?.last_name
            ? `${formData?.first_name} ${formData?.last_name} ${formData?.suffix}`
            : 'Auto Input Name'}
        </div>
        <div
          className={`text-[14px] mb-[10px] font-stolzlRegular ${
            formData?.email ? '' : 'text-[#EAEAEA]'
          }`}
        >
          {`${formData?.email || 'Auto Input Email Address'}`}
        </div>
      </div>
    );
  }, [formData]);

  const handleStatusChange = useCallback(
    (value, name, setFieldValue, setFieldTouched, setFieldError) => {
      setFormData(prevState => ({
        ...prevState,
        cost_center_code: value
      }));
      setFieldValue(name, value);
      setFieldTouched(name, true);
      setFieldError(name, '');
    },
    [setFormData]
  );

  const toUpperCase = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const costCenterOptions = costcenter?.items.map(costCenterData => {
    return {
      value: costCenterData.cost_center_code,
      label: costCenterData.cost_center_code
    };
  });

  const handleChange = (e, setFieldValue, setFieldTouched, setFieldError) => {
    const { name, value, checked, type } = e.target;
    const fieldValue =
      type === 'checkbox'
        ? checked
        : type === 'text' && name !== 'email'
        ? toUpperCase(value)
        : value;

    const initialValue = value.match(/^\s/) !== null;

    if (
      (name === 'first_name' && initialValue) ||
      (name === 'middle_name' && initialValue) ||
      (name === 'last_name' && initialValue) ||
      (name === 'suffix' && initialValue) ||
      (name === 'email' && initialValue) ||
      (name === 'user_code' && initialValue)
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
    if (name === 'email') setEmailValidation('');
  };
  const handSelectChange = value => {
    setFormData(prevState => ({
      ...prevState,
      status: value
    }));
  };

  const customToastStyle = {
    fontSize: '14px',
    letterSpacing: '0em'
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const validateFile = async file => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 4 * 1024 * 1024; // 4 MB
    if (!allowedTypes.includes(file.type)) {
      toast.warning(
        <div>
          File type not supported
          <span className="block text-sm">
            (Only JPEG/JPG and PNG files are allowed)
          </span>
        </div>,
        { icon: <IoWarningOutline /> }
      );
    } else if (file.size > maxSize) {
      // File size is too large
      toast.warning(
        <div>
          File is too large.
          <span className="block text-sm">(Maximum file size is 4 MB)</span>
        </div>,
        { icon: <IoWarningOutline /> }
      );
    } else {
      previewFile(file);
      setUserImage(file);
    }
  };

  const handleImageChange = useCallback(
    (event, { setFieldValue, setFieldTouched, setFieldError }) => {
      const file = event.target.files[0];

      setFieldValue('image', file);
      setFieldTouched('image', true);
      setFieldError('image', '');
      validateFile(file);
      if (file) setImageUpdate(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchNewUserList = async () => {
    getAllUsersService(1)
      .then(res => {
        dispatch(getAllUsers(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  const handleSubmit = useCallback(async () => {
    // ADD
    const res = await addUser(formData);
    if (res.status === 201) {
      // update if there's image set
      if (userImage) {
        const imageData = new FormData();
        imageData.append('user_id', res.data.data.user.id);
        imageData.append('image', userImage);
        updateUserImage(imageData).then(response => {
          if (response.success) {
            fetchNewUserList();
            toast.success('Successfully Added!', {
              icon: <CgCheckO />
            });
            handleModal(null);
            setFormData(formData);
          }
        });
      } else {
        fetchNewUserList();
        toast.success('Successfully Added!', {
          icon: <CgCheckO />
        });
        handleModal(null);
        setFormData(formData);
      }
    } else {
      setEmailValidation('Email already exists!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addUser]);

  const nameRegex = /^[a-zA-Z .-]+(\.[a-zA-Z .-]+)*$/;
  const nameMessage =
    'Only letters with spaces, hyphens, or periods are allowed';

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(nameRegex, nameMessage)
      .max(50, 'Maximum of 50 characters allowed')
      .required('Required')
      .trim(),
    middle_name: Yup.string()
      .matches(nameRegex, nameMessage)
      .max(50, 'Maximum of 50 characters allowed')
      .trim(),
    last_name: Yup.string()
      .matches(nameRegex, nameMessage)
      .max(50, 'Maximum of 50 characters allowed')
      .required('Required')
      .trim(),
    suffix: Yup.string()
      .nullable()
      .matches(nameRegex, nameMessage)
      .max(5, 'Maximum of 5 characters allowed')
      .trim(),
    user_code: Yup.string().nullable().required('Required').trim(),
    email: Yup.string()
      .email('Invalid email address')
      .matches(EMAILREGEX, 'Invalid email address')
      .required('Required')
      .max(255, 'Maximum of 255 characters allowed')
      .test(
        'is-lcnc-inc-email',
        'Only @lcnc.inc email address is allowed',
        function check(value) {
          if (value) {
            return value.endsWith('@lcnc.inc');
          }
          return true;
        }
      )
      .test('email-unique', 'Email already exists', async value => {
        if (!value) return true;
        const searchParams = { email: value };
        const response = await getAllUsersService(1, searchParams);

        if (response.data?.items.length) {
          return false;
        }

        return true;
      })
      .trim(),
    cost_center_code: Yup.string().required('Required'),
    image: Yup.lazy(value => {
      if (value) {
        return Yup.string().required('Required');
      }
      return Yup.mixed()
        .test('fileType', 'Only JPEG and PNG files are allowed', val => {
          if (val) {
            return val && ['image/jpeg', 'image/png'].includes(val.type);
          }
          return true;
        })
        .test('fileSize', 'File size exceeds maximum limit (4mb)', val => {
          if (val) {
            return val && val.size <= 4 * 1024 * 1024; // 4MB
          }
          return true;
        });
    })
  });

  useEffect(() => {
    setIsAdminCheckboxDisabled(!user?.is_system_admin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formData,
    costcenter,
    image,
    userImage,
    previewImage,
    isDropdownDisplayed,
    isAdminCheckboxDisabled,
    user,
    renderUserInfo,
    costCenterOptions,
    setDropdownDisplayed,
    handleChange,
    handleStatusChange,
    handSelectChange,
    validateFile,
    previewFile,
    handleImageChange,
    handleSubmit,
    validationSchema,
    emailValidation
  };
};

useAddModal.propTypes = {
  handleModal: PropTypes.func
};

export { useAddModal };
