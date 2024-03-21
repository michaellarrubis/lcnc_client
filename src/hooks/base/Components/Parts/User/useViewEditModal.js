/* eslint-disable no-nested-ternary */
import { useState, useEffect, useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { IoWarningOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { CgCloseO, CgCheckO } from 'react-icons/cg';

import {
  addUser,
  getAllUsersService,
  getUserByIDService,
  updateUserService,
  updateUserImage
} from 'src/api/modules/base/user';

import { ENV } from 'src/api/config';
import { getAllUsers } from '@baseStores/users/userActions';
import { getCostCenter } from '@baseUtils';
import { EMAILREGEX } from '@baseUtils/constants';

const useViewEditModal = ({ handleModal, userId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    cost_center_code: '',
    user_code: '',
    image: '',
    email: '',
    status: 'A',
    is_system_admin: false,
    password: 'test'
  });

  const costcenter = useSelector(state => state.costCenter.all);
  const userByID = useSelector(state => state?.user?.user);
  const userLoggedInID = useSelector(state => state.user.user.user.id);
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isAdminCheckboxDisabled, setIsAdminCheckboxDisabled] = useState(false);
  const [user, setUser] = useState(null);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [emailValidation, setEmailValidation] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const initialDummyData = formData;

  const image = useMemo(() => {
    if (userId && formData.image) {
      return `${ENV.url}/${formData.image}`;
    }
    return null;
  }, [userId, formData.image]);

  const renderUserInfo = useMemo(() => {
    if (userId) {
      return (
        <div className="pl-[8px]">
          <div className="text-[22px] mb-1 mt-[17px] font-bold font-stolzlMedium">
            {user?.first_name || user?.last_name || user?.suffix
              ? `${user?.first_name} ${user?.last_name} ${user?.suffix ?? ''}`
              : 'Auto Input Name'}
          </div>
          <div className="text-[14px] mb-[10px] font-stolzlRegular">
            {user?.email || 'Auto Input Email Address'}
          </div>
        </div>
      );
    }
    return (
      <div className="pl-[8px]">
        <div
          className={`text-[22px] mb-1 mt-[17px] font-bold font-stolzlMedium ${
            formData?.first_name || formData?.last_name ? '' : 'text-[#EAEAEA]'
          }`}
        >
          {formData?.first_name || formData?.last_name || formData?.suffix
            ? `${formData?.first_name} ${formData?.last_name}  ${formData?.suffix}`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, formData]);

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

  const fetchUser = async userID => {
    const response = await getUserByIDService(userID);

    if (response.data) {
      const responseData = response.data;
      Object.keys(response.data).forEach(formKey => {
        if (typeof formData[formKey] === 'undefined') {
          delete responseData[formKey];
        }
      });
      setUser(responseData);
      setFormData(responseData);
    }
  };

  const toUpperCase = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const costCenterOptions =
    costcenter?.items.map(costCenterData => {
      return {
        value: costCenterData.cost_center_code,
        label: costCenterData.cost_center_code
      };
    }) ?? [];

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

    if (name === 'email') setEmailValidation('');
    setFieldValue(name, fieldValue);
    setFieldTouched(name, true);
    setFieldError(name, '');
  };
  const handSelectChange = value => {
    setFormData(prevState => ({
      ...prevState,
      status: value
    }));
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
      if (userId)
        setFormData(prevState => ({
          ...prevState,
          image: file
        }));
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

  const updateUserInfo = async (id, payload) => {
    updateUserService(id, payload)
      .then(response => {
        if (response.success) {
          fetchNewUserList();
          toast.success('Successfully Updated!', {
            icon: <CgCheckO />,
            toastId: id
          });
          handleModal(null);
        } else if (response.response.status === 500)
          setEmailValidation('Email already exists!');
        setFormData(formData);
      })
      .catch(err => {
        toast.error(err, { icon: <CgCloseO /> });
      });
  };

  const handleSubmit = useCallback(async () => {
    console.log('submitting:');
    if (userId) {
      // EDIT
      if (imageUpdate) {
        const imageData = new FormData();
        imageData.append('user_id', userId);
        imageData.append('image', userImage);
        updateUserImage(imageData).then(response => {
          if (response.success) {
            setFormData(prevState => ({
              ...prevState,
              image: response.data.image
            }));
            const payload = { ...formData, image: response.data.image };
            updateUserInfo(userId, payload);
          }
        });
      } else {
        updateUserInfo(userId, formData);
      }
    } else {
      // ADD
      const emailFormat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (formData.email.match(emailFormat)) {
        console.log('else: form.match');
        const res = await addUser(formData);
        if (res.status === 201) {
          // update if there's image set
          if (userImage) {
            const imageData = new FormData();
            imageData.append('user_id', res.data.data.id);
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
        }
        setEmailValidation(res.data.errors.email);
      } else {
        console.log('else: form.not.match');
        setEmailValidation('Invalid email address');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserInfo, addUser]);

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
      .nullable()
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
    user_code: Yup.string().required('Required').trim(),
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
      .trim(),
    cost_center_code: Yup.string().required('Required'),
    userId: Yup.string(),
    image: Yup.lazy(value => {
      if (value && userId) {
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
    // setIsAdminCheckboxDisabled(
    //   !(userByID?.user.is_system_admin && userByID?.user.id !== userId)
    // );

    if (userId) {
      fetchUser(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formData,
    costcenter,
    image,
    userByID,
    userImage,
    previewImage,
    isAdminCheckboxDisabled,
    initialDummyData,
    user,
    renderUserInfo,
    isEdit,
    costCenterOptions,
    setIsEdit,
    handleChange,
    handleStatusChange,
    fetchUser,
    handSelectChange,
    validateFile,
    previewFile,
    handleImageChange,
    handleSubmit,
    validationSchema,
    userLoggedInID,
    emailValidation
  };
};

useViewEditModal.propTypes = {
  handleModal: PropTypes.func,
  userId: PropTypes.string
};

export { useViewEditModal };
