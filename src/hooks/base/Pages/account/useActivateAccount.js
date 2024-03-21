import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userActivateAccount } from 'src/api/modules/base/user';
import { CgCloseO, CgCheckO } from 'react-icons/cg';

export const useActivateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const initialFormData = {
    password: '',
    confirmPassword: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRef = useRef(null);
  const inputConfirmRef = useRef(null);

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
    inputConfirmRef.current.focus();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await userActivateAccount(formData, token);
    if (isMounted) {
      if (res.data.statusCode === 200) {
        toast.success('Account Successfully Activated!', {
          icon: <CgCheckO />
        });
        navigate('/');
      } else {
        toast.error('Activation Link Expired!', {
          icon: <CgCloseO />
        });
      }
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (
      formData.password !== '' &&
      formData.confirmPassword !== '' &&
      !isLoading
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [formData, isLoading]);

  return {
    inputRef,
    inputConfirmRef,
    formData,
    isLoading,
    validationSchema,
    isButtonEnabled,
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    handleChange,
    handleSubmit
  };
};
