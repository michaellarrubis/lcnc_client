import React, { useState, useEffect, useCallback } from 'react';
import PageTitle from '@baseComponents/Common/PageTitle';
import Breadcrumbs from '@baseComponents/Common/Breadcrumbs';
import SectionTitle from '@baseComponents/Common/SectionTitle';
import LabeledText from '@baseComponents/Common/LabeledText';
import Tab from '@baseComponents/Common/Tab';
import Button from '@baseComponents/Common/Button';
import ToggleTextInput from '@baseComponents/Common/ToggleTextInput';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCostCenterByUserId } from 'src/api/modules/base/costCenter';
import CostCenter from '@baseComponents/Common/CostCenter';
import defaultPicture from 'src/assets/icons/defaultProfile2.png';
import { toast } from 'react-toastify';
import 'src/assets/css/projectTeam.scss';
import { updateUserPassword } from 'src/api/modules/base/user';
import {
  getUserDetails,
  getUserInfoMyTeam,
  fetchDataLoad
} from '@baseStores/users/userActions';

const Team = () => {
  const [editing, setEditing] = useState(false);
  const [costCenterCode, setCostCenterCode] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const selectedUser = useSelector(state => state.user.selectedUserDetails);
  const getTeamMembers = selectedUser?.teamMember ?? null;
  const costCenterDetails =
    (selectedUser &&
      selectedUser.userCostCenter &&
      selectedUser.userCostCenter[0]) ||
    null;
  const costCenter =
    (costCenterDetails && costCenterDetails.cost_center) || null;
  const getDepartmentHead =
    (costCenterDetails && costCenterDetails.department_head) || null;
  const getSectionHead =
    (costCenterDetails && costCenterDetails.section_head) || null;
  const getSubSectionHead =
    (costCenterDetails && costCenterDetails.sub_section_head) || null;

  const handleCostCenterID = useCallback(data => {
    const { cost_center_code: costCenterCodeData } = data;
    setCostCenterCode(costCenterCodeData);
  }, []);

  useEffect(() => {
    dispatch(getUserInfoMyTeam(Number(id)));
  }, [dispatch, id]);

  const teamMembers = getTeamMembers?.map(data => {
    return [data.member_user_fullname] ?? ['-'];
  });

  const handleClick = async () => {
    if (editing) {
      const payload = {
        user_id: id,
        cost_center: costCenterCode || costCenter
      };
      const { success } = await updateCostCenterByUserId(payload);
      if (success) {
        dispatch(fetchDataLoad());
        dispatch(getUserInfoMyTeam(Number(id)));
        toast.success('Cost Center Updated');
      } else {
        toast.error('Failed to update, please try again!');
      }
      setEditing('');
    } else {
      setEditing('myteam');
    }
  };

  return (
    <div className={`team-tab ${loading ? 'loading' : ''}`}>
      <div className="team-tab__actions">
        <Button
          name={editing ? 'Save' : 'Edit'}
          modifier={editing ? 'button__save dark' : 'button__edit'}
          onClick={handleClick}
        />
      </div>

      <div className="team-tab__content">
        <div className="team-tab__row">
          <div className="team-tab__col">
            <div className="labeled-text">
              <span className="label">Cost Center</span>
              <span className="text">
                <CostCenter
                  onChange={handleCostCenterID}
                  isEdit={editing}
                  currentValue={costCenter}
                  columns={1}
                  full
                />
              </span>
            </div>
          </div>
        </div>

        <div className="team-tab__row">
          <div className="team-tab__col">
            <ToggleTextInput
              label="Operating Manager"
              value={getDepartmentHead ?? '-'}
              type="select"
              className="ddd"
            />
          </div>
          <div className="team-tab__col">
            <ToggleTextInput
              label="Section Manager"
              value={getSectionHead ?? '-'}
              type="select"
            />
          </div>
          <div className="team-tab__col">
            <ToggleTextInput
              label="Assistant Team Lead"
              value={getSubSectionHead ?? '-'}
              type="select"
            />
          </div>
        </div>
        <div className="team-tab__row">
          <div className="team-tab__col">
            <LabeledText label="Team Members" text={teamMembers} />
          </div>
        </div>
      </div>
    </div>
  );
};

const OtherInfo = () => {
  const [editing, setEditing] = useState('');

  return (
    <div className="other-info-tab">
      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Employment" />
          <Button
            name={editing === 'employment' ? 'Save' : 'Edit'}
            modifier={
              editing === 'employment' ? 'button__save dark' : 'button__edit'
            }
            onClick={() =>
              editing === 'employment'
                ? setEditing('')
                : setEditing('employment')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Date Hired"
                value="2022-02-02"
                isEditing={editing === 'employment'}
                type="date"
              />
              <ToggleTextInput
                label="Grade"
                value="G1"
                isEditing={editing === 'employment'}
                type="select"
                selectOptions={['G1', 'G2']}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Date of Regulariztion"
                value="2022-02-02"
                isEditing={editing === 'employment'}
                type="date"
              />
              <ToggleTextInput
                label="Level"
                value="L1"
                isEditing={editing === 'employment'}
                type="select"
                selectOptions={['L1', 'L2']}
              />
            </div>

            <div className="other-info__col">
              <LabeledText label="" text="" />
            </div>
          </div>
        </div>
      </div>

      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Personal" />
          <Button
            name={editing === 'personal' ? 'Save' : 'Edit'}
            modifier={
              editing === 'personal' ? 'button__save dark' : 'button__edit'
            }
            onClick={() =>
              editing === 'personal' ? setEditing('') : setEditing('personal')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Civil Status"
                value="Single"
                isEditing={editing === 'personal'}
                type="select"
                selectOptions={['Single', 'Married', 'Widowed']}
              />
              <ToggleTextInput
                label="Gender"
                value="Female"
                isEditing={editing === 'personal'}
                type="select"
                selectOptions={['Female', 'Male']}
              />
              <ToggleTextInput
                label="Home Address"
                value="Block 21 Lot 4 Marina Gates Village. Cebu City, Cebu"
                isEditing={editing === 'personal'}
              />
              <ToggleTextInput
                label="Current Address"
                value="Block 21 Lot 4 Marina Gates Village. Cebu City, Cebu"
                isEditing={editing === 'personal'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Birthday"
                value="2022-02-02"
                isEditing={editing === 'personal'}
                type="date"
              />
              <ToggleTextInput
                label="Blood Type"
                value="A+"
                isEditing={editing === 'personal'}
                type="select"
                selectOptions={['A-', 'A+']}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Age"
                value="26"
                isEditing={editing === 'personal'}
              />
              <ToggleTextInput
                label="Manpower"
                value="10"
                isEditing={editing === 'personal'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Contact" />
          <Button
            name={editing === 'contact' ? 'Save' : 'Edit'}
            modifier={
              editing === 'contact' ? 'button__save dark' : 'button__edit'
            }
            onClick={() =>
              editing === 'contact' ? setEditing('') : setEditing('contact')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Mobile Number"
                value="091234567891"
                isEditing={editing === 'contact'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Telephone Number"
                value="091234567891"
                isEditing={editing === 'contact'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Personal E-mail"
                value="email@lcnc.inc"
                isEditing={editing === 'contact'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Government" />
          <Button
            name={editing === 'government' ? 'Save' : 'Edit'}
            modifier={
              editing === 'government' ? 'button__save dark' : 'button__edit'
            }
            onClick={() =>
              editing === 'government'
                ? setEditing('')
                : setEditing('government')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="SSS Number"
                value="091-2345-678-91"
                isEditing={editing === 'government'}
              />
              <ToggleTextInput
                label="HDMF"
                value="091-2345-678-91"
                isEditing={editing === 'government'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Philhealth Number"
                value="091-2345-678-91"
                isEditing={editing === 'government'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="TIN"
                value="091-2345-678-91"
                isEditing={editing === 'government'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Emergency" />
          <Button
            name={editing === 'emergency' ? 'Save' : 'Edit'}
            modifier={
              editing === 'emergency' ? 'button__save dark' : 'button__edit'
            }
            onClick={() =>
              editing === 'emergency' ? setEditing('') : setEditing('emergency')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Name of Contact"
                value="Emma Roberts"
                isEditing={editing === 'emergency'}
              />
              <ToggleTextInput
                label="Address"
                value="Block 21 Lot 4 Marina Gates Village. Cebu City, Cebu"
                isEditing={editing === 'emergency'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Relation"
                value="Mother"
                isEditing={editing === 'emergency'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Contact Number"
                value="091234567891"
                isEditing={editing === 'emergency'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Family Background" />
          <Button
            name={editing === 'family' ? 'Save' : 'Edit'}
            modifier={
              editing === 'family' ? 'button__save dark' : 'button__edit'
            }
            onClick={() =>
              editing === 'family' ? setEditing('') : setEditing('family')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Dependent 1 Name"
                value="Emma Roberts"
                isEditing={editing === 'family'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Relation"
                value="Mother"
                isEditing={editing === 'family'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Gender"
                value="Female"
                isEditing={editing === 'family'}
                type="select"
                selectOptions={['Female', 'Male']}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Age"
                value="40"
                isEditing={editing === 'family'}
              />
            </div>
          </div>

          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Dependent 2 Name"
                value="Emma Roberts"
                isEditing={editing === 'family'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Relation"
                value="Mother"
                isEditing={editing === 'family'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Gender"
                value="Female"
                isEditing={editing === 'family'}
                type="select"
                selectOptions={['Female', 'Male']}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Age"
                value="40"
                isEditing={editing === 'family'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Educational Background" />
          <Button
            name={editing === 'education' ? 'Save' : 'Edit'}
            modifier={
              editing === 'education' ? 'button__save dark' : 'button__edit'
            }
            onClick={() =>
              editing === 'education' ? setEditing('') : setEditing('education')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Education 1 Level"
                value="College"
                isEditing={editing === 'education'}
              />
              <ToggleTextInput
                label="Degree Course"
                value="BSCS"
                isEditing={editing === 'education'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Name of School"
                value="Cebu International School"
                isEditing={editing === 'education'}
              />
              <ToggleTextInput
                label="Inclusive Years"
                value="2014 - 2018"
                isEditing={editing === 'education'}
              />
            </div>
          </div>

          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Education 2 Level"
                value="College"
                isEditing={editing === 'education'}
              />
              <ToggleTextInput
                label="Degree Course"
                value="BSCS"
                isEditing={editing === 'education'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Name of School"
                value="Cebu International School"
                isEditing={editing === 'education'}
              />
              <ToggleTextInput
                label="Inclusive Years"
                value="2014 - 2018"
                isEditing={editing === 'education'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="other-info__section">
        <div className="other-info__actions">
          <SectionTitle title="Work Experience" />
          <Button
            name={editing === 'work' ? 'Save' : 'Edit'}
            modifier={editing === 'work' ? 'button__save dark' : 'button__edit'}
            onClick={() =>
              editing === 'work' ? setEditing('') : setEditing('work')
            }
          />
        </div>

        <div className="other-info__content">
          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Work Experience 1 Title"
                value="Mobile Designer"
                isEditing={editing === 'work'}
              />
              <ToggleTextInput
                label="Position Level"
                value="Managerial"
                isEditing={editing === 'work'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Name of Company"
                value="Facebook Corp"
                isEditing={editing === 'work'}
              />
              <ToggleTextInput
                label="Number of Years"
                value="10"
                isEditing={editing === 'work'}
              />
            </div>
          </div>

          <div className="other-info__row">
            <div className="other-info__col">
              <ToggleTextInput
                label="Work Experience 2 Title"
                value="Mobile Designer"
                isEditing={editing === 'work'}
              />
              <ToggleTextInput
                label="Position Level"
                value="Managerial"
                isEditing={editing === 'work'}
              />
            </div>

            <div className="other-info__col">
              <ToggleTextInput
                label="Name of Company"
                value="Facebook Corp"
                isEditing={editing === 'work'}
              />
              <ToggleTextInput
                label="Number of Years"
                value="10"
                isEditing={editing === 'work'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { first_name: firstName, last_name: lastName } = useSelector(
    state => state.user.selectedUserDetails.user
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.user.selectedUserDetails);
  const isExempted = info ? info.is_excempted : '';
  const [exempted, setExempted] = useState(isExempted);

  useEffect(() => {
    dispatch(getUserDetails(Number(id)));
  }, [dispatch, id]);

  const handleSubmit = async () => {
    if (editing) {
      if (newPassword === undefined) {
        setEditing(false);
      } else {
        const payload = { password: newPassword.password };
        const { success } = await updateUserPassword(id, payload);
        if (success) toast.success('Updated User Password!');
        setEditing(false);
      }
    } else {
      setEditing(true);
      setNewPassword();
    }
  };

  const handleChange = value => {
    setNewPassword(prevState => ({
      ...prevState,
      password: value
    }));
  };

  const handleButtonSwitch = () => {
    if (editing) {
      setEditing(false);
      setExempted(isExempted);
    } else {
      setEditing(true);
    }
    setNewPassword();
  };

  if (newPassword) {
    if (newPassword.password.length <= 0) {
      setNewPassword();
    }
  }

  return (
    <div className="login-tab">
      <div className="login-tab__actions">
        <SectionTitle title="Login Information" />
        <div className="login-button">
          {editing ? (
            <>
              <Button
                name={editing ? 'Cancel' : ''}
                modifier={editing ? 'button__info mr-15' : ''}
                onClick={() => handleButtonSwitch()}
              />
              <Button
                name={editing ? 'Save' : ''}
                disabled={
                  isExempted === exempted ? newPassword === undefined : false
                }
                modifier={editing ? 'button__save dark' : ''}
                onClick={() => handleSubmit()}
              />
            </>
          ) : (
            <Button
              name={editing ? '' : 'Edit'}
              modifier={editing ? '' : 'button__edit'}
              onClick={() => handleButtonSwitch()}
            />
          )}
        </div>
      </div>

      <div className="login-tab__content">
        <div className="login-tab__row" />

        <div className="login-tab__row">
          <div className="login-tab__col">
            <ToggleTextInput
              label="Employee Name"
              value={`${firstName} ${lastName}`}
            />
          </div>

          <div className="login-tab__col">
            {!editing ? (
              <ToggleTextInput label="Password" value="******" />
            ) : (
              <ToggleTextInput
                label="Password"
                name="password"
                inputType="password"
                type="input"
                placeholder="******"
                isEditing={editing}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info, user } = useSelector(state => state.user.selectedUserDetails);

  useEffect(() => {
    dispatch(getUserDetails(Number(id)));
  }, [dispatch, id]);

  return (
    <div className="user__container">
      <div className="user__heading">
        <div className="user__heading--title">
          <PageTitle
            title={
              user && user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : '-'
            }
            backButton
            backPath="/users"
          />
        </div>

        <Breadcrumbs
          crumbs={[
            { link: '/users', name: 'User' },
            { link: `/users/${id}`, name: 'User Detail' },
            `${user.first_name} ${user.last_name}`
          ]}
        />
      </div>

      <div className="user__section">
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
                    text={user && user.last_name ? user.last_name : ''}
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
        </div>
      </div>

      <div className="user__section">
        <Tab
          shaded={false}
          padded={false}
          tabs={[
            {
              title: 'Details',
              component: <OtherInfo />
            },
            {
              title: 'My Team',
              component: <Team />
            },
            { title: 'Account', component: <Login /> }
          ]}
        />
      </div>
    </div>
  );
};

export default UserInfo;
