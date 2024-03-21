import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getUserByIDService } from 'src/api/modules/base/user';
import { ENV } from 'src/api/config';

const useViewModal = ({ userId }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    cost_center_code: '',
    image: '',
    email: '',
    status: 'A',
    is_system_admin: false,
    employee_id: null,
    password: 'test'
  });

  const costcenter = useSelector(state => state.costCenter.costCenterList);
  const userByID = useSelector(state => state);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDropdownDisplayed, setDropdownDisplayed] = useState(false);
  const [textboxValue, setTextboxValue] = useState('');
  const [user, setUser] = useState('');

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
              ? `${user?.first_name} ${user?.last_name} ${user?.suffix}`
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
            ? `${formData?.first_name} ${formData?.last_name} ${formData?.suffix}`
            : 'Auto Input Name'}
        </div>
        <div
          className={`text-[14px] mb-1.5 font-stolzlRegular ${
            formData.employee_id ? '' : 'text-[#EAEAEA]'
          }`}
        >
          {`ID: ${formData.employee_id || ' '}`}
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

  const fetchUser = async userID => {
    const response = await getUserByIDService(userID);

    if (response.data) {
      const responseData = response.data;
      Object.keys(response.data).forEach(formKey => {
        if (typeof formData[formKey] === 'undefined') {
          delete responseData[formKey];
        }
      });
      setUser(response.data);
      setFormData(response.data);
    }

    setTextboxValue(response.data.cost_center_code);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  useEffect(() => {
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
    previewImage,
    isDropdownDisplayed,
    textboxValue,
    user,
    renderUserInfo,
    setDropdownDisplayed,
    fetchUser,
    previewFile
  };
};

useViewModal.propTypes = {
  userId: PropTypes.string
};

export { useViewModal };
