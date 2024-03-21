import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getSubSectionService,
  getSubSectionList
} from 'src/api/modules/base/subsections';

import {
  getAllSubSection,
  getSubSections
} from '@baseStores/subsections/subsectionsActions';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import PropTypes from 'prop-types';

const useDeleteModal = ({ handleDeleteModal, editModal, code, modal }) => {
  const dispatch = useDispatch();
  const [subSectionDetail, setSubSectionDetail] = useState(null);

  const fetchNewUserList = async () => {
    getSubSectionList(1)
      .then(() => {
        dispatch(getSubSections());
        dispatch(getAllSubSection());
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    if (code) {
      getSubSectionService(code, 'GET').then(res => {
        const codeDetail = `Sub Section Code: ${res.data.code}`;
        setSubSectionDetail(codeDetail);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async codeId => {
    if (codeId) {
      const res = await getSubSectionService(codeId, 'DELETE');
      if (res.success) {
        toast.success('Successfully Deleted!', { icon: <CgCheckO /> });
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
    subSectionDetail,
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
