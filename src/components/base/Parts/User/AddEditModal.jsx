/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Select from '@baseComponents/Common/Select';
import { STATUS_OPTIONS } from '@baseUtils/constants';
import defaultPicture from 'src/assets/base/icons/defaultProfile2.png';
import { useAddEditModal } from '@baseHooks/Components/Parts/User/useAddEditModal';

const AddEditModal = ({ handleModal, userId }) => {
  const {
    formData,
    costcenter,
    image,
    previewImage,
    isDropdownDisplayed,
    isAdminCheckboxDisabled,
    selectedOption,
    textboxValue,
    renderUserInfo,
    setDropdownDisplayed,
    handleChange,
    handleRadioChange,
    handSelectChange,
    handleImageChange,
    handleSubmit,
    validationSchema,
    userLoggedInID,
    emailValidation
  } = useAddEditModal({ handleModal, userId });

  return (
    <Formik
      enableReinitialize
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        setFieldError
      }) => (
        <Form id="userForm">
          {/* Modal Head Section | Start */}
          <h4 className="text-[22px] w-[394px] ml-[35px] font-bold leading-[27px] pb-5">
            {userId ? 'Edit' : 'Add'} User Info
          </h4>
          {/* Modal Head Section | End */}
          {/* Profile section | Start */}
          <div className="flex mx-[35px] w-[394px] border-solid border-b-[1px] border-[#eaeaea] pb-4">
            <div className="flex flex-col items-center justify-center">
              <div className="w-[120px] h-[120px] border-[1px] border-solid border-[#eaeaea] rounded">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <img
                    src={image || defaultPicture}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                )}
              </div>
              <div className="mt-1">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={e =>
                    handleImageChange(e, {
                      setFieldValue,
                      setFieldTouched,
                      setFieldError
                    })
                  }
                  hidden
                />
                <label
                  htmlFor="image"
                  className="text-[12px] underline text-[#458FFF] font-stolzlBook cursor-pointer hover:text-opacity-50"
                >
                  {userId ? `Change image` : `Upload image`}
                </label>
                {errors.image && (
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                  />
                )}
              </div>
            </div>
            {renderUserInfo}
          </div>

          {/* Profile section | End */}
          <div className="w-full">
            <div
              className={` px-[35px] mt-5 overflow-auto h-[calc(100vh-420px)]`}
            >
              <div className="mb-3">
                <label className="mb-2.5" htmlFor="first_name">
                  First Name <span className="text-[#E43B26]">*</span>
                </label>
                <Field
                  className={`w-full bg-white ${
                    errors.first_name && touched.first_name
                      ? 'border-[#E43B26] placeholder-[#E43B26] text-[10px]'
                      : 'border-[#eaeaea] text-[14px]'
                  }  h-10 pl-2 pr-3`}
                  type="text"
                  name="first_name"
                  value={formData.first_name ?? ''}
                  onChange={e =>
                    handleChange(
                      e,
                      setFieldValue,
                      setFieldTouched,
                      setFieldError
                    )
                  }
                />
                {touched.first_name && (
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                  />
                )}
              </div>
              <div className="mb-3 w-full">
                <label className="mb-2.5">Middle Name</label>
                <Field
                  className={`w-full bg-white ${
                    errors.middle_name && touched.middle_name
                      ? 'border-[#E43B26] placeholder-[#E43B26] text-[10px]'
                      : ''
                  } h-10 pl-2 pr-3`}
                  type="text"
                  name="middle_name"
                  value={formData.middle_name ?? ''}
                  onChange={e =>
                    handleChange(
                      e,
                      setFieldValue,
                      setFieldTouched,
                      setFieldError
                    )
                  }
                />
                {touched.middle_name && (
                  <ErrorMessage
                    name="middle_name"
                    component="div"
                    className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="mb-2.5">
                  Family Name <span className="text-[#E43B26]">*</span>
                </label>
                <Field
                  className={`w-full bg-white ${
                    errors.last_name && touched.last_name
                      ? 'border-[#E43B26] placeholder-[#E43B26] text-[10px]'
                      : 'border-[#eaeaea] text-[14px]'
                  }  h-10 pl-2 pr-3`}
                  type="text"
                  name="last_name"
                  value={formData.last_name ?? ''}
                  onChange={e =>
                    handleChange(
                      e,
                      setFieldValue,
                      setFieldTouched,
                      setFieldError
                    )
                  }
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2.5">Suffix</label>
                <Field
                  className={`w-full bg-white${
                    errors.suffix && touched.suffix
                      ? 'border-[#E43B26] placeholder-[#E43B26] text-[10px]'
                      : 'border-[#eaeaea] text-[14px]'
                  }  h-10 pl-2 pr-3`}
                  type="text"
                  name="suffix"
                  value={formData.suffix ?? ''}
                  onChange={e =>
                    handleChange(
                      e,
                      setFieldValue,
                      setFieldTouched,
                      setFieldError
                    )
                  }
                />
                {touched.suffix && (
                  <ErrorMessage
                    name="suffix"
                    component="div"
                    className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="mb-2.5">
                  Cost Center <span className="text-[#E43B26]">*</span>
                </label>
                <button
                  type="button"
                  className={`w-full h-10 p-[10px] flex items-center text-[#222222] ${
                    errors.cost_center_code && touched.cost_center_code
                      ? 'border-[#E43B26] placeholder-[#E43B26] text-[10px]'
                      : 'border-[#eaeaea] text-[14px]'
                  }  bg-white border rounded capitalize bg-no-repeat bg-[center_right_18px]`}
                  onClick={() => setDropdownDisplayed(prevState => !prevState)}
                >
                  <span className="overflow-hidden grow text-overflow-ellipsis line-clamp-1 text-[12px] font-stolzlBook text-left">
                    {textboxValue}
                  </span>
                  <img
                    alt="Dropdown Arrow Icon"
                    src="../icons/dropdown.svg"
                    className={` ${
                      isDropdownDisplayed ? 'rotate-180' : ''
                    } transition-transform duration-500`}
                  />
                </button>
                <div className="w-full h-full bg-white">
                  {isDropdownDisplayed &&
                    costcenter.map(option => {
                      return (
                        <div
                          key={option.cost_center_code}
                          htmlFor={option.cost_center_code}
                          className="h-10 hover:bg-[#E8F1FF60]"
                        >
                          <label
                            className={`text-[0] cursor-pointer h-full w-full flex items-center content-center `}
                          >
                            <Field
                              type="radio"
                              name="cost_center_code"
                              value={option.cost_center_code}
                              id={option.cost_center_code}
                              checked={
                                selectedOption === option.cost_center_code
                              }
                              onChange={e =>
                                handleRadioChange(
                                  e,
                                  setFieldValue,
                                  setFieldTouched,
                                  setFieldError
                                )
                              }
                              hidden
                            />
                            <i className="inline-block align-middle cursor-pointer ml-2.5 -mt-[1px] not-italic text-[12px] text-[#222222] font-normal leading-[14px] font-stolzlBook">
                              {option.cost_center_code}
                            </i>
                          </label>
                        </div>
                      );
                    })}
                  <ErrorMessage
                    name="cost_center_code"
                    component="div"
                    className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5">
                  Email <span className="text-[#E43B26]">*</span>
                </label>
                <Field
                  className={`w-full bg-white ${
                    errors.email && touched.email
                      ? 'border-[#E43B26] placeholder-[#E43B26] text-[10px]'
                      : 'border-[#eaeaea] text-[14px]'
                  }  h-10 pl-2 pr-3`}
                  type="email"
                  name="email"
                  value={formData.email ?? ''}
                  onChange={e =>
                    handleChange(
                      e,
                      setFieldValue,
                      setFieldTouched,
                      setFieldError
                    )
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                />
                <div className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]">
                  {emailValidation}
                </div>
              </div>

              {/* Status | Start */}
              <div
                className={`mb-[17px] pt-5 border-solid border-t-[1px] border-[#eaeaea] ${
                  userLoggedInID === userId ? 'opacity-50' : ''
                }`}
              >
                <label className="block mb-2.5 text-[11px] font-stolzlBook text-[#414141] font-normal leading-[14px]">
                  Status <span className="text-[#E43B26]">*</span>
                </label>
                <Select
                  options={STATUS_OPTIONS}
                  onChangeValue={handSelectChange}
                  selectedValue={formData.status}
                  disabled={userLoggedInID === userId}
                />
              </div>
              {/* Status | End */}
              <div className="mb-[15px]">
                <label className="custom__checkbox inline-block align-middle text-[0] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_system_admin}
                    name="is_system_admin"
                    disabled={isAdminCheckboxDisabled}
                    onChange={e =>
                      handleChange(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                    hidden
                  />
                  <span
                    className={`inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative ${
                      isAdminCheckboxDisabled
                        ? '!bg-disabled !border-disabled'
                        : ''
                    }`}
                  >
                    <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                    <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                  </span>
                  <i className="text-sm font-stolzlBook inline-block align-middle cursor-pointer ml-2.5 not-italic">
                    System Admin
                  </i>
                </label>
              </div>
            </div>
            <div className="mb-10 mx-[35px] border-solid border-b-[1px] border-[#eaeaea]" />
          </div>
          <div className="grid grid-cols-2 gap-2.5 mx-[50px]">
            <div className="text-right">
              <button
                type="submit"
                className="text-[12px] text-white font-normal leading-[100%] bg-[#232932] border-none p-[14px_41px] rounded"
                disabled={isSubmitting}
              >
                <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/save.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[18px]">
                  Save
                </span>
              </button>
            </div>
            <div className="text-left">
              <button
                type="button"
                className="text-[12px] text-[#232932] font-normal leading-[100%] bg-gray-700 border-none p-[14px_41px] rounded"
                onClick={() => handleModal(null)}
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

AddEditModal.propTypes = {
  handleModal: PropTypes.func,
  userId: PropTypes.number
};

export default AddEditModal;
