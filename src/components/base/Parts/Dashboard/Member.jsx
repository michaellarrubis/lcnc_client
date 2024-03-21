import React from 'react';
import PropTypes from 'prop-types';
import Button from '@baseComponents/Common/Button';

const Member = ({ members }) => {
  const memberDisplay = 4;
  const group = members.reduce((member, a) => {
    let newMember = member[a.team];
    newMember = [...(member[a.team] || []), a];
    return newMember;
  }, {});

  const mappedMembers = Object.keys(group).map(key => {
    return (
      <div className="members__list-container" key={key}>
        <div className="members__count">
          {group[key].slice(0, memberDisplay).map(member => {
            return (
              <span className="member" key={member}>
                <img className="member__img" src={member.image} alt="" />
              </span>
            );
          })}
          {group[key].length > 4 ? (
            <span className="member__count">
              {group[key].length - memberDisplay}+
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="members__team">
          <span className="members__team-name">{key}</span>
          <span className="members__team-total">{`${group[key].length} member${
            group[key].length > 1 ? 's' : ''
          }`}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="members__wrapper">
      <div className="members">
        <h3 className="member__title">Teams</h3>
        <Button modifier="button__view default" name="View All" />
      </div>
      <div className="members__inner">{mappedMembers}</div>
    </div>
  );
};

Member.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      team: PropTypes.string
    })
  )
};

export default Member;
