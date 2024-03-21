import React, { useEffect, useState } from 'react';
import 'src/assets/base/css/detail.scss';
import {
  fetchUserDataService,
  fetchSalaryGradesService,
  fetchGenderListService,
  fetchFamilyRelationsListService
} from 'src/api/modules/base/userInfo';

const OtherInfo = () => {
  const [userInfoData, setUserInfoData] = useState(null);
  const [salaryList, setSalaryList] = useState(null);
  const [genderList, setGenderList] = useState([]);
  const [relationList, setRelationList] = useState([]);

  const getListName = (list, key) =>
    list
      ?.map(({ id, name }) => (key === id ? name : ''))
      ?.filter(item => item !== '')[0];

  const getSalaryType = (list, key) =>
    list
      ?.map(({ id, type }) => (key === id ? type : ''))
      ?.filter(item => item !== '')[0];

  const isValid = data => {
    if (data === null || data === undefined) {
      return '-';
    }
    return data;
  };

  async function fetchUserData() {
    try {
      const { data, success } = await fetchUserDataService();

      if (success) {
        setUserInfoData(data?.info);
      }
    } catch (error) {
      return error;
    }

    return undefined;
  }

  async function fetchSalaryGrades() {
    try {
      const { data, success } = await fetchSalaryGradesService();

      if (success) {
        setSalaryList(data);
      }
    } catch (error) {
      return error;
    }

    return undefined;
  }

  async function fetchGenderList() {
    try {
      const { data, success } = await fetchGenderListService();

      if (success) {
        setGenderList(data);
      }
    } catch (error) {
      return error;
    }

    return undefined;
  }

  async function fetchFamilyRelationsList() {
    try {
      const { data, success } = await fetchFamilyRelationsListService();

      if (success) {
        setRelationList(data);
      }
    } catch (error) {
      return error;
    }

    return undefined;
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userInfoData)
    return (
      <div className="detail__container employment">
        <div className="detail__inner">
          <p className="other-info_no-data user">No data available.</p>
        </div>
      </div>
    );

  return (
    <div className="others__container">
      <div className="detail__container employment">
        <div className="detail__heading">
          <h2 className="detail__text">Employment</h2>
        </div>
        {isValid(userInfoData?.date_hired) === '-' &&
        isValid(userInfoData?.date_regularized) === '-' &&
        isValid(userInfoData?.salary_grade_id) === '-' ? (
          <div className="detail__inner">
            <p className="other-info_no-data user">No data available.</p>
          </div>
        ) : (
          <div className="detail__inner">
            <p className="detail__label">
              Date Hired
              <span className="detail__info">
                {isValid(userInfoData?.date_hired)}{' '}
              </span>
            </p>
            <p className="detail__label">
              Date of Regularization
              <span className="detail__info">
                {isValid(userInfoData?.date_regularized)}
              </span>
            </p>
            <p className="detail__label">
              Grade
              <span className="detail__info">
                {isValid(
                  getSalaryType(salaryList, userInfoData?.salary_grade_id)
                )}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="detail__container personal">
        <div className="detail__heading">
          <h2 className="detail__text">Personal</h2>
        </div>
        {isValid(userInfoData?.civil_status?.name) === '-' &&
        isValid(userInfoData?.birthday) === '-' &&
        isValid(userInfoData?.age) === '-' &&
        isValid(userInfoData?.gender?.id) === '-' &&
        isValid(userInfoData?.blood_type?.name) === '-' &&
        isValid(userInfoData?.manpower) === '-' &&
        isValid(userInfoData?.home_address) === '-' &&
        isValid(userInfoData?.current_address) === '-' ? (
          <div className="detail__inner">
            <p className="other-info_no-data user">No data available.</p>
          </div>
        ) : (
          <div className="detail__inner">
            <p className="detail__label">
              Civil Status
              <span className="detail__info">
                {isValid(userInfoData?.civil_status?.name)}{' '}
              </span>
            </p>
            <p className="detail__label">
              Birthday
              <span className="detail__info">
                {isValid(userInfoData?.birthday)}
              </span>
            </p>
            <p className="detail__label">
              Age
              <span className="detail__info">{isValid(userInfoData?.age)}</span>
            </p>
            <p className="detail__label">
              Gender
              <span className="detail__info">
                {isValid(getListName(genderList, userInfoData?.gender?.id))}
              </span>
            </p>
            <p className="detail__label">
              Blood Type
              <span className="detail__info">
                {isValid(userInfoData?.blood_type?.name)}
              </span>
            </p>
            <p className="detail__label">
              Manpower
              <span className="detail__info">
                {isValid(userInfoData?.manpower)}
              </span>
            </p>
            <p className="detail__label">
              Home Address
              <span className="detail__info">
                {isValid(userInfoData?.home_address)}
              </span>
            </p>
            <p className="detail__label">
              Current Address
              <span className="detail__info">
                {isValid(userInfoData?.current_address)}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="detail__container government">
        <div className="detail__heading">
          <h2 className="detail__text">Government</h2>
        </div>
        {isValid(userInfoData?.sss_no) === '-' &&
        isValid(userInfoData?.philhealth_no) === '-' &&
        isValid(userInfoData?.tin_no) === '-' &&
        isValid(userInfoData?.pagibig_no) === '-' ? (
          <div className="detail__inner">
            <p className="other-info_no-data user">No data available.</p>
          </div>
        ) : (
          <div className="detail__inner">
            <p className="detail__label">
              SSS Number
              <span className="detail__info">
                {isValid(userInfoData?.sss_no)}{' '}
              </span>
            </p>
            <p className="detail__label">
              Philhealth Number
              <span className="detail__info">
                {isValid(userInfoData?.philhealth_no)}
              </span>
            </p>
            <p className="detail__label">
              TIN
              <span className="detail__info">
                {isValid(userInfoData?.tin_no)}
              </span>
            </p>
            <p className="detail__label">
              HDMF
              <span className="detail__info">
                {isValid(userInfoData?.pagibig_no)}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="detail__container emergency">
        <div className="detail__heading">
          <h2 className="detail__text">Emergency</h2>
        </div>
        {isValid(userInfoData?.emergency_contact) === '-' &&
        isValid(userInfoData?.emergency_contact_relation) === '-' &&
        isValid(userInfoData?.emergency_contact_no) === '-' &&
        isValid(userInfoData?.emergency_contact_address) === '-' ? (
          <div className="detail__inner">
            <p className="other-info_no-data user">No data available.</p>
          </div>
        ) : (
          <div className="detail__inner">
            <p className="detail__label">
              Name of Contact
              <span className="detail__info">
                {isValid(userInfoData?.emergency_contact)}{' '}
              </span>
            </p>
            <p className="detail__label">
              Relation
              <span className="detail__info">
                {isValid(
                  getListName(
                    relationList,
                    userInfoData?.emergency_contact_relation
                  )
                )}
              </span>
            </p>
            <p className="detail__label">
              Contact Number
              <span className="detail__info">
                {isValid(userInfoData?.emergency_contact_no)}
              </span>
            </p>
            <p className="detail__label">
              Address
              <span className="detail__info">
                {isValid(userInfoData?.emergency_contact_address)}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="detail__container family_background">
        <div className="detail__heading">
          <h2 className="detail__text">Family Background</h2>
        </div>

        {isValid(userInfoData?.family_background) === '-' ||
        userInfoData?.family_background?.length !== 0 ? (
          userInfoData.family_background?.map(
            ({
              id,
              first_name,
              last_name,
              relation: relation_id,
              gender: gender_id,
              age
            }) => (
              <div className="detail__inner" key={id}>
                <p className="detail__label">
                  Dependendent {id} Name
                  <span className="detail__info">
                    {isValid(`${first_name} ${last_name}`)}{' '}
                  </span>
                </p>
                <p className="detail__label">
                  Relation
                  <span className="detail__info">
                    {isValid(getListName(relationList, relation_id))}
                  </span>
                </p>
                <p className="detail__label">
                  Gender
                  <span className="detail__info">
                    {isValid(getListName(genderList, gender_id))}
                  </span>
                </p>
                <p className="detail__label">
                  Age
                  <span className="detail__info">{isValid(age)}</span>
                </p>
                <div className="detail__bar" />
              </div>
            )
          )
        ) : (
          <div className="detail__inner no-data">
            <p className="other-info_no-data user">No data available.</p>
          </div>
        )}
      </div>

      <div className="detail__container educational_background">
        <div className="detail__heading">
          <h2 className="detail__text">Educational Background</h2>
        </div>

        {isValid(userInfoData?.educational_background) === '-' ||
        userInfoData?.educational_background?.length !== 0 ? (
          userInfoData.educational_background?.map(
            ({
              id,
              degree_course,
              level,
              end_year,
              school_name,
              start_year
            }) => (
              <div className="detail__inner" key={id}>
                <p className="detail__label" key={id}>
                  Education {id} Level
                  <span className="detail__info">{isValid(level)} </span>
                </p>
                <p className="detail__label">
                  Name of School
                  <span className="detail__info">{isValid(school_name)}</span>
                </p>
                <p className="detail__label">
                  Degree Course
                  <span className="detail__info">{isValid(degree_course)}</span>
                </p>
                <p className="detail__label">
                  Inclusive Years
                  <span className="detail__info">
                    {isValid(`${start_year} - ${end_year}`)}
                  </span>
                </p>
                <div className="detail__bar" />
              </div>
            )
          )
        ) : (
          <div className="detail__inner no-data">
            <p className="other-info_no-data user">No data available.</p>
          </div>
        )}
      </div>

      <div className="detail__container work_experience">
        <div className="detail__heading">
          <h2 className="detail__text">Work Experience</h2>
        </div>
        {isValid(userInfoData?.work_experiences) === '-' ||
        userInfoData?.work_experiences?.length !== 0 ? (
          userInfoData.work_experiences?.map(
            ({ id, title, company_name, position_level, years_stayed }) => (
              <div className="detail__inner" key={id}>
                <p className="detail__label">
                  Work Experience {id} Title
                  <span className="detail__info">{isValid(title)} </span>
                </p>
                <p className="detail__label">
                  Name of Company
                  <span className="detail__info">{isValid(company_name)}</span>
                </p>
                <p className="detail__label">
                  Position Level
                  <span className="detail__info">
                    {isValid(position_level)}
                  </span>
                </p>
                <p className="detail__label">
                  Number of Years
                  <span className="detail__info">{isValid(years_stayed)}</span>
                </p>
                <div className="detail__bar" />
              </div>
            )
          )
        ) : (
          <div className="detail__inner no-data">
            <p className="other-info_no-data user">No data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherInfo;
