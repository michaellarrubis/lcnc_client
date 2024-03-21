import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@baseComponents/Common/Tab';
import Account from '@baseComponents/Parts/Dashboard/Account';
import OtherInfo from '@baseComponents/Parts/Dashboard/OtherInfo';
import { getUserInfo } from '@baseStores/users/userActions';
import 'src/assets/base/css/info.scss';
import defaultPicture from 'src/assets/base/icons/defaultProfile2.png';

const Information = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const tabs = [
    {
      title: 'ACCOUNT',
      component: <Account />
    },
    {
      title: 'DETAILS',
      component: <OtherInfo />
    }
  ];

  useEffect(() => {
    dispatch(getUserInfo(user.user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="info__container">
      <h2 className="info__heading">INFORMATION</h2>
      <div className="info__wrapper">
        <div className="info__column">
          <img
            className="info__image"
            src={user.user.image === null ? defaultPicture : user.user.image}
            alt={user.user.first_name ? user.user.first_name : '-'}
          />
        </div>
        <div className="info__column">
          <div className="info__detail">
            <div className="info">
              <span className="info__label">ID</span>
              <span className="info__text">{user.user.id ?? '-'}</span>
            </div>
            <div className="info">
              <span className="info__label">First Name</span>
              <span className="info__text">{user.user?.first_name ?? '-'}</span>
            </div>
            <div className="info">
              <span className="info__label">Last Name</span>
              <span className="info__text">{user.user?.last_name ?? '-'}</span>
            </div>
            <div className="info">
              <span className="info__label">Position</span>
              <span className="info__text">{user.user?.position ?? '-'}</span>
            </div>
            <div className="info">
              <span className="info__label">Employment Status</span>
              <span className="info__text">
                {user.info?.info?.employment_status?.name ?? '-'}
              </span>
            </div>
            <div className="info">
              <span className="info__label">Work Years</span>
              <span className="info__text">
                {user.info && (user.info.work_years || user.info.work_months)
                  ? `${user.info.work_years}y ${user.info.work_months}m`
                  : '-'}
              </span>
            </div>
            <div className="info">
              <span className="info__label">Email</span>
              <span className="info__text">{user.user?.email ?? '-'}</span>
            </div>
            <div className="info" />
          </div>
        </div>
      </div>

      <Tab tabs={tabs} />
    </div>
  );
};

export default Information;
