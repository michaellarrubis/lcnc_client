import React, { useEffect, useState } from 'react';
import 'src/assets/css/user.scss';
import Breadcrumbs from '@baseComponents/Common/Breadcrumbs';
import PageTitle from '@baseComponents/Common/PageTitle';
import SectionTitle from '@baseComponents/Common/SectionTitle';
import Button from '@baseComponents/Common/Button';
import LabeledText from '@baseComponents/Common/LabeledText';
import Tab from '@baseComponents/Common/Tab';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  getUserInfoMyTeam,
  fetchDataLoad,
  getUserSkills
} from '@baseStores/users/userActions';
import Datatable from '@baseComponents/Common/Datatable';
import defaultPicture from 'src/assets/icons/defaultProfile2.png';

const SkillSetTab = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newSkill, setNewSkill] = useState([]);
  const userSkill = useSelector(state => state.user.userSkillDetails);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserSkills(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const skills = [...userSkill]?.map(
      ({
        rating,
        skill: {
          SkillCategory: { name: categoryName },
          name: skillName
        }
      }) => ({
        category: categoryName,
        skill: skillName,
        rating: rating.toString()
      })
    );

    setNewSkill(skills);
  }, [userSkill]);

  return (
    <div className="skillset-tab">
      <div className="skillset-table__heading">
        <SectionTitle title="All Skillset" />
        <Button
          name="Edit Skillset"
          modifier="button__edit"
          onClick={() => navigate(`${location.pathname}/skills/edit`)}
        />
      </div>
      <Datatable
        keyField="skillset"
        headingColumns={[
          { key: 'category', label: 'Category' },
          { key: 'skill', label: 'Skillset' },
          { key: 'rating', label: 'Rating' }
        ]}
        datasource={newSkill}
      />
    </div>
  );
};

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const selectedUser = useSelector(state => state.user.selectedUserDetails);
  const user = (selectedUser && selectedUser.user) || null;
  const info = (selectedUser && selectedUser.info) || null;

  useEffect(() => {
    dispatch(fetchDataLoad());
    dispatch(getUserInfoMyTeam(Number(id)));
    dispatch(getUserDetails(Number(id)));
  }, [id, dispatch]);

  return (
    <div className="user__container">
      <Breadcrumbs crumbs={[{ link: '/users', name: 'User' }, 'User Detail']} />

      <div className={`user__section ${loading ? 'loading' : ''}`}>
        <div className="user__section--heading">
          <SectionTitle title="Information" />
        </div>

        <div className="info-details__content">
          <div className="info-details__content--row">
            <div className="info-details__content--col">
              <div className="profile-image">
                <img
                  src={user && user.image ? user.image : defaultPicture}
                  alt=""
                />
              </div>
            </div>

            <div className="info-details__content--col">
              <div className="info-details__content--row">
                <div className="info-details__content--col">
                  <LabeledText
                    label="ID"
                    text={info && info.id_no ? info.id_no : '-'}
                  />
                  <LabeledText
                    label="Position"
                    text={user && user.position ? user.position : '-'}
                  />
                  <LabeledText
                    label="Email"
                    text={user && user.email ? user.email : '-'}
                  />
                </div>
                <div className="info-details__content--col">
                  <LabeledText
                    label="First Name"
                    text={user && user.first_name ? user.first_name : '-'}
                  />
                  <LabeledText
                    label="Employment Status"
                    text={
                      info && info.employment_status
                        ? info.employment_status.name
                        : '-'
                    }
                  />
                </div>
                <div className="info-details__content--col">
                  <LabeledText
                    label="Last Name"
                    text={user && user.last_name ? user.last_name : '-'}
                  />
                  <LabeledText
                    label="Work Years"
                    text={
                      info && (info.work_years || info.work_months)
                        ? `${info.work_years}y ${info.work_months}m`
                        : '-'
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="info-details__content--action-row">
            <Button
              name="User Info"
              modifier="button__info"
              onClick={() => navigate(`${location.pathname}/info`)}
            />
          </div>
        </div>
      </div>

      <div className="user__section">
        <Tab
          padded={false}
          shaded={false}
          tabs={[
            {
              title: 'Skillset',
              component: <SkillSetTab />
            }
          ]}
        />
      </div>
    </div>
  );
};

export default UserDetails;
