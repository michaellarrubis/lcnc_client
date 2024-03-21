/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCompanyInformation } from '@baseHooks/Pages/Company/useCompanyInformation';
import { useUserAccess } from '@baseHooks/useUserAccess';
import logoPlaceholder from 'src/assets/base/icons/lcnc-logo.png';
import Breadcrumbs from '@baseComponents/Common/Breadcrumbs';

const CompanyInformation = ({ menuCode }) => {
  const {
    formData,
    files,
    setFiles,
    saveDisable,
    inputRef,
    handleDrop,
    handleDragOver,
    logoUrl,
    handleImageChange,
    handleChange,
    validationSchema,
    initialValues,
    handleSubmit
  } = useCompanyInformation();
  const { access } = useUserAccess(menuCode);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
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
        setFieldError,
        isSubmitting
      }) => (
        <Form>
          <div className="company__container">
            <Breadcrumbs crumbs={[{ name: 'Company Information' }]} />

            <div className="mt-5 border-solid border-[1px] border-[#DEDEDE] rounded mb-[30px]">
              <h3 className="bg-[#F0F0F0] text-[14px] leading-[24px] font-stolzlBold px-5 py-[19px]">
                Company / General Details
              </h3>
              <div className="pl-[35px] max-w-[1380px] mx-auto">
                <div className="mt-10 pb-5 w-[100%] relative text-center font-[Verdana] text-[12px]">
                  <div className="flex items-center">
                    <div className="mb-5 w-[766px] flex">
                      <div className="w-[157px] mr-2.5 text-right mt-[12px]">
                        <label className="font-stolzlBook text-[12px]">
                          Website Logo
                        </label>
                      </div>
                      <div
                        className="bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[12px] text-[#232932] font-normal leading-[17px] h-[160px] w-[609px] mx-auto"
                        onDragOver={access.can_edit && handleDragOver}
                        onDrop={access.can_edit && handleDrop}
                      >
                        <div className="pt-[27px] pb-[21px]">
                          <img
                            className="w-[40px] h-[40px] block mx-auto"
                            src="/icons/upload.svg"
                            alt="Upload"
                          />
                          <p className="font-stolzlBook text-[14px] leading[14px]">
                            Drag & Drop to Upload
                            <br />
                            <span className="font-stolzlBook">or</span>{' '}
                          </p>
                          <input
                            type="file"
                            onChange={e =>
                              handleImageChange(e, {
                                setFieldValue,
                                setFieldTouched,
                                setFieldError
                              })
                            }
                            accept="image/*"
                            hidden
                            name="logo"
                            ref={inputRef}
                          />
                          <button
                            type="button"
                            className={`font-stolzlRegular leading-[14px] text-white bg-formHead border-none h-[33px] mt-[5px] w-[65px] rounded ${
                              !access.can_edit ? '' : 'hover:bg-gray-400'
                            }`}
                            onClick={() => inputRef.current.click()}
                            disabled={!access.can_edit}
                          >
                            Browse
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] max-w-[524px] h-[160px] mt-[-24px] mx-5">
                      <div className="relative">
                        {files.length > 0 && (
                          <div className="bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[#232932] font-normal pb-[34px] pt-[34px]">
                            {files.map(file => (
                              <img
                                key={file.name}
                                src={URL.createObjectURL(file)}
                                className="w-[191px] h-[92px] mx-auto object-cover"
                                alt={`Company Logo ${file.name}`}
                              />
                            ))}
                            <button
                              className="font-stolzlRegular leading-[14px] text-white bg-gray-400/20 border-none h-[33px] w-[65px] rounded mt-[10px] absolute top-[107%] left-[30px] left-1/2 transform -translate-x-1/2 hover:bg-gray-400"
                              type="button"
                              onClick={() => setFiles([])}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        {!files.length > 0 && (
                          <div className="bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[#232932] font-normal pb-[34px] pt-[34px]">
                            <img
                              src={logoUrl || logoPlaceholder}
                              className="w-[191px] h-[92px] mx-auto object-cover"
                              alt="Company Logo"
                            />
                            <button
                              className="font-stolzlRegular leading-[14px] text-white bg-gray-400 border-none h-[33px] w-[65px] rounded-[4px] mt-[10px] absolute top-[107%] transform -translate-x-1/2 opacity-20 left-[30px] disabled cursor-auto"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 w-[766px] flex items-center">
                    <div className="w-[157px] mr-2.5 text-right">
                      <label className="font-stolzlBook text-[12px]">
                        Website URL
                      </label>
                    </div>
                    <div className="w-[609px] inline-flex flex-col items-start">
                      <Field
                        type="text"
                        onChange={e =>
                          handleChange(
                            e,
                            setFieldValue,
                            setFieldTouched,
                            setFieldError
                          )
                        }
                        value={formData.url ?? ''}
                        name="url"
                        className={`bg-white border-solid border-[1px] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 w-full px-2.5 focus:outline-none focus:border-[#000] ${
                          errors.url ? 'border-[#E43B26]' : 'border-[#eaeaea]'
                        } ${
                          !access.can_edit && '!bg-readonly pointer-events-none'
                        }`}
                        readOnly={!access.can_edit}
                      />
                      <ErrorMessage
                        name="url"
                        component="div"
                        className="text-[10px] font-stolzlBook text-error mt-[2px]"
                      />
                    </div>
                  </div>
                  <div className="mb-5 w-[766px] flex items-center">
                    <div className="w-[157px] mr-2.5 text-right">
                      <label className="font-stolzlBook text-[12px]">
                        Company Name <span className="text-[#E43B26]">*</span>
                      </label>
                    </div>
                    <div className="w-[609px] inline-flex flex-col items-start">
                      <Field
                        type="text"
                        onChange={e =>
                          handleChange(
                            e,
                            setFieldValue,
                            setFieldTouched,
                            setFieldError
                          )
                        }
                        value={formData.name ?? ''}
                        name="name"
                        className={`bg-white border-solid border-[1px] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 w-full px-2.5 focus:outline-none focus:border-[#000] ${
                          errors.name && touched.name
                            ? 'border-[#E43B26]'
                            : 'border-[#eaeaea]'
                        } ${
                          !access.can_edit && '!bg-readonly pointer-events-none'
                        }`}
                        readOnly={!access.can_edit}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-[10px] font-stolzlBook text-error mt-[2px]"
                      />
                    </div>
                  </div>
                  <div className="mb-5 w-[766px] flex items-center">
                    <div className="w-[157px] mr-2.5 text-right">
                      <label className="font-stolzlBook text-[12px]">
                        Phone
                      </label>
                    </div>
                    <div className="w-[609px] inline-flex flex-col items-start">
                      <Field
                        type="number"
                        onChange={e =>
                          handleChange(
                            e,
                            setFieldValue,
                            setFieldTouched,
                            setFieldError
                          )
                        }
                        value={formData.phone_no ?? ''}
                        name="phone_no"
                        className={`bg-white border-solid border-[1px] rounded-md text-[14px] text-[#232932] font-normal leading-[17px] h-10 w-[609px] px-2.5 focus:outline-none focus:border-[#000] ${
                          errors.phone_no && touched.phone_no
                            ? 'border-[#E43B26]'
                            : 'border-[#eaeaea]'
                        } ${
                          !access.can_edit && '!bg-readonly pointer-events-none'
                        }`}
                        readOnly={!access.can_edit}
                      />
                      <ErrorMessage
                        name="phone_no"
                        component="div"
                        className="text-[10px] font-stolzlBook text-error mt-[2px]"
                      />
                    </div>
                  </div>
                  <div className="mb-5 w-[766px] flex items-center">
                    <div className="w-[157px] mr-2.5 text-right">
                      <label className="font-stolzlBook text-[12px]">
                        Address
                      </label>
                    </div>
                    <div className="w-[609px] inline-flex flex-col items-start">
                      <textarea
                        onChange={e =>
                          handleChange(
                            e,
                            setFieldValue,
                            setFieldTouched,
                            setFieldError
                          )
                        }
                        value={formData.address ?? ''}
                        name="address"
                        className={`bg-white border-solid border-[1px] rounded-md text-[14px] text-[#232932] font-normal leading-[17px] h-[110px] w-[609px] px-2.5 py-3 resize-none focus:outline-none focus:border-[#000] ${
                          errors.address && touched.address
                            ? 'border-[#E43B26]'
                            : 'border-[#eaeaea]'
                        } ${
                          !access.can_edit && '!bg-readonly pointer-events-none'
                        }`}
                        readOnly={!access.can_edit}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-[10px] font-stolzlBook text-error mt-[2px]"
                      />
                    </div>
                  </div>
                  <div className="mb-5 w-[766px] flex">
                    <div className="w-[157px] mr-2.5 text-right mt-[12px]">
                      <label className="font-stolzlBook text-[12px]">
                        Company Description
                      </label>
                    </div>
                    <div className="w-[609px] inline-flex flex-col items-start">
                      <textarea
                        type="textarea"
                        onChange={e =>
                          handleChange(
                            e,
                            setFieldValue,
                            setFieldTouched,
                            setFieldError
                          )
                        }
                        value={formData.description ?? ''}
                        name="description"
                        className={`bg-white border-solid border-[1px] rounded-md text-[14px] text-[#232932] font-normal leading-[17px] h-[110px] w-[609px] px-2.5 py-3 resize-none focus:outline-none focus:border-[#000] ${
                          errors.description && touched.description
                            ? 'border-[#E43B26]'
                            : 'border-[#eaeaea]'
                        } ${
                          !access.can_edit && '!bg-readonly pointer-events-none'
                        }`}
                        readOnly={!access.can_edit}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-[10px] font-stolzlBook text-error mt-[2px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 border-solid border-[1px] border-[#DEDEDE] rounded mb-[30px]">
              <h3 className="bg-[#F0F0F0] text-[14px] leading-[24px] font-stolzlBold px-5 py-[19px]">
                Email Settings
              </h3>
              <div className="mt-10 pb-5 w-[100%] max-w-[1310px] mx-auto relative text-center font-[Verdana] text-[12px]">
                <div className="w-[766px] flex items-center mb-[6px]">
                  <div className="w-[157px] mr-2.5 text-right">
                    <label className="font-stolzlBook text-[12px]">
                      Email Address <span className="text-[#E43B26]">*</span>
                    </label>
                  </div>
                  <Field
                    type="text"
                    onChange={e =>
                      handleChange(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                    value={formData.email_settings.report_emails ?? ''}
                    name="email_settings.report_emails"
                    className={`bg-white email_settings border-solid border-[1px] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 w-[609px] px-2.5 focus:outline-none focus:border-[#000] ${
                      errors.email_settings?.report_emails &&
                      touched.email_settings?.report_emails
                        ? 'border-[#E43B26]'
                        : 'border-[#eaeaea]'
                    } ${
                      !access.can_edit && '!bg-readonly pointer-events-none'
                    }`}
                    readOnly={!access.can_edit}
                  />
                </div>
                <div className="w-[766px] flex items-center">
                  <div className="w-[157px] mr-2.5 text-right" />
                  <ErrorMessage
                    name="email_settings.report_emails"
                    component="div"
                    className="text-[10px] font-stolzlBook text-error"
                  />
                </div>
                <div className="w-[766px] flex items-center mb-2.5">
                  <div className="w-[157px] mr-2.5 text-right" />
                  <p className="text-[10px] font-stolzlBook leading-[13px] text-left">
                    Email address to receive all reports. Separate with comma
                    for multiple email addresses.
                  </p>
                </div>
                <div className="w-[766px] flex items-center mb-[6px]">
                  <div className="w-[157px] mr-2.5 text-right">
                    <label className="font-stolzlBook text-[12px]">
                      Sender Email Address
                    </label>
                  </div>
                  <Field
                    type="text"
                    onChange={e =>
                      handleChange(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                    value={formData.email_settings.sender_email ?? ''}
                    name="email_settings.sender_email"
                    className={`email_settings bg-white border-solid border-[1px] rounded-md text-[14px] text-[#232932] font-normal leading-[17px] h-10 w-[609px] px-2.5 focus:outline-none focus:border-[#000] ${
                      errors.email_settings?.sender_email &&
                      touched.email_settings?.sender_email
                        ? 'border-[#E43B26]'
                        : 'border-[#eaeaea]'
                    } ${!access.can_edit && '!bg-readonly'}`}
                    readOnly={!access.can_edit}
                  />
                </div>
                <div className="w-[766px] flex items-center mb-2.5">
                  <div className="w-[157px] mr-2.5 text-right" />
                  <div>
                    <ErrorMessage
                      name="email_settings.sender_email"
                      component="div"
                      className="text-[10px] font-stolzlBook text-error text-left"
                    />
                    <p className="block text-[10px] font-stolzlBook leading-[13px] text-left">
                      Email address used as From and Reply-to.
                    </p>
                  </div>
                </div>
                <div className="mb-[6px] w-[766px] flex items-center">
                  <div className="w-[157px] mr-2.5 text-right">
                    <label className="font-stolzlBook text-[12px]">
                      Email for Contact form
                    </label>
                  </div>
                  <Field
                    type="text"
                    onChange={e =>
                      handleChange(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                      )
                    }
                    value={formData.email_settings.contact_us_email ?? ''}
                    name="email_settings.contact_us_email"
                    className={`email_settings bg-white border-solid border-[1px] rounded-md text-[14px] text-[#232932] font-normal leading-[17px] h-10 w-[609px] px-2.5 focus:outline-none focus:border-[#000] ${
                      errors.email_settings?.contact_us_email &&
                      touched.email_settings?.contact_us_email
                        ? 'border-[#E43B26]'
                        : 'border-[#eaeaea]'
                    } ${!access.can_edit && '!bg-readonly'}`}
                    readOnly={!access.can_edit}
                  />
                </div>
                <div className="w-[766px] flex items-center mb-5">
                  <div className="w-[157px] mr-2.5 text-right" />
                  <ErrorMessage
                    name="email_settings.contact_us_email"
                    component="div"
                    className="text-[10px] font-stolzlBook text-error text-left"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 border-solid border-[1px] border-[#DEDEDE] rounded mb-[30px]">
              <h3 className="bg-[#F0F0F0] text-[14px] leading-[24px] font-stolzlBold px-5 py-[19px]">
                Social Media Links
              </h3>
              <div className="mt-10 pb-5 w-[100%] max-w-[1310px] mx-auto relative text-center font-[Verdana] text-[12px]">
                <div className="mb-5 w-[766px] flex items-center">
                  <div className="w-[157px] mr-2.5 text-right">
                    <label className="font-stolzlBook text-[12px]">
                      Facebook Account
                    </label>
                  </div>
                  <div className="w-[609px] inline-flex flex-col items-start">
                    <Field
                      type="text"
                      onChange={e =>
                        handleChange(
                          e,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                      value={formData.social_media.facebook ?? ''}
                      name="social_media.facebook"
                      className={`social_media bg-white border-solid border-[1px] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 w-full px-2.5 focus:outline-none focus:border-[#000] ${
                        errors.social_media?.facebook
                          ? 'border-[#E43B26]'
                          : 'border-[#eaeaea]'
                      } ${
                        !access.can_edit && '!bg-readonly pointer-events-none'
                      }`}
                      readOnly={!access.can_edit}
                    />
                    <ErrorMessage
                      name="social_media.facebook"
                      component="div"
                      className="text-[10px] font-stolzlBook text-error mt-[2px]"
                    />
                  </div>
                </div>
                <div className="mb-5 w-[766px] flex items-center">
                  <div className="w-[157px] mr-2.5 text-right">
                    <label className="font-stolzlBook text-[12px]">
                      Instagram Account
                    </label>
                  </div>
                  <div className="w-[609px] inline-flex flex-col items-start">
                    <Field
                      type="text"
                      onChange={e =>
                        handleChange(
                          e,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                      value={formData.social_media.instagram ?? ''}
                      name="social_media.instagram"
                      className={`social_media bg-white border-solid border-[1px] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 w-full px-2.5 focus:outline-none focus:border-[#000] ${
                        errors.social_media?.instagram
                          ? 'border-[#E43B26]'
                          : 'border-[#eaeaea]'
                      } ${
                        !access.can_edit && '!bg-readonly pointer-events-none'
                      }`}
                      readOnly={!access.can_edit}
                    />
                    <ErrorMessage
                      name="social_media.instagram"
                      component="div"
                      className="text-[10px] font-stolzlBook text-error mt-[2px]"
                    />
                  </div>
                </div>
                <div className="mb-5 w-[766px] flex items-center">
                  <div className="w-[157px] mr-2.5 text-right">
                    <label className="font-stolzlBook text-[12px]">
                      Twitter Account
                    </label>
                  </div>
                  <div className="w-[609px] inline-flex flex-col items-start">
                    <Field
                      type="text"
                      onChange={e =>
                        handleChange(
                          e,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                      value={formData.social_media.twitter ?? ''}
                      name="social_media.twitter"
                      className={`social_media bg-white border-solid border-[1px] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 w-full px-2.5 focus:outline-none focus:border-[#000] ${
                        errors.social_media?.twitter
                          ? 'border-[#E43B26]'
                          : 'border-[#eaeaea]'
                      } ${
                        !access.can_edit && '!bg-readonly pointer-events-none'
                      }`}
                      readOnly={!access.can_edit}
                    />
                    <ErrorMessage
                      name="social_media.twitter"
                      component="div"
                      className="text-[10px] font-stolzlBook text-error mt-[2px]"
                    />
                  </div>
                </div>
                <div className="mb-5 w-[766px] flex items-center">
                  <div className="w-[157px] mr-2.5 text-right">
                    <label className="font-stolzlBook text-[12px]">
                      Linkedin
                    </label>
                  </div>
                  <div className="w-[609px] inline-flex flex-col items-start">
                    <Field
                      type="text"
                      onChange={e =>
                        handleChange(
                          e,
                          setFieldValue,
                          setFieldTouched,
                          setFieldError
                        )
                      }
                      value={formData.social_media.linkedin ?? ''}
                      name="social_media.linkedin"
                      className={`social_media bg-white border-solid border-[1px] rounded text-[14px] text-[#232932] font-stolzlBook leading-[17px] h-10 w-full px-2.5 focus:outline-none focus:border-[#000] ${
                        errors.social_media?.linkedin
                          ? 'border-[#E43B26]'
                          : 'border-[#eaeaea]'
                      } ${
                        !access.can_edit && '!bg-readonly pointer-events-none'
                      }`}
                      readOnly={!access.can_edit}
                    />
                    <ErrorMessage
                      name="social_media.linkedin"
                      component="div"
                      className="text-[10px] font-stolzlBook text-error mt-[2px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`text-[12px] text-white font-normal leading-[100%] border-none p-[14px_41px] rounded mb-[72px] ${
                !access.can_edit || saveDisable
                  ? 'bg-gray-400/20'
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
              disabled={!access.can_edit || saveDisable || isSubmitting}
            >
              <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/save.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[18px]">
                Save
              </span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

CompanyInformation.propTypes = {
  menuCode: PropTypes.string
};

export default CompanyInformation;
