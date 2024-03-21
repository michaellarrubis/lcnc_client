import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getDepartmentByIDService,
  getDepartmentsServiceByPage
} from 'src/api/modules/base/departments';
import { getDepartments } from '@baseStores/departments/departmentsActions';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import PropTypes from 'prop-types';

const useDeleteModal = ({ handleDeleteModal, editModal, code, modal }) => {
  const dispatch = useDispatch();
  const [departmentDetail, setDepartmentDetail] = useState(null);

  const fetchNewUserList = async () => {
    getDepartmentsServiceByPage(1)
      .then(res => {
        dispatch(getDepartments(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    if (code) {
      getDepartmentByIDService(code, 'GET').then(res => {
        const codeDetail = `Department Code: ${res.data.department_code}`;
        setDepartmentDetail(codeDetail);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async codeId => {
    if (codeId) {
      const res = await getDepartmentByIDService(codeId, 'DELETE');
      if (res.success) {
        toast.success('Successfully Deleted!', { icon: <CgCheckO /> });
        fetchNewUserList();
      } else if (res.response.status === 405)
        toast.error('Unable to delete!', { icon: <CgCloseO /> });
      handleDeleteModal(modal);
      if (editModal) {
        editModal(null);
      }
    }
  };
  return {
    departmentDetail,
    handleDelete
  };
};

useDeleteModal.propTypes = {
  handleDeleteModal: PropTypes.func,
  editModal: PropTypes.func,
  code: PropTypes.string,
  modal: PropTypes.string
};

export { useDeleteModal };
