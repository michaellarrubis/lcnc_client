import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userCreateNewPassword } from 'src/api/modules/base/user';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { CgCloseO } from 'react-icons/cg';

export const useCreateNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const initialFormData = {
    newPassword: '',
    confirmPassword: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfimPassword, setShowConfirmPassword] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e, setFieldValue, setFieldTouched, setFieldError) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFieldValue(name, value);
    setFieldTouched(name, true);
    setFieldError(name, '');
  };

  const togglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
    inputRef.current.focus();
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(prevShowPassword => !prevShowPassword);
    inputRef.current.focus();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await userCreateNewPassword(formData, token);
    if (isMounted) {
      if (res.data.statusCode === 200) {
        navigate('/password-reset');
      } else {
        toast.error('Reset Password Link Expired!', {
          icon: <CgCloseO />
        });
      }
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (
      formData.newPassword !== '' &&
      formData.confirmPassword !== '' &&
      !isLoading
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [formData, isLoading]);

  return {
    formData,
    isLoading,
    isButtonEnabled,
    validationSchema,
    showPassword,
    showConfimPassword,
    handleChange,
    handleSubmit,
    togglePassword,
    toggleConfirmPassword
  };
};
