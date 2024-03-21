import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { addUser } from 'src/api/modules/user';
import { fetchAPI } from 'src/api/fetchAPI';
import { ADMIN_ROLES } from 'src/api/endpoints';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import _ from 'lodash';
import Form from './Form';
import FormConfirmation from './FormConfirmation';
import './index.scss';

const UserAdd = () => {
  const initialFormData = {
    id_number: '',
    role_id: '',
    date_hired: DateTime.now().toFormat('yyyy-MM-dd'),
    date_regularized: DateTime.now()
      .plus({ months: 6, days: 1 })
      .toFormat('yyyy-MM-dd'),
    first_name: '',
    last_name: '',
    email: '',
    employment_status_id: 1,
    cost_center_code: '',
    salary_grade_id: '',
    position: '',
    birthday: ''
  };

  const [isConfirming, setIsConfirming] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const inputRef = useRef(null);

  const salaryGrades = useSelector(state =>
    state.salaryGrades.salaryGrades.map(item => ({
      label: item.type,
      value: Number(item.id)
    }))
  );

  const employmentStatusList = useSelector(state =>
    state.employmentStatus.employmentStatus.map(item => ({
      label: item.name,
      value: Number(item.id)
    }))
  );

  const positions = useSelector(state =>
    state.positions.positions.map(item => ({
      label: item.name,
      value: Number(item.id)
    }))
  );

  const costCenterList = useSelector(state => state.costCenter.costCenterList);
  const divisionList = useSelector(state => state.divisions.divisions);
  const departmentList = useSelector(state => state.departments.departments);
  const sectionList = useSelector(state => state.sections.sections);
  const subSectionList = useSelector(state => state.subSections.subSections);

  const costCenters = costCenterList.map(costCenter => {
    const { length } = costCenter.cost_center_code;
    const endCode = costCenter.cost_center_code.slice(-2);
    let label;
    switch (length) {
      case 2:
        label = divisionList.find(
          division => division.division_code === endCode
        )?.division_name;
        break;
      case 4:
        label = departmentList.find(
          department => department.department_code === endCode
        )?.department_name;
        break;
      case 6:
        label = sectionList.find(
          section => section.section_code === endCode
        )?.section_name;
        break;
      case 8:
        label = subSectionList.find(
          subSection => subSection.sub_section_code === endCode
        )?.sub_section_name;
        break;
      default:
        break;
    }

    return {
      label: `${costCenter.cost_center_code} / ${label}`,
      value: costCenter.cost_center_code
    };
  });

  const getRoles = async () => {
    const { data, success } = await fetchAPI({
      method: 'GET',
      endpoint: ADMIN_ROLES
    });

    if (success) {
      const result = data
        .filter(role => role.role_name !== 'manager')
        .map(role => {
          return {
            label: _.startCase(role.role_name),
            value: Number(role.id)
          };
        });
      setRoles(result);
    }
  };

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    setFormData(data);
    setIsConfirming(true);
  };

  const handleModalClose = () => {
    setIsConfirming(false);
  };

  const handleConfirm = async () => {
    const payload = {
      username: formData.email,
      email: formData.email,
      password: 'password',
      first_name: formData.first_name,
      last_name: formData.last_name,
      status: 1,
      role_id: formData.role_id,
      image: null,
      project: null,
      position: formData.position,
      info: {
        id_number: formData.id_number,
        civil_status_id: 1,
        birthday: formData.birthday,
        age: 33,
        gender_id: 1,
        blood_type_id: 1,
        manpower: 10,
        home_address: 'Block 21 Lot 4 Marina Gates Village, Cebu City, Cebu',
        current_address: 'Block 21 Lot 4 Marina Gates Village, Cebu City, Cebu',
        personal_email: 'personal@gmail.com',
        phone_no: '09123456789',
        landline_no: '322-4459',
        sss_no: '0631221760',
        philhealth_no: '120421256723',
        tin_no: '534385852583',
        pagibig_no: '628346839665',
        emergency_contact: 'Benj Enriquez',
        emergency_contact_relation: 1,
        emergency_contact_no: '09095833345',
        emergency_contact_address:
          'Block 21 Lot 4 Marina Gates Village, Cebu City, Cebu',
        date_hired: formData.date_hired,
        date_regularized: formData.date_regularized,
        end_date: null,
        employment_status_id: formData.employment_status_id,
        work_years: 3,
        work_months: 2,
        salary_grade_id: formData.salary_grade_id,
        rank_id: null,
        cost_center: formData.cost_center_code
      }
    };

    const result = await addUser(payload);

    if (result.success) {
      toast.success('User creation successful!');
    } else {
      let errorMessage = '';
      if (result.response.data.data === 'User Name or Email Already Taken') {
        errorMessage = 'Email is already taken!';
      } else {
        errorMessage = 'User creation failed!';
      }
      toast.error(errorMessage);
    }
    setIsConfirming(false);
    setFormData(initialFormData);
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (!isConfirming) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isConfirming]);

  useEffect(() => {
    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === 'email') {
        const emailFormat =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value.match(emailFormat);
      }
      return value;
    });
    setIsSubmitDisabled(!isValid);
  }, [formData]);

  return (
    <>
      <FormConfirmation
        data={formData}
        isOpen={isConfirming}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        salaryGrades={salaryGrades}
        employmentStatusList={employmentStatusList}
        roles={roles}
        positions={positions}
        costCenters={costCenters}
      />
      <Form
        data={formData}
        setData={setFormData}
        onSubmit={handleSubmit}
        salaryGrades={salaryGrades}
        employmentStatusList={employmentStatusList}
        roles={roles}
        positions={positions}
        inputRef={inputRef}
        isSubmitDisabled={isSubmitDisabled}
        costCenters={costCenters}
      />
    </>
  );
};

export default UserAdd;
