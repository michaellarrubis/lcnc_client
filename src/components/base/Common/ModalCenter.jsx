import PropTypes from 'prop-types';

const ModalCenter = ({ children, showModal, modalName }) => {
  return (
    <>
      <div
        className={`fixed block w-full h-full top-0 right-0 z-[60] bg-[#000] opacity-80 ease-out duration-300 ${
          showModal === modalName ? 'show' : 'hidden'
        }`}
      />
      <div
        className={`fixed w-[445px] rounded-[8px] pb-12 left-[calc(50%)] -translate-x-1/2 -translate-y-1/2 top-1/2 bg-[#F8F9FA] shadow-[0_0_5px_rgba(0,0,0,0.1)] z-[61] ease-out duration-300 text-sm ${
          showModal === modalName ? 'show' : 'hidden'
        }`}
      >
        {children}
      </div>
    </>
  );
};

ModalCenter.propTypes = {
  children: PropTypes.element,
  showModal: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.string
  ]),
  modalName: PropTypes.string
};
export default ModalCenter;
