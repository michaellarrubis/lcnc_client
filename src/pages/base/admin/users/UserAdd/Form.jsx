import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import Button from '@baseComponents/Common/Button';
import PageTitle from '@baseComponents/Common/PageTitle';
import PropTypes from 'prop-types';

const Form = ({
  data,
  setData,
  onSubmit,
  salaryGrades,
  employmentStatusList,
  roles,
  positions,
  inputRef,
  isSubmitDisabled,
  costCenters
}) => {
  const handleChange = event => {
    setData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    setData(prevState => ({
      ...prevState,
      date_regularized: DateTime.fromISO(data.date_hired)
        .plus({ months: 6, days: 1 })
        .toFormat('yyyy-MM-dd')
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.date_hired]);
  const tabIndexValue = 1;
  const tabIndexValue2 = 2;

  return (
    <div className="user-add">
      <form
        className="user-add__form form"
        action=""
        method="POST"
        onSubmit={event => onSubmit(data, event)}
      >
        <div className="user-add__header">
          <Button
            name="Save"
            modifier="button__save dark button--pc"
            type="submit"
            tabIndex={tabIndexValue}
            disabled={isSubmitDisabled}
          />
        </div>
        <div className="user-add__control-container">
          <div className="form__row">
            <div className="form__input">
              <label className="form__input-label" htmlFor="id_number">
                Employee ID
                <input
                  className="form__input-control"
                  type="text"
                  value={data.id_number}
                  name="id_number"
                  id="id_number"
                  onChange={handleChange}
                  tabIndex={tabIndexValue}
                  ref={inputRef}
                />
              </label>
            </div>
            <div className="form__input">
              <label className="form__input-label" htmlFor="date_hired">
                Date Hired
                <input
                  className="form__input-control"
                  type="date"
                  value={data.date_hired}
                  name="date_hired"
                  id="date_hired"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                />
              </label>
            </div>
            <div className="form__input">
              <label className="form__input-label" htmlFor="date_regularized">
                Date Regularized
                <input
                  className="form__input-control"
                  type="date"
                  value={data.date_regularized}
                  name="date_regularized"
                  id="date_regularized"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                />
              </label>
            </div>
          </div>
          <div className="form__row">
            <div className="form__input">
              <label className="form__input-label" htmlFor="first_name">
                First Name
                <input
                  className="form__input-control"
                  type="text"
                  value={data.first_name}
                  name="first_name"
                  id="first_name"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                />
              </label>
            </div>
            <div className="form__input">
              <label className="form__input-label" htmlFor="last_name">
                Last Name
                <input
                  className="form__input-control"
                  type="text"
                  value={data.last_name}
                  name="last_name"
                  id="last_name"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                />
              </label>
            </div>
            <div className="form__input">
              <label className="form__input-label" htmlFor="email">
                Email Address
                <input
                  className="form__input-control"
                  type="email"
                  value={data.email}
                  name="email"
                  id="email"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                />
              </label>
            </div>
          </div>
          <div className="form__row">
            <div className="form__input">
              <label className="form__input-label" htmlFor="cost_center_code">
                Cost Center
                <select
                  className="form__input-control form__input-control--select"
                  value={data.cost_center_code}
                  name="cost_center_code"
                  id="cost_center_code"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                >
                  <option key="placeholder" value="" disabled hidden>
                    Select cost center
                  </option>
                  {costCenters.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form__input">
              <label className="form__input-label" htmlFor="salary_grade_id">
                Salary Grade
                <select
                  className="form__input-control form__input-control--select"
                  value={data.salary_grade_id}
                  name="salary_grade_id"
                  id="salary_grade_id"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                >
                  <option key="placeholder" value="" disabled hidden>
                    Select salary grade
                  </option>
                  {salaryGrades.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form__input">
              <label
                className="form__input-label"
                htmlFor="employment_status_id"
              >
                Employment Status
                <select
                  className="form__input-control form__input-control--select"
                  value={data.employment_status_id}
                  name="employment_status_id"
                  id="employment_status_id"
                  onChange={handleChange}
                  required
                  tabIndex={tabIndexValue}
                >
                  <option key="placeholder" value="" disabled hidden>
                    Select employment status
                  </option>
                  {employmentStatusList.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="form__row">
            <div className="form__input">
              <label className="form__input-label" htmlFor="role_id">
                User Type
                <select
                  className="form__input-control form__input-control--select"
                  value={data.role_id}
                  name="role_id"
                  id="role_id"
                  onChange={handleChange}
                  tabIndex={tabIndexValue}
                >
                  <option key="placeholder" value="" disabled hidden>
                    Select user type
                  </option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form__input">
              <div className="form__input">
                <label className="form__input-label" htmlFor="birthday">
                  Birthday
                  <input
                    className="form__input-control"
                    type="date"
                    value={data.birthday}
                    name="birthday"
                    id="birthday"
                    onChange={handleChange}
                    required
                    tabIndex={tabIndexValue}
                  />
                </label>
              </div>
            </div>
            <div className="form__input">
              <label className="form__input-label" htmlFor="position">
                Position
                <select
                  className="form__input-control form__input-control--select"
                  value={data.position}
                  name="position"
                  id="position"
                  onChange={handleChange}
                  tabIndex={tabIndexValue}
                >
                  <option key="placeholder" value="" disabled hidden>
                    Select position
                  </option>
                  {positions.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="form__row">
            <Button
              name="Save"
              modifier="button__save dark button--sp"
              type="submit"
              tabIndex={tabIndexValue2}
              disabled={isSubmitDisabled}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  data: PropTypes.arrayOf,
  setData: PropTypes.func,
  onSubmit: PropTypes.func,
  salaryGrades: PropTypes.arrayOf,
  employmentStatusList: PropTypes.arrayOf,
  roles: PropTypes.arrayOf,
  positions: PropTypes.arrayOf,
  inputRef: PropTypes.arrayOf,
  isSubmitDisabled: PropTypes.bool,
  costCenters: PropTypes.arrayOf
};

export default Form;
