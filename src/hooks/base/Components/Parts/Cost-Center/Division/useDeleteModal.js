import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getDivisionByIDService,
  getDivisionItemsService,
  deleteDivisionById
} from 'src/api/modules/base/divisions';
import { getDivisions } from '@baseStores/divisions/divisionsActions';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import PropTypes from 'prop-types';

const useDeleteModal = ({ handleDeleteModal, editModal, code, modal }) => {
  const dispatch = useDispatch();
  const [divisionDetail, setDivisionDetail] = useState(null);

  const fetchNewUserList = async () => {
    getDivisionItemsService(1)
      .then(res => {
        dispatch(getDivisions(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    if (code) {
      getDivisionByIDService(code).then(res => {
        const codeDetail = `Division Code: ${res.data.code}`;
        setDivisionDetail(codeDetail);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async codeId => {
    if (codeId) {
      const res = await deleteDivisionById(codeId, 'DELETE');
      if (res.success) {
        toast.success('Successfully Deleted!', {
          icon: <CgCheckO />,
          toastId: codeId
        });
        fetchNewUserList();
      } else if (res.response.status === 405)
        toast.error('Unable to delete!', {
          icon: <CgCloseO />,
          toastId: codeId
        });
      handleDeleteModal(modal);
      if (editModal) {
        editModal(null);
      }
    }
  };
  return {
    divisionDetail,
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
