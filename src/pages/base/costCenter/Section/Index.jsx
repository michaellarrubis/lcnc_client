import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import useSection from '@baseHooks/Pages/CostCenter/Section/useSection';
import { useDeleteModal } from '@baseHooks/Components/Parts/Cost-Center/Section/useDeleteModal';
import { useUserAccess } from '@baseHooks/useUserAccess';

import { BULK_DELETE_SECTIONS } from 'src/api/endpoints';
import { deleteBulkCostCenter } from 'src/api/modules/base/costCenter';

import {
  SlideModal,
  ModalCenter,
  PageTitle,
  Breadcrumbs
} from '@baseComponents/Common';
import Filter from '@baseComponents/Common/Filter/Filter';
import Datatable from '@baseComponents/Common/Datatable';
import ModalDelete from '@baseComponents/Common/CostCenter/ModalDelete';

import BulkDeleteModal from '../BulkDeleteModal';
import AddEditModal from './AddEditModal';

const Index = ({ menuCode }) => {
  const {
    sectionListMemo,
    hasMore,
    form,
    sectionColumns,
    showModal,
    showDeleteModal,
    uniqueCode,
    uniqueCodeName,
    showBulkDeleteModal,
    handleModal,
    handleDeleteModal,
    fetchData,
    handleBulkDeleteModal,
    submitFilter
  } = useSection();
  const { sectionDetail, handleDelete } = useDeleteModal({
    handleDeleteModal,
    code: uniqueCode,
    modal: showDeleteModal
  });
  const { menus } = useUserAccess();

  return (
    <div className="user__container">
      <Breadcrumbs
        crumbs={[
          { name: 'Cost Center', link: '/cost-center' },
          { name: 'Section' }
        ]}
      />

      <div className="mt-5">
        <div className="filter__content--search overflow-auto">
          <Filter
            searchInputPlaceholder="Code, Name, Head"
            buttonName="Section"
            buttonLink={false}
            buttonOnClick={() => handleModal('AddEdit')}
            bulkDeleteClick={() => handleBulkDeleteModal('BulkDeleteModal')}
            form={form}
            submitFilter={submitFilter}
            menuCode={menuCode}
          />
          <InfiniteScroll
            dataLength={sectionListMemo?.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4 className="text-center mt-5">Loading...</h4>}
            endMessage={
              <p className="text-center mt-5">
                {!sectionListMemo.length && (
                  <span className="text-gray-50">No records found.</span>
                )}
              </p>
            }
          >
            <Datatable
              shouldDisplayEditable={false}
              datasource={sectionListMemo || []}
              clickableRows={false}
              headingColumns={sectionColumns}
              title="Section"
              actions={['edit', 'delete']}
              showModal={showModal}
              handleModal={handleModal}
              handleDeleteModal={handleDeleteModal}
              modalName="AddEdit"
              deleteModal="DeleteModal"
              shouldEllipsis
              access={menus[menuCode]?.user_group_access}
              onExport={false}
              isExport={false}
              isCostCenter
              codeField="section_code"
            />
          </InfiniteScroll>
        </div>
      </div>
      <SlideModal
        showModal={showModal}
        modalName="AddEdit"
        handleModal={handleModal}
      >
        {showModal && (
          <AddEditModal
            handleModal={handleModal}
            uniqueCode={uniqueCode}
            dataList={sectionListMemo}
            menuCode={menuCode}
          />
        )}
      </SlideModal>
      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <ModalDelete
            handleDeleteModal={handleDeleteModal}
            handleDelete={handleDelete}
            detail={sectionDetail}
            code={uniqueCode}
            name={uniqueCodeName}
            modal={showDeleteModal}
            formFor="Section"
          />
        )}
      </ModalCenter>
      <ModalCenter showModal={showBulkDeleteModal} modalName="BulkDeleteModal">
        {showBulkDeleteModal && (
          <BulkDeleteModal
            handleBulkDeleteModal={handleBulkDeleteModal}
            endpoint={BULK_DELETE_SECTIONS}
            apiService={deleteBulkCostCenter}
            codeType="section_code"
          />
        )}
      </ModalCenter>
    </div>
  );
};

Index.propTypes = {
  menuCode: PropTypes.string
};

export default Index;
