import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getCostCenterByIDService,
  deleteCostCenterService,
  getCostCenterDataItems
} from 'src/api/modules/base/costCenter';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import PropTypes from 'prop-types';
import { getAllCostCenterService } from '@baseStores/costcenter/costcenterActions';

const useDeleteModal = ({ handleDeleteModal, editModal, code, modal }) => {
  const dispatch = useDispatch();
  const [costCenterDetail, setCostCenterDetail] = useState(null);

  const fetchNewUserList = async () => {
    getCostCenterDataItems(1)
      .then(() => {
        dispatch(getAllCostCenterService());
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    if (code) {
      getCostCenterByIDService(code).then(res => {
        const codeDetail = `Cost Center: ${res.data.cost_center_code}`;
        setCostCenterDetail(codeDetail);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = codeId => {
    if (codeId) {
      deleteCostCenterService(codeId).then(res => {
        if (res.success) {
          toast.success('Successfully Deleted!', { icon: <CgCheckO /> });
          fetchNewUserList();
        } else {
          toast.error('Unable to delete!', { icon: <CgCloseO /> });
        }
        handleDeleteModal(modal);
        if (editModal) {
          editModal(null);
        }
      });
    }
  };
  return {
    costCenterDetail,
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
