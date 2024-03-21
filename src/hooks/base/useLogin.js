/* eslint-disable import/no-unresolved */
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginService } from 'src/api/modules/base/login';

import { setUser } from '@baseStores/users/userActions';
import { EMAILREGEX } from '@baseUtils/constants';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMountedRef = useRef(true);

  const RESPONSE_ERROR = {
    PASSWORD: 'Invalid password',
    EMAIL: 'User not registered',
    UNREGISTERED: 'User not registered',
    INTERNAL_SERVER: 'Internal Server Error',
    UNAUTHORIZED: 'Unauthorized',
    NOT_ACTIVATED: 'User was not activated or cancelled',
    INVALID_CREDENTIALS: 'Invalid User Credentials'
  };

  const ERROR_MESSAGE = {
    INCORRECT_EMAIL: 'The inputted email does not exist in the system',
    INCORRECT_PASSWORD: 'Incorrect Password',
    INVALID_EMAIL: 'Invalid e-mail',
    UNREGISTERED_EMAIL: 'The inputted email does not exist in the system',
    INVALID_CREDENTIALS: 'Invalid User Credentials'
  };

  const initialFormData = {
    userEmailCode: '',
    password: ''
  };

  const initialValidation = {
    userEmailCode: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validation, setValidation] = useState(initialValidation);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const inputRef = useRef(null);

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const togglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
    inputRef.current.focus();
  };

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setValidation(() => ({
        ...initialValidation,
        email: 'Invalid email address'
      }));
      return false;
    }
    if (!email.endsWith('@lcnc.inc')) {
      setValidation(() => ({
        ...initialValidation,
        email: 'Invalid email: Email domain must end with @lcnc.inc'
      }));
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    const { userEmailCode, password } = formData;

    setIsLoading(true);
    const res = await loginService({
      userEmailCode,
      password
    });

    if (res.token) {
      dispatch(setUser(res));

      if (!isMountedRef.current) return;
      navigate(`/`);
      return;
    }

    switch (res.data.message) {
      case RESPONSE_ERROR.INVALID_CREDENTIALS:
        setValidation(() => ({
          ...initialValidation,
          password: ERROR_MESSAGE.INVALID_CREDENTIALS
        }));
        break;
      case RESPONSE_ERROR.EMAIL:
        setValidation(() => ({
          ...initialValidation,
          userEmailCode: ERROR_MESSAGE.INCORRECT_EMAIL
        }));
        break;
      case RESPONSE_ERROR.PASSWORD:
        setValidation(() => ({
          ...initialValidation,
          password: ERROR_MESSAGE.INCORRECT_PASSWORD
        }));
        break;
      case RESPONSE_ERROR.NOT_ACTIVATED:
        setValidation(() => ({
          ...initialValidation,
          userEmailCode: RESPONSE_ERROR.NOT_ACTIVATED
        }));
        break;
      case RESPONSE_ERROR.UNAUTHORIZED:
        toast.error(res.data.message);
        break;
      default:
        if (formData.userEmailCode.match(EMAILREGEX)) {
          setValidation(() => ({
            ...initialValidation,
            userEmailCode: ERROR_MESSAGE.UNREGISTERED_EMAIL
          }));
          break;
        }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setIsButtonEnabled(
      !!(
        formData.userEmailCode !== '' &&
        formData.password !== '' &&
        !isLoading
      )
    );
  }, [formData, isLoading]);

  return {
    formData,
    validation,
    isButtonEnabled,
    isLoading,
    companyLogo,
    handleChange,
    handleLoginSubmit,
    togglePassword,
    showPassword,
    inputRef
  };
};
