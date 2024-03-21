import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import {
  Button,
  FormField,
  FormCard,
  FormGridCard,
  Text
} from '@baseComponents/Common';

const EntryForm = ({
  formFor,
  code,
  access,
  formData,
  initialDummyData,
  validationSchema,
  formValidation,
  renderCostCenterInfo,
  onChangeSelectHandler,
  userOptions,
  uniqueCode,
  handleDeleteModal,
  handleChange,
  handleSubmit,
  handleTrimSpaces
}) => {
  return (
    <Formik
      enableReinitialize={!!uniqueCode}
      validateOnMount={!!uniqueCode}
      initialValues={uniqueCode ? initialDummyData : formData}
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
              {uniqueCode ? 'Edit' : 'Add'} {formFor}
            </h4>
            <div className="flex">
              <div className="text-right mr-[10px]">
                <button
                  type="submit"
                  className="text-[12px] text-white leading-[100%] bg-gray-400 hover:bg-gray-500 border-none p-[14px_41px] rounded"
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
                {!uniqueCode && (
                  <FormCard>
                    <FormField
                      label={`${formFor} Code`}
                      required
                      name={code}
                      type="text"
                      placeholder=""
                      errorMessage="Field Required"
                      value={formData[code] ?? ''}
                      error={errors[code] && touched[code]}
                      onBlur={handleTrimSpaces}
                      onChange={e =>
                        handleChange(
                          e,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                    />
                    {errors[code] !== 'Required' && (
                      <div className="text-[10px] font-stolzlBook text-[#E43B26]">
                        {errors[code]}
                      </div>
                    )}
                  </FormCard>
                )}
                <FormCard>
                  <FormField
                    label={`${formFor} Name`}
                    required
                    name="name"
                    type="text"
                    placeholder=""
                    errorMessage="Field Required"
                    value={formData.name ?? ''}
                    error={errors.name && touched.name}
                    onBlur={handleTrimSpaces}
                    onChange={e =>
                      handleChange(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                  />
                  {errors.name !== 'Required' && (
                    <div className="text-[10px] font-stolzlBook text-[#E43B26]">
                      {errors.name}
                    </div>
                  )}
                </FormCard>
                <FormCard>
                  <FormField
                    label={`${formFor} Head`}
                    type="select"
                    required
                    errors={errors.head && touched.head}
                    placeholder={`Select ${formFor} Head`}
                    options={userOptions}
                    selectName="head"
                    currentValue={formData.head}
                    onChangeValue={(value, name) =>
                      onChangeSelectHandler(
                        value,
                        name,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                  />
                </FormCard>
              </FormGridCard>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

EntryForm.propTypes = {
  formFor: PropTypes.string,
  code: PropTypes.string,
  access: PropTypes.object,
  formData: PropTypes.object,
  initialDummyData: PropTypes.object,
  validationSchema: PropTypes.object,
  formValidation: PropTypes.string,
  renderCostCenterInfo: PropTypes.node,
  userOptions: PropTypes.array,
  uniqueCode: PropTypes.string,
  onChangeSelectHandler: PropTypes.func,
  handleDeleteModal: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleTrimSpaces: PropTypes.func
};

export default EntryForm;
