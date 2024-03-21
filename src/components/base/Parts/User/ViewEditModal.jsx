/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage } from 'formik';

import defaultPicture from 'src/assets/base/icons/defaultProfile2.png';
import { useUserAccess } from '@baseHooks/useUserAccess';
import { useViewEditModal } from '@baseHooks/Components/Parts/User/useViewEditModal';
import { STATUS_OPTIONS } from '@baseUtils/constants';

import FormGridCard from '@baseComponents/Common/FormGridCard';
import FormCard from '@baseComponents/Common/FormCard';
import FormField from '@baseComponents/Common/FormField';
import FormLabel from '@baseComponents/Common/FormLabel';
import Select from '@baseComponents/Common/Select';

const ViewEditModal = ({ handleModal, userId, menuCode }) => {
  const {
    formData,
    image,
    previewImage,
    isAdminCheckboxDisabled,
    user,
    renderUserInfo,
    isEdit,
    costCenterOptions,
    initialDummyData,
    setIsEdit,
    handleChange,
    handleStatusChange,
    handSelectChange,
    handleImageChange,
    handleSubmit,
    validationSchema,
    userLoggedInID,
    emailValidation
  } = useViewEditModal({ handleModal, userId });
  const { access } = useUserAccess(menuCode);

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={initialDummyData}
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
          <div className="flex justify-between px-[35px] items-center mb-8">
            <h4 className="text-[22px] font-bold">User Information</h4>
            {isEdit ? (
              <button
                type="submit"
                className="text-[12px] text-white font-normal leading-[100%] bg-gray-400 hover:bg-gray-500 border-none p-[14px_41px] rounded ml-4"
                disabled={isSubmitting}
              >
                <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/save.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[18px]">
                  Save
                </span>
              </button>
            ) : (
              <button
                type="button"
                className={`text-[12px] text-white ${
                  !access.can_edit
                    ? 'bg-gray-400/20 '
                    : 'bg-gray-400 hover:bg-gray-500'
                }  font-normal leading-[100%] border-none p-[14px_19px] rounded`}
                onClick={e => {
                  e.preventDefault();
                  setIsEdit(!isEdit);
                }}
                disabled={!access.can_edit}
              >
                <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/edit_icn.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[18px]">
                  Edit
                </span>
              </button>
            )}
          </div>
          <div className="relative px-[35px] pb-[10px]">
            <div className="flex w-[394px] pb-4">
              <div className="flex flex-col items-center justify-center">
                <div className="w-[120px] h-[120px] border-[1px] border-solid border-[#eaeaea] rounded">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={image || defaultPicture}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
                {isEdit && (
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
                      {userId ? `Change Image` : `Upload Image`}
                    </label>
                    {errors.image && (
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                      />
                    )}
                  </div>
                )}
              </div>
              {renderUserInfo}
            </div>
            <div className="border-solid border-b-[1px] border-[#eaeaea] " />
          </div>

          {/* Profile section | End */}
          <div className="w-full">
            <div className="px-[35px] mt-5">
              <FormGridCard cols="2">
                <FormCard>
                  <FormField
                    label="First Name"
                    required
                    name="first_name"
                    type="text"
                    placeholder=""
                    errorMessage="Field Required"
                    value={formData.first_name ?? ''}
                    readOnly={!isEdit}
                    error={errors.first_name && touched.first_name}
                    onChange={e =>
                      handleChange(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                  />
                  {errors.first_name !== 'Required' && (
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                    />
                  )}
                </FormCard>
                <FormCard>
                  <FormField
                    label="Middle Name"
                    name="middle_name"
                    type="text"
                    placeholder=""
                    readOnly={!isEdit}
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
                  {errors.middle_name !== 'Required' && (
                    <ErrorMessage
                      name="middle_name"
                      component="div"
                      className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                    />
                  )}
                </FormCard>
              </FormGridCard>

              <FormGridCard cols="2">
                <FormCard>
                  <FormField
                    label="Family Name"
                    required
                    name="last_name"
                    type="text"
                    placeholder=""
                    errorMessage="Field Required"
                    readOnly={!isEdit}
                    error={errors.last_name && touched.last_name}
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
                  {errors.last_name !== 'Required' && (
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                    />
                  )}
                </FormCard>
                <FormCard>
                  <FormField
                    label="Suffix"
                    name="suffix"
                    type="text"
                    placeholder=""
                    readOnly={!isEdit}
                    value={formData.suffix ?? ''}
                    error={errors.suffix && touched.suffix}
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
                    name="suffix"
                    component="div"
                    className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                  />
                </FormCard>
              </FormGridCard>

              <FormGridCard cols="2">
                <FormCard>
                  <FormField
                    label="Cost Center"
                    type="select"
                    required
                    options={costCenterOptions}
                    onChangeValue={(value, name) =>
                      handleStatusChange(
                        value,
                        name,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                    selectedValue={formData.cost_center_code}
                    selectName="cost_center_code"
                    errors={
                      errors?.cost_center_code && touched.cost_center_code
                    }
                    disabled={!isEdit}
                  />
                  <ErrorMessage
                    name="cost_center_code"
                    component="div"
                    className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                  />
                </FormCard>
                <FormCard>
                  <FormField
                    label="Email"
                    name="email"
                    type="text"
                    placeholder=""
                    required
                    error={errors.email && touched.email}
                    errorMessage="Field Required"
                    readOnly
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
                  {errors.email && touched.email && formData.email ? (
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                    />
                  ) : (
                    <div className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]">
                      {emailValidation}
                    </div>
                  )}
                </FormCard>
              </FormGridCard>

              <FormGridCard cols="2">
                <FormCard>
                  <FormField
                    label="User Code"
                    name="user_code"
                    type="text"
                    placeholder=""
                    required
                    error={errors.user_code && touched.user_code}
                    errorMessage="Field Required"
                    readOnly
                    value={formData.user_code ?? ''}
                    onChange={e =>
                      handleChange(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                  />
                  {errors.user_code !== 'Required' && (
                    <ErrorMessage
                      name="user_code"
                      component="div"
                      className="text-[10px] font-stolzlBook text-[#E43B26] bg-[#f8f9fa] mt-[2px]"
                    />
                  )}
                </FormCard>
                <div
                  className={`w-[387px] mb-[17px] ${
                    userLoggedInID === userId ? 'opacity-50' : ''
                  }`}
                >
                  <FormCard>
                    <FormLabel text="Status" htmlFor="status" required />
                    <Select
                      options={STATUS_OPTIONS}
                      onChangeValue={handSelectChange}
                      selectedValue={formData.status}
                      disabled={
                        userLoggedInID === userId ||
                        !isEdit ||
                        formData.status === 'N'
                      }
                    />
                  </FormCard>
                </div>
              </FormGridCard>

              <FormGridCard cols="2">
                <FormCard className="flex items-center">
                  <label className="custom__checkbox inline-block align-middle text-[0] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_system_admin}
                      name="is_system_admin"
                      disabled={isAdminCheckboxDisabled || !isEdit}
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
                        isAdminCheckboxDisabled && user.is_system_admin
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
                </FormCard>
              </FormGridCard>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

ViewEditModal.propTypes = {
  handleModal: PropTypes.func,
  userId: PropTypes.number,
  menuCode: PropTypes.string
};

export default ViewEditModal;
