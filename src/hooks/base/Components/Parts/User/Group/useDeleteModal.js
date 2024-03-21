import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getUserGroupByIdService,
  deleteUserGroupService,
  getUserGroupsService
} from 'src/api/modules/base/userGroups';
import { setUserGroups } from '@baseStores/userGroups/userGroupActions';

const useDeleteModal = ({ handleDeleteModal, id, modal, joinGroup }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(null);

  const fetchNewGroupList = async () => {
    getUserGroupsService(1)
      .then(res => {
        dispatch(setUserGroups(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    if (id) {
      getUserGroupByIdService(id).then(res => {
        setGroupName(res.data.name);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = userId => {
    if (joinGroup[id]) {
      toast.error('Unable to delete!', {
        icon: <CgCloseO />,
        toastId: id
      });
      handleDeleteModal(modal);
    } else if (userId) {
      deleteUserGroupService(userId).then(() => {
        toast.success('Successfully Deleted!', {
          icon: <CgCheckO />,
          toastId: id
        });
        fetchNewGroupList();
        handleDeleteModal(modal);
      });
    }
  };

  return {
    groupName,
    handleDelete
  };
};

useDeleteModal.propTypes = {
  handleDeleteModal: PropTypes.func,
  id: PropTypes.string,
  modal: PropTypes.string,
  joinGroup: PropTypes.object
};

export { useDeleteModal };
