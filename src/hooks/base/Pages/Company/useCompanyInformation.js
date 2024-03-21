import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCompany } from '@baseStores//companyInfo/companyInfoActions';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
  updateCompanyService,
  updateCompanyImage
} from 'src/api/modules/base/companyInformation';
import { toast } from 'react-toastify';
import { CgCheckO } from 'react-icons/cg';
import { IoWarningOutline } from 'react-icons/io5';
import { MENU_CODES, EMAILREGEX } from '@baseUtils/constants';
import { getUserMenusServiceByMenuCode } from 'src/api/modules/base/userMenus';

export const useCompanyInformation = () => {
  const companyInfo = {
    name: '',
    description: '',
    url: '',
    address: '',
    phone_no: '',
    email_settings: {
      report_emails: [],
      sender_email: '',
      contact_us_email: ''
    },
    social_media: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  };

  const [formData, setFormData] = useState(companyInfo);
  const dispatch = useDispatch();
  const company = useSelector(state => state.userCompany);
  const [companyImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [saveDisable, setSaveDisable] = useState(true);
  const [fileExceed, setFileExceed] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const newLocation = { ...location, search: '' };
    navigate(newLocation);

    getUserMenusServiceByMenuCode(MENU_CODES.companyInformation).then(res => {
      if (!res.data.length) window.location.href = '/access-denied';
    });
    dispatch(getCompany());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (company?.company?.logo) {
      setLogoUrl(company.company.logo);
    }
  }, [company]);

  const removeJSOG = obj => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    const newObj = {};
    Object.keys(obj).forEach(key => {
      if (key !== '__jsogObjectId') {
        if (typeof obj[key] === 'object') {
          newObj[key] = removeJSOG(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
    });
    return newObj;
  };

  const CompanyInfo = () => {
    const responseKeys1 = Object.keys(company.company);
    responseKeys1.forEach(key => {
      // eslint-disable-next-line no-prototype-builtins
      if (
        typeof formData[key] === 'undefined' &&
        // eslint-disable-next-line no-prototype-builtins
        !companyInfo.hasOwnProperty(key)
      ) {
        delete company.company[key];
      }
      const data = removeJSOG(company.company);
      setFormData(data);
    });
  };

  useEffect(() => {
    if (company) {
      CompanyInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  const handleChange = (e, setFieldValue, setFieldTouched, setFieldError) => {
    const { name, value } = e.target;
    const initialValue = value.match(/^\s/) !== null;

    if (name.includes('.')) {
      const [parentName, childName] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        [parentName]: {
          ...prevState[parentName],
          [childName]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    if (
      (name === 'name' && initialValue) ||
      (name === 'url' && initialValue) ||
      (name === 'phone_no' && initialValue) ||
      (name === 'address' && initialValue) ||
      (name === 'description' && initialValue)
    ) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value.trim()
      }));
    }

    const splitName = name.split('.')[1];

    if (e.target.classList.contains('email_settings')) {
      if (
        (splitName === 'report_emails' && initialValue) ||
        (splitName === 'sender_email' && initialValue) ||
        (splitName === 'contact_us_email' && initialValue)
      ) {
        setFormData(prevState => ({
          ...prevState,
          email_settings: {
            ...prevState.email_settings,
            [splitName]: value.trim()
          }
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          email_settings: {
            ...prevState.email_settings,
            [splitName]: value
          }
        }));
      }
    }
    if (e.target.classList.contains('social_media')) {
      if (
        (splitName === 'facebook' && initialValue) ||
        (splitName === 'instagram' && initialValue) ||
        (splitName === 'twitter' && initialValue) ||
        (splitName === 'linkedin' && initialValue)
      ) {
        setFormData(prevState => ({
          ...prevState,
          social_media: {
            ...prevState.social_media,
            [splitName]: value.trim()
          }
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          social_media: {
            ...prevState.social_media,
            [splitName]: value
          }
        }));
      }
    }

    setSaveDisable(false);
    setFieldValue(name, value);
    setFieldTouched(name, true);
    setFieldError(name, '');
    if (fileExceed) setSaveDisable(true);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const validateFile = async (file, selectedFiles) => {
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
      toast.warning(
        <div>
          File is too large.
          <span className="block text-sm">(Maximum file size is 4 MB)</span>
        </div>,
        { icon: <IoWarningOutline /> }
      );
      setFileExceed(true);
      setSaveDisable(true);
    } else {
      setFiles(selectedFiles);
      previewFile(file);
      setUserImage(file);
      setFileExceed(false);
      if (!saveDisable) setSaveDisable(false);
    }
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const file = event.dataTransfer.files;
    validateFile(file[0], droppedFiles);
  };

  const handleImageChange = useCallback(
    (event, { setFieldValue, setFieldTouched, setFieldError }) => {
      const selectedFiles = Array.from(event.target.files);
      const file = event.target.files[0];

      setFieldValue('logo', file);
      setFieldTouched('logo', true);
      setFieldError('logo', '');
      validateFile(file, selectedFiles);
      if (file) setImageUpdate(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateCompanyInfo = async payload => {
    updateCompanyService(payload)
      .then(response => {
        if (response.success) {
          toast.success('Successfully Updated!', {
            icon: <CgCheckO />,
            toastId: 1
          });
        }
        setFormData(formData);
      })
      .catch(err => {
        toast.error(err, { icon: <IoWarningOutline /> });
      });
  };

  const handleSubmit = useCallback(async () => {
    const updatedFormData = { ...formData };

    if (
      updatedFormData.email_settings.report_emails &&
      typeof updatedFormData.email_settings.report_emails === 'string'
    ) {
      updatedFormData.email_settings.report_emails =
        updatedFormData.email_settings.report_emails
          .split(',')
          .map(email => email.trim());
    }

    try {
      if (imageUpdate && companyImage) {
        const imageData = new FormData();
        imageData.append('image', companyImage);
        const imageResponse = await updateCompanyImage(imageData);

        if (imageResponse.success) {
          updatedFormData.logo = imageResponse.data.image;
        }
      }
      await updateCompanyInfo(updatedFormData);
      dispatch(getCompany());
      toast.success('Successfully Updated!', {
        icon: <CgCheckO />,
        toastId: 1
      });
      setSaveDisable(true);
    } catch (err) {
      toast.error(err, { icon: <IoWarningOutline /> });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUpdate, companyImage, formData, updateCompanyInfo]);

  const emailValue = value => {
    return value.indexOf(',') !== -1
      ? value.split(',').map(email => email.trim())
      : value;
  };

  const emailCheck = Yup.string()
    .trim()
    .max(255, 'Maximum of 255 characters allowed')
    .test('is-valid-email', 'Invalid email address', function check(value) {
      if (value) {
        const emails = emailValue(value);
        if (typeof emails === 'string') {
          if (!EMAILREGEX.test(emails)) {
            return false;
          }
        } else {
          // eslint-disable-next-line no-restricted-syntax
          for (const email of emails) {
            if (!EMAILREGEX.test(email)) {
              return false;
            }
          }
        }
      }
      return true;
    })
    .test(
      'is-lcnc-inc-email',
      'Only @lcnc.inc email address is allowed',
      function check(value) {
        if (value) {
          const emails = emailValue(value);
          if (typeof emails === 'string') {
            if (!emails.endsWith('@lcnc.inc')) {
              return false;
            }
          } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const email of emails) {
              if (!email.endsWith('@lcnc.inc')) {
                return false;
              }
            }
          }
        }
        return true;
      }
    );

  const emailSchema = Yup.object().shape({
    report_emails: emailCheck
      .required('Required')
      .test('is-not-blank-space', 'Required', value => {
        if (!value || !value.trim()) {
          return false;
        }
        return true;
      }),
    sender_email: emailCheck,
    contact_us_email: emailCheck
  });

  const urlSchema = Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Invalid URL'
  );

  const socialMediaSchema = Yup.object().shape({
    facebook: urlSchema,
    instagram: urlSchema,
    twitter: urlSchema,
    linkedin: urlSchema
  });

  const validationSchema = Yup.object().shape({
    url: Yup.string()
      .matches(
        /^(https?):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
        'Invalid URL'
      )
      .max(255, 'Maximum of 255 characters allowed'),
    name: Yup.string()
      .required('Company name is required')
      .max(50, 'Maximum of 50 characters allowed')
      .test('is-not-blank-space', 'Company name is required', value => {
        if (!value || !value.trim()) {
          return false;
        }
        return true;
      }),
    email_settings: emailSchema,
    social_media: socialMediaSchema,
    phone_no: Yup.number()
      .typeError('Must be a number')
      .test('maxDigits', 'Maximum of 15 digits allowed', value => {
        if (value === null || value === undefined || value === '') {
          return true;
        }
        const stringValue = String(value);
        return stringValue.length <= 15;
      })
      .nullable(),
    address: Yup.string().max(255, 'Maximum of 255 characters allowed'),
    description: Yup.string().max(255, 'Maximum of 255 characters allowed')
  });

  const initialValues = {
    url: '',
    name: 'Company name',
    email_settings: {
      report_emails: 'hrcebu@lcnc.inc',
      sender_email: '',
      contact_us_email: ''
    },
    social_media: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  };

  useEffect(() => {
    if (formData.email_settings.report_emails.constructor === Array) {
      const emailStr = formData.email_settings.report_emails
        ?.map(email => `${email.trim()}`)
        .join(',');

      setFormData(prevState => ({
        ...prevState,
        email_settings: {
          ...prevState.email_settings,
          report_emails: emailStr
        }
      }));
    }
  }, [formData]);

  return {
    formData,
    files,
    setFiles,
    inputRef,
    handleDrop,
    handleDragOver,
    saveDisable,
    companyImage,
    previewImage,
    logoUrl,
    validationSchema,
    emailSchema,
    initialValues,
    validateFile,
    previewFile,
    handleImageChange,
    handleChange,
    handleSubmit
  };
};
