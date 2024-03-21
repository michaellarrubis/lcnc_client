import PropTypes from 'prop-types';
import DeleteModalUI from '@baseComponents/Common/DeleteModalUI';

const DeleteModal = ({
  handleDeleteModal,
  handleDelete,
  detail,
  code,
  name,
  modal,
  formFor
}) => {
  return (
    <DeleteModalUI
      label={name ? `${formFor} Code: ${name}` : detail}
      submit={() => handleDelete(code)}
      cancel={() => handleDeleteModal(modal ?? code)}
    />
  );
};

DeleteModal.propTypes = {
  handleDeleteModal: PropTypes.func,
  handleDelete: PropTypes.func,
  detail: PropTypes.string,
  code: PropTypes.string,
  name: PropTypes.string,
  formFor: PropTypes.string,
  modal: PropTypes.string
};

export default DeleteModal;
