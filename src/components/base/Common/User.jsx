import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@baseStores/users/userActions';
import { useNavigate } from 'react-router-dom';
import defaultPicture from 'src/assets/base/icons/defaultProfile2.png';
import DropdownMenu from './DropdownMenu';

const User = () => {
  const { user } = useSelector(state => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultPicture);

  const dropdownRef = useRef(null);
  const imgRef = useRef(null);
  const nameRef = useRef(null);
  const positionRef = useRef(null);
  const arrowRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setProfileImage(user?.user.image || defaultPicture);
  }, [user.user.image]);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target) &&
        !imgRef.current?.contains(event.target) &&
        !nameRef.current?.contains(event.target) &&
        !arrowRef.current?.contains(event.target) &&
        !positionRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative flex items-center justify-end pr-[16px]">
      <div className="transition-opacity hover:opacity-50 relative flex items-center justify-end">
        <div className="">
          <img
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
            src={profileImage}
            alt=""
            onClick={handleClick}
            aria-hidden="true"
            ref={imgRef}
          />
        </div>
        <div className="flex flex-col pl-[10px] pr-[2px] cursor-pointer">
          <div className="flex items-center gap-[2px]">
            <p
              className="capitalize max-w-[150px] min-w-0 whitespace-no-wrap overflow-hidden text-sm font-medium text-ellipsis"
              onClick={handleClick}
              aria-hidden="true"
              ref={nameRef}
            >
              {user.user.first_name} {user.user.last_name}
            </p>
            <div
              className={`flex cursor-pointer w-[16px] h-[16px] rounded-full items-center justify-center ${
                showDropdown && 'bg-[#E8EAED]'
              }`}
              onClick={handleClick}
              aria-hidden="true"
              ref={arrowRef}
            >
              <img
                className="transition duration-300 ease-in-out"
                src="icons/dropdown.svg"
                alt=""
              />
            </div>
          </div>
          <span
            className="text-[11px] capitalize text-[#86898E]"
            onClick={handleClick}
            aria-hidden="true"
            ref={positionRef}
          >
            {user.user.position}
          </span>
        </div>
      </div>
      {showDropdown && (
        <DropdownMenu
          dropdownRef={dropdownRef}
          options={[
            {
              label: 'My Account',
              onClick: () => {
                navigate('/my-account');
              }
            },
            {
              label: 'Logout',
              onClick: () => {
                dispatch(removeUser(null));
                navigate('/');
              }
            }
          ]}
        />
      )}
    </div>
  );
};

export default User;
