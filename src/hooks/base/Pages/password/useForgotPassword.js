import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userResetPassword } from 'src/api/modules/base/user';
import * as Yup from 'yup';

export const useForgotPassword = () => {
  const navigate = useNavigate();

  const initialFormData = {
    email: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailUnregistered, setIsEmailUnregistered] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleChange = (e, setFieldValue, setFieldTouched, setFieldError) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setFieldValue('email', e.target.value);
    setFieldTouched('email', true);
    setFieldError('email', '');
    setIsEmailUnregistered(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await userResetPassword(formData);
    if (isMounted) {
      if (res.data.statusCode === 200) {
        navigate('/forgot-password/sent', { state: { email: formData.email } });
      } else {
        setIsEmailUnregistered(true);
      }
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  });

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (formData.email !== '' && !isEmailUnregistered && !isLoading) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isLoading]);

  return {
    formData,
    isLoading,
    isEmailUnregistered,
    isButtonEnabled,
    validationSchema,
    handleChange,
    handleSubmit
  };
};
