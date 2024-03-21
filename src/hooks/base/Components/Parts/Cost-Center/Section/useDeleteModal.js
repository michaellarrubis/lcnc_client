import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getSections } from '@baseStores/sections/sectionsActions';
import {
  getSectionsService,
  getSectionByIDService
} from 'src/api/modules/base/sections';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import PropTypes from 'prop-types';

const useDeleteModal = ({ handleDeleteModal, editModal, code, modal }) => {
  const dispatch = useDispatch();
  const [sectionDetail, setDivisionDetail] = useState(null);

  const fetchNewUserList = async () => {
    getSectionsService(1)
      .then(res => {
        dispatch(getSections(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    if (code) {
      getSectionByIDService(code, 'GET').then(res => {
        const codeDetail = `Section Code: ${res.data.code}`;
        setDivisionDetail(codeDetail);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async codeId => {
    if (codeId) {
      const res = await getSectionByIDService(codeId, 'DELETE');
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
    sectionDetail,
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
