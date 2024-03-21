import PropTypes from 'prop-types';
import DeleteModalUI from '@baseComponents/Common/DeleteModalUI';
import { useBulkDeleteModal } from '@baseHooks/Components/Parts/Cost-Center/useBulkDeleteModal';

const BulkDeleteModal = ({
  handleBulkDeleteModal,
  apiService,
  endpoint,
  codeType
}) => {
  const { handleDelete, ids } = useBulkDeleteModal({
    handleBulkDeleteModal,
    endpoint,
    apiService,
    codeType
  });

  return (
    <DeleteModalUI
      label={`the selected ${ids.length} ${ids.length > 1 ? 'items' : 'item'}`}
      submit={() => handleDelete()}
      cancel={() => handleBulkDeleteModal(null)}
    />
  );
};
BulkDeleteModal.propTypes = {
  handleBulkDeleteModal: PropTypes.func,
  endpoint: PropTypes.string,
  codeType: PropTypes.string,
  apiService: PropTypes.func
};
export default BulkDeleteModal;
