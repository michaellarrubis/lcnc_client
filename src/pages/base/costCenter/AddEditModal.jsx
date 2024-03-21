/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  Text,
  FormField,
  FormCard,
  FormGridCard,
  ModalCenter
} from '@baseComponents/Common';
import ModalDelete from '@baseComponents/Common/CostCenter/ModalDelete';

import { useAddEditModal } from '@baseHooks/Components/Parts/Cost-Center/useAddEditModal';
import { useDeleteModal } from '@baseHooks/Components/Parts/Cost-Center/useDeleteModal';

const AddEditModal = ({ handleModal, uniqueCode, dataList, menuCode }) => {
  const {
    formData,
    renderCostCenterInfo,
    handleChange,
    handleSubmit,
    handleDeleteModal,
    handleTrimSpaces,
    validationSchema,
    formValidation,
    divisionOptions,
    departmentOptions,
    sectionOptions,
    subSectionOptions,
    onChangeSelectHandler,
    showDeleteModal,
    currentCodeValue
  } = useAddEditModal({ handleModal, uniqueCode, dataList });
  const { costCenterDetail, handleDelete } = useDeleteModal({
    handleDeleteModal,
    editModal: handleModal,
    code: uniqueCode
  });

  return (
    <>
      <Formik
        enableReinitialize={!!uniqueCode}
        validateOnMount={!!uniqueCode}
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
            <div className="flex justify-between items-center w-auto mx-[35px] border-solid border-b-[1px] border-[#eaeaea] pb-[20px]">
              <h4 className="text-[22px] font-stolzlMedium leading-[27px]">
                {uniqueCode ? 'Edit' : 'Add'} Cost Center
              </h4>
              <div className="flex">
                <div className="text-right mr-[10px]">
                  <button
                    type="submit"
                    className="text-[12px] text-white leading-[100%] bg-gray-400 hover:bg-gray-500 border-none p-[14px_26px] rounded-default"
                    disabled={isSubmitting}
                  >
                    <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/save.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[18px]">
                      Save
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-[35px] mt-[20px] mb-[30px] w-auto">
              {renderCostCenterInfo}
              <Text tag="error" markup={formValidation} />
            </div>

            <div className="w-full">
              <div className="px-[35px] mt-5">
                <FormGridCard cols="2">
                  <FormCard>
                    <FormField
                      label="Division"
                      type="select"
                      required
                      errors={
                        errors?.division_list?.code &&
                        touched?.division_list?.code
                      }
                      placeholder="Select Division Code"
                      options={divisionOptions}
                      selectName="division_list.code"
                      currentValue={currentCodeValue.division_list}
                      onChangeValue={(value, name, codeName) =>
                        onChangeSelectHandler(
                          value,
                          name,
                          codeName,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                    />
                  </FormCard>
                  <FormCard>
                    <FormField
                      label="Department"
                      type="select"
                      options={departmentOptions}
                      selectName="department"
                      placeholder="Select Department Code"
                      currentValue={currentCodeValue.department_list}
                      onChangeValue={(value, name, codeName) =>
                        onChangeSelectHandler(
                          value,
                          name,
                          codeName,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                      disabled={!(formData?.division_list?.code?.length > 0)}
                    />
                  </FormCard>
                </FormGridCard>

                <FormGridCard cols="2">
                  <FormCard>
                    <FormField
                      label="Section"
                      type="select"
                      options={sectionOptions}
                      selectName="section"
                      placeholder="Select Section Code"
                      currentValue={currentCodeValue.section_list}
                      onChangeValue={(value, name, codeName) =>
                        onChangeSelectHandler(
                          value,
                          name,
                          codeName,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                      disabled={!formData?.department_list?.code}
                    />
                  </FormCard>
                  <FormCard>
                    <FormField
                      label="Sub Section"
                      type="select"
                      options={subSectionOptions}
                      selectName="sub_section"
                      placeholder="Select Sub Section Code"
                      currentValue={currentCodeValue.sub_section_list}
                      onChangeValue={(value, name, codeName) =>
                        onChangeSelectHandler(
                          value,
                          name,
                          codeName,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                      disabled={!formData?.section_list?.code}
                    />
                  </FormCard>
                </FormGridCard>

                <FormGridCard cols="1">
                  <FormCard>
                    <FormField
                      label="Remarks"
                      required
                      name="remarks"
                      type="textarea"
                      placeholder=""
                      value={formData.remarks}
                      error={errors.remarks && touched.remarks}
                      max="255"
                      onBlur={handleTrimSpaces}
                      onChange={e =>
                        handleChange(
                          e,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError,
                          'remarks'
                        )
                      }
                    />
                    {errors.remarks !== 'Required' && (
                      <div className="text-[10px] font-stolzlBook text-[#E43B26]">
                        {errors.remarks}
                      </div>
                    )}
                  </FormCard>
                </FormGridCard>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <ModalDelete
            handleDeleteModal={handleDeleteModal}
            handleDelete={handleDelete}
            detail={costCenterDetail}
            code={uniqueCode}
            name={uniqueCode}
            formFor="Cost Center"
          />
        )}
      </ModalCenter>
    </>
  );
};

AddEditModal.propTypes = {
  handleModal: PropTypes.func,
  uniqueCode: PropTypes.string,
  dataList: PropTypes.array,
  menuCode: PropTypes.string
};

export default AddEditModal;
