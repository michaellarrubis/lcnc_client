import PropTypes from 'prop-types';

const SlideModal = ({
  children,
  showModal,
  modalName,
  handleModal,
  modalSize
}) => {
  let modalWidth = '';
  let modalHidePosition = '';
  switch (modalSize) {
    case 'small':
      modalWidth = 'w-[459px]';
      modalHidePosition = 'right-[-519px]';
      break;
    case 'large':
      modalWidth = 'w-[790px]';
      modalHidePosition = 'right-[-850px]';
      break;
    case 'wide':
      modalWidth = 'w-[858px]';
      modalHidePosition = 'right-[-918px]';
      break;
    default:
      modalWidth = 'w-[860px]';
      modalHidePosition = 'right-[-920px]';
  }
  return (
    <>
      <div
        className={`fixed block w-full h-full top-0 right-0 bg-white opacity-60 ease-out duration-300 ${
          showModal === modalName ? 'show' : 'hidden'
        }`}
      />
      <div
        className={`fixed top-[17px] ${modalWidth} h-[calc(100%-30px)] rounded-[16px_0px_0px_16px] bg-[#F8F9FA] shadow-[0_0_5px_rgba(0,0,0,0.1)] p-[36px_0_40px]  z-[1000] ease-out duration-300 ${
          showModal === modalName ? 'right-0' : modalHidePosition
        }`}
      >
        <button
          type="button"
          onClick={() => handleModal(null)}
          className="block h-10 w-10 rounded-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.1)] absolute top-0 left-[-60px] hover:opacity-50"
        >
          <span className="block w-[15px] h-[3px] bg-[#232932] absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] rotate-45 rounded" />
          <span className="block w-[15px] h-[3px] bg-[#232932] absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] rotate-[-45deg] rounded" />
        </button>
        {children}
      </div>
    </>
  );
};

SlideModal.propTypes = {
  children: PropTypes.node,
  showModal: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.string
  ]),
  modalName: PropTypes.string,
  handleModal: PropTypes.func
};

export default SlideModal;
