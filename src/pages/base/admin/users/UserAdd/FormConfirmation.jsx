import React from 'react';
import Modal from '@baseComponents/Common/Modal';
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
import Button from '@baseComponents/Common/Button';
import './FormConfirmation.scss';
import PropTypes from 'prop-types';

const FormConfirmation = ({
  data,
  isOpen,
  onClose,
  onConfirm,
  salaryGrades,
  employmentStatusList,
  roles,
  positions,
  costCenters
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="form-confirm-fields">
        <div className="form-confirm-fields__title">
          Please confirm the details
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">First Name</div>
          <div className="form-confirm-fields__value">{data.first_name}</div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Last Name</div>
          <div className="form-confirm-fields__value">{data.last_name}</div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Employee ID</div>
          <div className="form-confirm-fields__value">{data.id_number}</div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Email</div>
          <div className="form-confirm-fields__value">{data.email}</div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Birthday</div>
          <div className="form-confirm-fields__value">{data.birthday}</div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Cost Center</div>
          <div className="form-confirm-fields__value">
            {costCenters.find(({ value }) => value === data.cost_center_code)
              ?.label || '-'}
          </div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Salary Grade</div>
          <div className="form-confirm-fields__value">
            {salaryGrades.find(
              ({ value }) => value === Number(data.salary_grade_id)
            )?.label || '-'}
          </div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Position</div>
          <div className="form-confirm-fields__value">
            {positions.find(({ value }) => value === Number(data.position))
              ?.label || '-'}
          </div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Employment Status</div>
          <div className="form-confirm-fields__value">
            {employmentStatusList.find(
              ({ value }) => value === Number(data.employment_status_id)
            )?.label || '-'}
          </div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Date Hired</div>
          <div className="form-confirm-fields__value">{data.date_hired}</div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">Date Regularized</div>
          <div className="form-confirm-fields__value">
            {data.date_regularized}
          </div>
        </div>
        <div className="form-confirm-fields__row">
          <div className="form-confirm-fields__label">User Type</div>
          <div className="form-confirm-fields__value">
            {roles.find(({ value }) => value === Number(data.role_id))?.label ||
              '-'}
          </div>
        </div>
        <div className="form-confirm-fields__buttons">
          <Button
            name="Cancel"
            modifier="button__default default"
            type="button"
            onClick={onClose}
          />
          <Button
            name="Confirm"
            modifier="button__default dark"
            type="button"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

FormConfirmation.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(Object)),
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  onConfirm: PropTypes.bool,
  salaryGrades: PropTypes.string,
  employmentStatusList: PropTypes.string,
  roles: PropTypes.string,
  positions: PropTypes.string,
  costCenters: PropTypes.string
};
export default FormConfirmation;
