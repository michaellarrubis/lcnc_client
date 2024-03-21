/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import { ModalCenter } from '@baseComponents/Common';
import EntryForm from '@baseComponents/Common/CostCenter/EntryForm';
import ModalDelete from '@baseComponents/Common/CostCenter/ModalDelete';

import { useUserAccess } from '@baseHooks/useUserAccess';
import { useAddEditModal } from 'src/hooks/base/Components/Parts/Cost-Center/SubSection/useAddEditModal';
import { useDeleteModal } from 'src/hooks/base/Components/Parts/Cost-Center/SubSection/useDeleteModal';

const AddEditModal = ({ handleModal, uniqueCode, dataList, menuCode }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleDeleteModal,
    handleTrimSpaces,
    validationSchema,
    initialDummyData,
    showDeleteModal,
    renderCostCenterInfo,
    subSectionValidation,
    userOptions,
    onChangeSelectHandler
  } = useAddEditModal({ handleModal, uniqueCode, dataList });
  const { subSectionDetail, handleDelete } = useDeleteModal({
    handleDeleteModal,
    editModal: handleModal,
    code: uniqueCode
  });
  const { access } = useUserAccess(menuCode);

  return (
    <>
      <EntryForm
        access={access}
        uniqueCode={uniqueCode}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleTrimSpaces={handleTrimSpaces}
        handleDeleteModal={handleDeleteModal}
        initialDummyData={initialDummyData}
        validationSchema={validationSchema}
        formValidation={subSectionValidation}
        renderCostCenterInfo={renderCostCenterInfo}
        onChangeSelectHandler={onChangeSelectHandler}
        userOptions={userOptions}
        code="sub_section_code"
        formFor="Sub Section"
      />
      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <ModalDelete
            handleDeleteModal={handleDeleteModal}
            handleDelete={handleDelete}
            detail={subSectionDetail}
            code={uniqueCode}
            name={uniqueCode}
            formFor="Department"
          />
        )}
      </ModalCenter>
    </>
  );
};

AddEditModal.propTypes = {
  handleModal: PropTypes.func,
  uniqueCode: PropTypes.string,
  dataList: PropTypes.array,
  menuCode: PropTypes.string
};

export default AddEditModal;
