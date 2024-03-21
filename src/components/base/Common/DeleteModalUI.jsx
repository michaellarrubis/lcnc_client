import PropTypes from 'prop-types';

const DeleteModalUI = ({ label, submit, cancel }) => {
  return (
    <>
      <div className="font-stolzlBold text-[14px] p-[14px] border-b-[1px] border-[#DEDEDE] relative">
        Delete
        <button
          className="w-[12px] h-[12px] absolute right-[15px] top-1/2 transform -translate-y-1/2 after:content-[''] after:w-full after:h-[2px] after:left-0 before:left-0 after:bg-[#999999] after:absolute after:rotate-45 after:rounded before:rounded before:content-[''] before:w-full before:h-[2px] before:bg-[#999999] before:absolute before:-rotate-45"
          type="button"
          onClick={cancel}
        />
      </div>
      <div className="text-center font-stolzlRegular text-[14px] mt-7">
        Are you sure you want to delete{!label && <span>?</span>}
      </div>
      {label && (
        <div className="text-center font-stolzlBold mt-2 capitalize">
          {label}?
        </div>
      )}
      <div className="flex justify-between w-[210px] mt-[30px] m-auto">
        <div className="">
          <button
            form="userGrpForm"
            type="submit"
            className="text-[12px] text-white leading-[100%] bg-formHead border-none rounded w-[100px] h-10"
            onClick={submit}
          >
            <span>Yes</span>
          </button>
        </div>
        <div className="">
          <button
            type="button"
            className="text-[12px] text-[#232932] font-normal leading-[100%] bg-gray-700 hover:bg-gray-600 border-none rounded w-[100px] h-10"
            onClick={cancel}
          >
            <span>No</span>
          </button>
        </div>
      </div>
    </>
  );
};

DeleteModalUI.propTypes = {
  label: PropTypes.string,
  submit: PropTypes.func,
  cancel: PropTypes.func
};

export default DeleteModalUI;
