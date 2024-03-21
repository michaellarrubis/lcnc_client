/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import { ModalCenter } from '@baseComponents/Common';
import EntryForm from '@baseComponents/Common/CostCenter/EntryForm';
import ModalDelete from '@baseComponents/Common/CostCenter/ModalDelete';

import { useUserAccess } from '@baseHooks/useUserAccess';
import { useAddEditModal } from '@baseHooks/Components/Parts/Cost-Center/Section/useAddEditModal';
import { useDeleteModal } from '@baseHooks/Components/Parts/Cost-Center/Section/useDeleteModal';

const AddEditModal = ({ handleModal, uniqueCode, dataList, menuCode }) => {
  const {
    formData,
    initialDummyData,
    handleChange,
    handleSubmit,
    handleTrimSpaces,
    validationSchema,
    showDeleteModal,
    renderCostCenterInfo,
    handleDeleteModal,
    sectionValidation,
    userOptions,
    onChangeSelectHandler
  } = useAddEditModal({ handleModal, uniqueCode, dataList });
  const { sectionDetail, handleDelete } = useDeleteModal({
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
        initialDummyData={initialDummyData}
        validationSchema={validationSchema}
        formValidation={sectionValidation}
        renderCostCenterInfo={renderCostCenterInfo}
        handleDeleteModal={handleDeleteModal}
        onChangeSelectHandler={onChangeSelectHandler}
        userOptions={userOptions}
        code="section_code"
        formFor="Section"
      />
      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <ModalDelete
            handleDeleteModal={handleDeleteModal}
            handleDelete={handleDelete}
            detail={sectionDetail}
            code={uniqueCode}
            name={uniqueCode}
            formFor="Section"
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
