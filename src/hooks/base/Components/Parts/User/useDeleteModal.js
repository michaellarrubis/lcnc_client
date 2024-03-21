import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getUserByIDService,
  deleteUserService,
  getAllUsersService
} from 'src/api/modules/base/user';
import { getAllUsers } from '@baseStores/users/userActions';
import { CgCheckO, CgCloseO } from 'react-icons/cg';

const useDeleteModal = ({ handleDeleteModal, id, modal }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);

  const fetchNewUserList = async () => {
    getAllUsersService(1)
      .then(res => {
        dispatch(getAllUsers(res.data.items));
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    if (id) {
      getUserByIDService(id).then(res => {
        const user = `${res.data.first_name} ${res.data.last_name} ${
          res.data.suffix ?? ''
        }`;
        setUserName(user.trimEnd());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = userId => {
    if (userId) {
      deleteUserService(userId)
        .then(res => {
          if (res.statusCode === 200) {
            fetchNewUserList();
            handleDeleteModal(modal);
            toast.success('Successfully Deleted!', {
              icon: <CgCheckO />,
              toastId: id
            });
          } else {
            toast.error('Unauthorized Deletion of Data.', {
              icon: <CgCloseO />,
              toastId: id
            });
          }
        })
        .catch(error => {
          return error;
        });
    }
  };
  return {
    userName,
    handleDelete
  };
};

useDeleteModal.propTypes = {
  handleDeleteModal: PropTypes.func,
  id: PropTypes.string,
  modal: PropTypes.string
};

export { useDeleteModal };
