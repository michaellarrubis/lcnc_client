import { useDeleteModal } from '@baseHooks/Components/Parts/User/useDeleteModal';
import DeleteModalUI from '@baseComponents/Common/DeleteModalUI';
import PropTypes from 'prop-types';

const DeleteModal = ({ handleDeleteModal, id, name, modal }) => {
  const { userName, handleDelete } = useDeleteModal({
    handleDeleteModal,
    id,
    modal
  });

  return (
    <DeleteModalUI
      label={name || userName}
      submit={() => handleDelete(id)}
      cancel={() => handleDeleteModal(modal)}
    />
  );
};

DeleteModal.propTypes = {
  handleDeleteModal: PropTypes.func,
  id: PropTypes.number,
  name: PropTypes.string,
  modal: PropTypes.string
};

export default DeleteModal;
