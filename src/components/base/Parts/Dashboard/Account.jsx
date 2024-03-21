import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@baseComponents/Common/Button';
import { setUserByImage } from '@baseStores/users/userActions';
import { userChangePassword, updateUserImage } from 'src/api/modules/base/user';

import { ENV } from 'src/api/config';
import 'src/assets/base/css/account.scss';

const Account = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    old_password: '',
    new_password: '',
    confirm_password: ''
  };

  const initialValidation = {
    old_password: '',
    new_password: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validation, setValidation] = useState(initialValidation);
  const { user } = useSelector(state => state.user);
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const employeeName = `${user.user.first_name} ${user.user.last_name}`;

  const handleSubmit = async event => {
    event.preventDefault();
    if (formData.new_password === formData.confirm_password) {
      const response = await userChangePassword({
        ...formData,
        user_id: user.user.id
      });

      if (response.status === 200) {
        toast.success('Password change success!');
        setValidation(initialValidation);
        setFormData(initialFormData);
      } else if (response.data?.message === 'Invalid Password') {
        setValidation(prevState => ({
          ...prevState,
          old_password: 'Old password is incorrect!'
        }));
      } else {
        toast.error('Password change failed!');
      }
    } else {
      setValidation(prevState => ({
        ...prevState,
        new_password: "New password didn't match"
      }));
    }
  };

  const handleChange = event => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const validateFile = async file => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!allowedTypes.includes(file.type)) {
      // File type is not allowed
      toast.error(
        'File type not supported. Only JPEG/JPG and PNG files are allowed.'
      );
    } else if (file.size > maxSize) {
      // File size is too large
      toast.error('File is too large. Maximum file size is 2 MB.');
    } else {
      const imageData = new FormData();
      imageData.append('user_id', user.user.id);
      imageData.append('image', userImage);

      try {
        const { success, data } = await updateUserImage(
          imageData,
          progressEvent => {
            setProgress((progressEvent.loaded / progressEvent.total) * 100);
          }
        );

        if (success) {
          toast.success('User profile is updated!');
          dispatch(setUserByImage(`${ENV.url}/${data.image}`));
          setUserImage(null);
          setPreviewImage(null);
        } else {
          toast.error('Update failed, please try again!');
        }

        setProgress(0);
      } catch (error) {
        return error;
      }
    }

    return undefined;
  };

  const handleSubmitImage = event => {
    event.preventDefault();
    validateFile(userImage);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    setUserImage(file);
    previewFile(file);
  };

  return (
    <>
      <div className="account__row account__text-row">
        <div className="account__column">
          <h3 className="account__label">
            Employee Name
            <span className="account__item">{employeeName}</span>
          </h3>
        </div>
        <div className="account__column">
          <h3 className="account__label">
            Account Created
            <span className="account__item">{user.created_at}</span>
          </h3>
        </div>
      </div>

      <div className="account__flex">
        <form action="" method="POST" className="account__container">
          <div className="account__row account__input-row">
            <div className="account__column">
              <label className="account__label" htmlFor="old_password">
                Enter Old Password
                <input
                  id="old_password"
                  className="account__input"
                  name="old_password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.old_password}
                  onChange={handleChange}
                />
                {validation.old_password && (
                  <p className="account__hint">{validation.old_password}</p>
                )}
              </label>
            </div>
          </div>

          <div className="account__row account__input-row">
            <div className="account__column">
              <label className="account__label" htmlFor="new_password">
                Enter New Password
                <input
                  id="new_password"
                  className="account__input"
                  name="new_password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.new_password}
                  onChange={handleChange}
                />
                {validation.new_password && (
                  <p className="account__hint">{validation.new_password}</p>
                )}
              </label>
            </div>
          </div>
          <div className="account__row account__input-row">
            <div className="account__column">
              <label className="account__label" htmlFor="confirm_password">
                Re-enter New Password
                <input
                  id="confirm_password"
                  className="account__input"
                  name="confirm_password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="account__row account__input-row">
            <div className="account__column">
              <Button
                disabled={
                  !(
                    formData.confirm_password &&
                    formData.new_password &&
                    formData.old_password
                  )
                }
                modifier="bg-gray-400 hover:bg-gray-500 text-white p-[8px_14px] text-[12px] leading-[24px] rounded"
                type="submit"
                onClick={handleSubmit}
              >
                <span className="pl-[18px]">Change Password</span>
              </Button>
            </div>
          </div>
        </form>

        <form
          action=""
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmitImage}
          className="account__container account_upload-img"
        >
          <div className="account__row account__input-row">
            <div className="account__column">
              <h3 className="account__label">Profile Image</h3>

              {progress ? (
                <div className="account_image-progress">
                  {`Updating...${Math.round(progress)}%`}
                </div>
              ) : (
                ''
              )}

              <div className="account__image">
                {previewImage && (
                  <img
                    className="account__image-preview"
                    src={previewImage}
                    alt=""
                  />
                )}
                <span className="account__image-name">
                  {userImage ? (
                    userImage.name
                  ) : (
                    <div className="account__image-upload">
                      Drop file to upload <br />
                      or
                      <br /> Select a File
                    </div>
                  )}
                </span>
                <input
                  className="account__input account__input--file"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
                <div className="account__image-info">
                  <span>Maximum upload file size: 2MB</span>
                  <span>Allowed file size: .JPG, .JPEG, .PNG</span>
                </div>
              </div>
              {userImage ? (
                <Button
                  disabled={!userImage}
                  modifier="bg-gray-400 hover:bg-gray-500 text-white p-[8px_14px] text-[12px] leading-[24px] rounded mt-8"
                  type="submit"
                >
                  <span className="pl-[18px]">Upload</span>
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Account;
