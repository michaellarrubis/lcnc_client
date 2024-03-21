import PropTypes from 'prop-types';
import { useBulkDeleteModal } from '@baseHooks/Components/Parts/User/useBulkDeleteModal';
import DeleteModalUI from '@baseComponents/Common/DeleteModalUI';

const BulkDeleteModal = ({ handleBulkDeleteModal, endpoint }) => {
  const { handleDelete } = useBulkDeleteModal({
    handleBulkDeleteModal,
    endpoint
  });

  return (
    <DeleteModalUI
      label="the selected item"
      submit={() => handleDelete()}
      cancel={() => handleBulkDeleteModal(null)}
    />
  );
};
BulkDeleteModal.propTypes = {
  handleBulkDeleteModal: PropTypes.func,
  endpoint: PropTypes.string
};
export default BulkDeleteModal;
