import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import 'src/assets/base/css/custom/scrollbar.scss';

import { useAddEditModal } from '@baseHooks/Components/Parts/User/Group/useAddEditModal';
import FormCard from '@baseComponents/Common/FormCard';
import FormField from '@baseComponents/Common/FormField';
import { useUserAccess } from '@baseHooks/useUserAccess';

const AddEditModal = ({ handleModal, id, menuCode, joinGroup }) => {
  const {
    menuRef,
    groupForm,
    searchMenu,
    initialDummyData,
    handleMenu,
    handleSearchMenu,
    handleAddMenu,
    handleDeleteMenu,
    setIsEdit,
    isEdit,
    validationSchema,
    validationEditSchema,
    submitForm,
    modalTitle
  } = useAddEditModal({ handleModal, id });
  const pageAccess = useUserAccess(menuCode);

  return (
    <Formik
      enableReinitialize={!!id}
      // validateOnMount={!!id}
      initialValues={id ? initialDummyData : groupForm}
      validationSchema={id ? validationEditSchema : validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={submitForm}
    >
      {({
        errors,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        setFieldError
      }) => (
        <Form id="userGrpForm">
          {/* Modal Head Section | Start */}
          <div className="flex justify-between mx-[50px] items-center">
            <h4 className="text-[22px] font-StolzlMedium leading-[27px] ">
              {modalTitle}
            </h4>
            <div className="text-right">
              {!id && (
                <div>
                  <button
                    form="userGrpForm"
                    type="submit"
                    disabled={isSubmitting}
                    className="text-[12px] text-white font-stolzlBook leading-[100%] bg-gray-400 hover:bg-gray-500 border-none p-[14px_40px] rounded"
                  >
                    <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/save.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[22px] tracking-[-0.5px]">
                      Save
                    </span>
                  </button>
                </div>
              )}
              {!isEdit && id ? (
                <button
                  type="button"
                  disabled={!pageAccess.access.can_edit || joinGroup[id]}
                  onClick={e => {
                    e.preventDefault();
                    setIsEdit(!isEdit);
                  }}
                  className={`text-[12px] text-white ${
                    !pageAccess.access.can_edit || joinGroup[id]
                      ? 'bg-gray-400/20'
                      : 'bg-gray-400 hover:bg-gray-500'
                  } font-stolzlBook leading-[100%] h-10 w-20 border-none rounded`}
                >
                  <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/edit_icn.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[22px] tracking-[-0.5px]">
                    Edit
                  </span>
                </button>
              ) : (
                isEdit &&
                id && (
                  <button
                    form="userGrpForm"
                    type="submit"
                    disabled={isSubmitting}
                    className="text-[12px] text-white font-stolzlBook leading-[100%] bg-gray-400 hover:bg-gray-500 border-none p-[14px_40px] rounded"
                  >
                    <span className="relative before:content-[''] before:block before:w-3 before:h-3 before:bg-[url('/src/assets/base/icons/save.svg')] before:bg-no-repeat before:bg-center before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:translate-x-0 pl-[22px] tracking-[-0.5px]">
                      Save
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
          {/* Modal Head Section | End */}
          <div className="mb-5 mx-[40px] mt-6 border-solid border-b-[1px] border-[#eaeaea]" />
          <div className="p-[20px_40px_0] h-[calc(100vh-238px)] overflow-auto">
            {/* Access Menu Section | Start */}
            <div className="mb-5 pt-[21px] border-solid border-t-[1px] border-[#eaeaea]">
              <FormCard>
                <FormField
                  label="Access Menu"
                  type="search"
                  name="access_menus"
                  required
                  placeholder="Search"
                  onChange={e =>
                    handleSearchMenu(
                      e,
                      setFieldValue,
                      setFieldTouched,
                      setFieldError
                    )
                  }
                  error={errors.access_menus}
                  innerRef={menuRef}
                  autoComplete="off"
                  readOnly={id && !isEdit}
                  errorMessage="Field Required"
                />
                {errors.access_menus !== 'At least one menu is required' && (
                  <div className="text-[10px] font-stolzlBook text-[#E43B26]">
                    {errors.access_menus}
                  </div>
                )}
                <div className="relative">
                  {searchMenu.length ? (
                    <div className="absolute left-0 top-[calc(100%+2px)] w-full bg-white z-10 shadow-[0_2px_4px_rgba(0,0,0,0.16)]">
                      <ul className="max-h-40 overflow-auto custom-scrollbar">
                        {searchMenu.map(menu => (
                          <li
                            key={menu.id}
                            className="flex items-center text-[14px] text-[#232932] font-stolzlBook leading-[14px] h-10 px-2.5 hover:bg-[#E8F1FF60] ease duration-200"
                            onClick={() =>
                              handleAddMenu(
                                menu,
                                setFieldValue,
                                setFieldTouched,
                                setFieldError
                              )
                            }
                            onKeyDown={event => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                handleAddMenu(
                                  menu,
                                  setFieldValue,
                                  setFieldTouched,
                                  setFieldError
                                );
                              }
                            }}
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                            role="button"
                            tabIndex={0}
                          >
                            {menu.code} - {menu.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-row items-center my-[20px]">
                  <div className="w-[220px]">
                    <h5 className="text-[12px] text-[#414141] font-stolzlBook leading-[14px]">
                      Menu Code
                    </h5>
                  </div>
                  <div className="w-[55px] text-center">
                    <h5 className="text-[10px] text-[#414141] font-stolzlBook leading-[16px] ml-[2px]">
                      View
                    </h5>
                  </div>
                  <div className="w-[55px] text-center">
                    <h5 className="text-[10px] text-[#414141] font-stolzlBook leading-[16px] ml-[2px]">
                      Add
                    </h5>
                  </div>
                  <div className="w-[55px] text-center">
                    <h5 className="text-[10px] text-[#414141] font-stolzlBook leading-[16px] ml-[2px]">
                      Edit
                    </h5>
                  </div>
                  <div className="w-[55px] text-center">
                    <h5 className="text-[10px] text-[#414141] font-stolzlBook leading-[16px] ml-[2px]">
                      Delete
                    </h5>
                  </div>
                  <div className="w-[55px] text-center">
                    <h5 className="text-[10px] text-[#414141] font-stolzlBook leading-[16px] ml-[2px]">
                      Print
                    </h5>
                  </div>
                  <div className="w-[55px] text-center">
                    <h5 className="text-[10px] text-[#414141] font-stolzlBook leading-[16px] ml-[2px]">
                      Approve
                    </h5>
                  </div>
                  <div className="w-[55px] text-center">
                    <h5 className="text-[10px] text-[#414141] font-stolzlBook leading-[16px] ml-[2px]">
                      Generate
                    </h5>
                  </div>
                  <div className="w-[17px]" />
                </div>
                <div className="max-h-[calc(100vh-405px)] overflow-auto custom-scrollbar">
                  {groupForm?.menus?.length ? (
                    groupForm.menus.map((access, index) => (
                      <div
                        className="flex flex-row items-top pt-[19px] pb-[16px] border-solid border-b-[1px] border-[#eaeaea] first:pt-0 last:border-none"
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                      >
                        <div className="w-[220px] relative after:content-[''] after:block after:w-[1px] after:h-[calc(100%+36px)] after:bg-[#eaeaea] after:absolute after:top-[-20px] after:right-0">
                          <p className="text-[14px] text-[#232932] font-stolzlBook leading-[17px]">
                            {access.code} - {access.name}{' '}
                          </p>
                        </div>
                        <div className="w-[65px] text-center">
                          <label
                            className="custom__checkbox inline-block align-top text-[0] cursor-pointer ml-[2px]"
                            htmlFor={`can_view[${access.id}]`}
                          >
                            <input
                              type="checkbox"
                              name={`can_view[${access.id}]`}
                              id={`can_view[${access.id}]`}
                              checked="checked"
                              onChange={() => null}
                              hidden
                            />
                            <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative">
                              <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                              <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                            </span>
                          </label>
                        </div>
                        <div className="w-[65px] text-center">
                          <label
                            className="custom__checkbox inline-block align-top text-[0] cursor-pointer ml-[2px]"
                            htmlFor={`can_add[${access.id}]`}
                          >
                            <input
                              type="checkbox"
                              name={`can_add[${access.id}]`}
                              id={`can_add[${access.id}]`}
                              checked={
                                access.user_group_access.can_add
                                  ? 'checked'
                                  : ''
                              }
                              onChange={() => handleMenu(access.id, 'can_add')}
                              hidden
                              disabled={!access.can_add || !isEdit}
                            />
                            <span
                              className={`inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative ${
                                !access.can_add &&
                                '!bg-disabled !border-disabled'
                              }`}
                            >
                              {access.can_add && (
                                <>
                                  <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                                  <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                                </>
                              )}
                            </span>
                          </label>
                        </div>
                        <div className="w-[65px] text-center">
                          <label
                            className="custom__checkbox inline-block align-top text-[0] cursor-pointer ml-[2px]"
                            htmlFor={`can_edit[${access.id}]`}
                          >
                            <input
                              type="checkbox"
                              name={`can_edit[${access.id}]`}
                              id={`can_edit[${access.id}]`}
                              checked={
                                access.user_group_access.can_edit
                                  ? 'checked'
                                  : ''
                              }
                              onChange={() => handleMenu(access.id, 'can_edit')}
                              hidden
                              disabled={!access.can_edit || !isEdit}
                            />
                            <span
                              className={`inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative ${
                                !access.can_edit &&
                                '!bg-disabled !border-disabled'
                              }`}
                            >
                              {access.can_edit && (
                                <>
                                  <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                                  <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                                </>
                              )}
                            </span>
                          </label>
                        </div>
                        <div className="w-[65px] text-center">
                          <label
                            className="custom__checkbox inline-block align-top text-[0] cursor-pointer ml-[2px]"
                            htmlFor={`can_delete[${access.id}]`}
                          >
                            <input
                              type="checkbox"
                              name={`can_delete[${access.id}]`}
                              id={`can_delete[${access.id}]`}
                              checked={
                                access.user_group_access.can_delete
                                  ? 'checked'
                                  : ''
                              }
                              onChange={() =>
                                handleMenu(access.id, 'can_delete')
                              }
                              hidden
                              disabled={!access.can_delete || !isEdit}
                            />
                            <span
                              className={`inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative ${
                                !access.can_delete &&
                                '!bg-disabled !border-disabled'
                              }`}
                            >
                              {access.can_delete && (
                                <>
                                  <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                                  <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                                </>
                              )}
                            </span>
                          </label>
                        </div>
                        <div className="w-[65px] text-center">
                          <label
                            className="custom__checkbox inline-block align-top text-[0] cursor-pointer ml-[2px]"
                            htmlFor={`can_print[${access.id}]`}
                          >
                            <input
                              type="checkbox"
                              name={`can_print[${access.id}]`}
                              id={`can_print[${access.id}]`}
                              checked={
                                access.user_group_access.can_print
                                  ? 'checked'
                                  : ''
                              }
                              onChange={() =>
                                handleMenu(access.id, 'can_print')
                              }
                              hidden
                              disabled={!access.can_print || !isEdit}
                            />
                            <span
                              className={`inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative ${
                                !access.can_print &&
                                '!bg-disabled !border-disabled'
                              }`}
                            >
                              {access.can_print && (
                                <>
                                  <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                                  <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                                </>
                              )}
                            </span>
                          </label>
                        </div>
                        <div className="w-[65px] text-center">
                          <label
                            className="custom__checkbox inline-block align-top text-[0] cursor-pointer ml-[2px]"
                            htmlFor={`can_approve[${access.id}]`}
                          >
                            <input
                              type="checkbox"
                              name={`can_approve[${access.id}]`}
                              id={`can_approve[${access.id}]`}
                              checked={
                                access.user_group_access.can_approve
                                  ? 'checked'
                                  : ''
                              }
                              onChange={() =>
                                handleMenu(access.id, 'can_approve')
                              }
                              hidden
                              disabled={!access.can_approve || !isEdit}
                            />
                            <span
                              className={`inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative ${
                                !access.can_approve &&
                                '!bg-disabled !border-disabled'
                              }`}
                            >
                              {access.can_approve && (
                                <>
                                  <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                                  <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                                </>
                              )}
                            </span>
                          </label>
                        </div>
                        <div className="w-[65px] text-center">
                          <label
                            className="custom__checkbox inline-block align-top text-[0] cursor-pointer ml-[2px]"
                            htmlFor={`can_generate[${access.id}]`}
                          >
                            <input
                              type="checkbox"
                              name={`can_generate[${access.id}]`}
                              id={`can_generate[${access.id}]`}
                              checked={
                                access.user_group_access.can_generate
                                  ? 'checked'
                                  : ''
                              }
                              onChange={() =>
                                handleMenu(access.id, 'can_generate')
                              }
                              hidden
                              disabled={!access.can_generate || !isEdit}
                            />
                            <span
                              className={`inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative ${
                                !access.can_generate &&
                                '!bg-disabled !border-disabled'
                              }`}
                            >
                              {access.can_generate && (
                                <>
                                  <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                                  <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
                                </>
                              )}
                            </span>
                          </label>
                        </div>
                        {isEdit && (
                          <div className="w-[17px] relative left-[10.3%] text-right">
                            <button
                              type="button"
                              className="relative inline-block align-super w-[17px] h-5"
                              name={access.code}
                              disabled={!isEdit}
                              onClick={() => handleDeleteMenu(access.code)}
                            >
                              <span className="block w-[13px] h-0.5 bg-[#d8dadc] absolute top-[calc(50%-4px)] left-[calc(50%+4px)] translate-x-[-50%] rotate-45 rounded" />
                              <span className="block w-[13px] h-0.5 bg-[#d8dadc] absolute top-[calc(50%-4px)] left-[calc(50%+4px)] translate-x-[-50%] rotate-[-45deg] rounded" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-[12px] text-[#414141] font-stolzlBook leading-[14px]">
                      No menu available.
                    </p>
                  )}
                </div>
              </FormCard>
            </div>
          </div>
          {/* Access Menu | End */}
        </Form>
      )}
    </Formik>
  );
};

AddEditModal.propTypes = {
  handleModal: PropTypes.func,
  id: PropTypes.number,
  menuCode: PropTypes.string,
  joinGroup: PropTypes.instanceOf(Object)
};

export default AddEditModal;
