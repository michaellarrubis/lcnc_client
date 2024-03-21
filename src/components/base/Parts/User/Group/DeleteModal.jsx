import { useDeleteModal } from '@baseHooks/Components/Parts/User/Group/useDeleteModal';
import DeleteModalUI from '@baseComponents/Common/DeleteModalUI';
import PropTypes from 'prop-types';

const DeleteModal = ({
  handleDeleteModal,
  id,
  setFlag,
  name,
  modal,
  joinGroup
}) => {
  const { groupName, handleDelete } = useDeleteModal({
    handleDeleteModal,
    id,
    setFlag,
    modal,
    joinGroup
  });

  return (
    <DeleteModalUI
      label={name || groupName}
      submit={() => handleDelete(id)}
      cancel={() => handleDeleteModal(modal)}
    />
  );
};

DeleteModal.propTypes = {
  handleDeleteModal: PropTypes.func,
  id: PropTypes.number,
  joinGroup: PropTypes.instanceOf(Object),
  setFlag: PropTypes.func,
  name: PropTypes.string,
  modal: PropTypes.string
};

export default DeleteModal;
