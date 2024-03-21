/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import defaultPicture from 'src/assets/base/icons/defaultProfile2.png';
import Select from '@baseComponents/Common/Select';
import { useViewModal } from '@baseHooks/Components/Parts/User/useViewModal';
import { STATUS_OPTIONS } from '@baseUtils/constants';

const ViewModal = ({ userId }) => {
  const {
    formData,
    costcenter,
    image,
    previewImage,
    isDropdownDisplayed,
    selectedOption,
    textboxValue,
    renderUserInfo
  } = useViewModal({ userId });

  return (
    <div id="userForm" className="flex flex-col justify-start h-full">
      <h4 className="text-[22px] w-[394px] ml-[35px] font-bold leading-[27px] pb-5">
        User Info
      </h4>
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
            <input type="file" id="image" name="image" hidden />
          </div>
        </div>
        {renderUserInfo}
      </div>

      {/* Profile section | End */}
      <div className="w-full overflow-scroll flex flex-col justify-between grow">
        <div className={` px-[35px] mt-5 overflow-auto`}>
          <div className="mb-3">
            <label
              className="block mb-2.5 text-[12px] text-[#414141] font-normal font-[Verdana] leading-[14px]"
              htmlFor="first_name"
            >
              First Name <span className="text-[#E43B26]">*</span>
            </label>
            <input
              className="block w-full bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[#232932] font-normal leading-[17px] h-10 pl-2 pr-3 text-verdana"
              type="text"
              name="first_name"
              value={formData.first_name ?? ''}
              readOnly
              disabled
            />
          </div>
          <div className="mb-3 w-full">
            <label className="block mb-2.5 text-[12px] text-[#414141] font-normal font-[Verdana] leading-[14px]">
              Middle Name
            </label>
            <input
              className="block w-full bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[#232932] font-normal leading-[17px] h-10 pl-2 pr-3 text-verdana"
              type="text"
              name="middle_name"
              value={formData.middle_name ?? ''}
              readOnly
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2.5 text-[12px] text-[#414141] font-normal font-[Verdana] leading-[14px]">
              Family Name <span className="text-[#E43B26]">*</span>
            </label>
            <input
              className="block w-full bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[#232932] font-normal leading-[17px] h-10 pl-2 pr-3 text-verdana"
              type="text"
              name="last_name"
              value={formData.last_name ?? ''}
              readOnly
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2.5 text-[12px] text-[#414141] font-normal font-[Verdana] leading-[14px]">
              Suffix
            </label>
            <input
              className="block w-full bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[#232932] font-normal leading-[17px] h-10 pl-2 pr-3 text-verdana"
              type="text"
              name="suffix"
              value={formData.suffix ?? ''}
              readOnly
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2.5 text-[12px] text-[#414141] font-normal font-[Verdana] leading-[14px]">
              Cost Center <span className="text-[#E43B26]">*</span>
            </label>
            <button
              type="button"
              className="w-full h-10 p-[10px] flex items-center text-[#222222] bg-white border border-[#eaeaea] rounded capitalize bg-no-repeat bg-[center_right_18px]"
              readOnly
              disabled="true"
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
                        className={`text-[0] h-full w-full flex items-center content-center `}
                      >
                        <input
                          type="radio"
                          name="cost_center_code"
                          value={option.cost_center_code}
                          id={option.cost_center_code}
                          checked={selectedOption === option.cost_center_code}
                          hidden
                          readOnly
                          disabled
                        />
                        <i className="inline-block align-middle ml-2.5 -mt-[1px] not-italic text-[12px] text-[#222222] font-normal leading-[14px] font-stolzlBook">
                          {option.cost_center_code}
                        </i>
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2.5 text-[12px] text-[#414141] font-normal font-[Verdana] leading-[14px]">
              Email <span className="text-[#E43B26]">*</span>
            </label>
            <input
              className="block w-full bg-white border-solid border-[1px] border-[#eaeaea] rounded text-[#232932] font-normal leading-[17px] h-10 pl-2 pr-3 text-verdana"
              type="text"
              name="email"
              value={formData.email ?? ''}
              readOnly
              disabled
            />
          </div>
          {/* Status | Start */}
          <div className="mb-[17px] pt-5 border-solid border-t-[1px] border-[#eaeaea]">
            <label className="block mb-2.5 text-[11px] font-stolzlBook text-[#414141] font-normal leading-[14px]">
              Status <span className="text-[#E43B26]">*</span>
            </label>
            <Select
              options={STATUS_OPTIONS}
              // onChangeValue={handSelectChange}
              selectedValue={formData.status}
              readOnly
              disabled
            />
          </div>
          {/* Status | End */}
          <div className="mb-[15px]">
            <label className="custom__checkbox inline-block align-middle text-[0]">
              <input
                type="checkbox"
                checked={formData.is_system_admin}
                name="is_system_admin"
                hidden
                readOnly
                disabled
              />
              <span className="inline-block align-middle w-5 h-5 bg-white border-solid border-[1px] border-[#eaeaea] rounded ease duration-200 relative">
                <em className="absolute block w-[5px] h-0.5 bg-white top-[9px] left-[3px] rotate-[40deg] rounded" />
                <em className="absolute block w-2.5 h-0.5 bg-white top-2 left-1.5 rotate-[-40deg] rounded" />
              </span>
              <i className="text-sm font-stolzlBook inline-block align-middle ml-2.5 not-italic">
                System Admin
              </i>
            </label>
          </div>
        </div>
        <div className="mx-[35px] border-solid border-b-[1px] border-[#eaeaea]" />
      </div>
    </div>
  );
};

ViewModal.propTypes = {
  userId: PropTypes.number
};

export default ViewModal;
