import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import { toast } from 'react-toastify';
import {
  deleteBulkUserService,
  getAllUsersService
} from 'src/api/modules/base/user';
import { getUserGroupsService } from 'src/api/modules/base/userGroups';
import { setUserGroups } from '@baseStores/userGroups/userGroupActions';
import { getAllUsers } from '@baseStores/users/userActions';
import { setIdSelection } from '@baseStores/datatable/datatableActions';

const useBulkDeleteModal = ({ handleBulkDeleteModal, endpoint }) => {
  const dispatch = useDispatch();
  const { ids } = useSelector(state => state.datatable);

  const fetchNewUserList = async () => {
    getAllUsersService(1)
      .then(res => {
        dispatch(getAllUsers(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  const fetchNewGroupList = async () => {
    getUserGroupsService(1)
      .then(res => {
        dispatch(setUserGroups(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  const handleDelete = async () => {
    if (ids) {
      const res = await deleteBulkUserService(ids, endpoint);
      if (res.statusCode === 200) {
        fetchNewUserList();
        fetchNewGroupList();
        dispatch(setIdSelection([]));
        toast.success('Successfully Deleted!', {
          icon: <CgCheckO />,
          toastId: Math.random()
        });
        handleBulkDeleteModal(null);
      } else
        toast.error('Unauthorized Deletion of Data.', {
          icon: <CgCloseO />
        });
    }
  };
  return {
    handleDelete
  };
};

useBulkDeleteModal.propTypes = {
  handleBulkDeleteModal: PropTypes.func,
  endpoint: PropTypes.string
};

export { useBulkDeleteModal };
