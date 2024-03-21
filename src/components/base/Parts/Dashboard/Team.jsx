import React, { useEffect } from 'react';
import 'src/assets/base/css/team.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  getUserInfoMyTeam
} from '@baseStores/users/userActions';
import CostCenter from '@baseComponents/Common/CostCenter';

const Team = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.user);
  const selectedUser = useSelector(state => state.user.selectedUserDetails);
  const userId = authUser.user.user.id;
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

  useEffect(() => {
    dispatch(getUserDetails(Number(userId)));
    dispatch(getUserInfoMyTeam(Number(userId)));
  }, [dispatch, userId]);

  const team = {
    costCenterCode: costCenter,
    operationsManager: getDepartmentHead,
    sectionManager: getSectionHead,
    assistantTeamLead: getSubSectionHead,
    teamMembers: getTeamMembers
  };

  return (
    <div className="team__container">
      <div className="team__row">
        <div className="team__column">
          <span className="team__label">Cost Center</span>
          <span className="team__item">
            <CostCenter
              full
              currentValue={team.costCenterCode}
              isEdit={false}
            />
          </span>
        </div>
      </div>
      <div className="team__row">
        <div className="team__column">
          <span className="team__label">Operations Manager</span>
          <span className="team__item">{team.operationsManager}</span>
        </div>
        <div className="team__column">
          <span className="team__label">Section Manager</span>
          <span className="team__item">{team.sectionManager}</span>
        </div>
        <div className="team__column">
          <span className="team__label">Assistant Team Lead</span>
          <span className="team__item">{team.assistantTeamLead}</span>
        </div>
      </div>

      <span className="team__label">Team Members</span>
      <div className="team__row">
        <div className="members__column">
          {team.teamMembers?.map(member => (
            <span className="team__item" key={member.member_user_id}>
              {member.member_user_fullname}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
