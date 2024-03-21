import ReactModal from 'react-modal';
import 'src/assets/base/css/modal.scss';
import PropTypes from 'prop-types';

const Modal = ({ modifier, children, isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      preventScroll
      overlayClassName="ReactModal__CustomOverlay"
      className={`ReactModal__CustomContent ${modifier}`}
    >
      <button
        type="button"
        className="ReactModal__CloseButton"
        onClick={onClose}
        tabIndex="-1"
      >
        &times;
      </button>
      {children}
    </ReactModal>
  );
};

Modal.propTypes = {
  modifier: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;
