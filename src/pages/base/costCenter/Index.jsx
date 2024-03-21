import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import useCostCenterIndex from '@baseHooks/Pages/CostCenter/useCostCenterIndex';
import { useUserAccess } from '@baseHooks/useUserAccess';
import { useDeleteModal } from '@baseHooks/Components/Parts/Cost-Center/useDeleteModal';

import { BULK_DELETE_COST_CENTER } from 'src/api/endpoints';
import { deleteBulkCostCenter } from 'src/api/modules/base/costCenter';

import {
  PageTitle,
  SlideModal,
  ModalCenter,
  Breadcrumbs
} from '@baseComponents/Common';
import Filter from '@baseComponents/Common/Filter/Filter';
import Datatable from '@baseComponents/Common/Datatable';
import ModalDelete from '@baseComponents/Common/CostCenter/ModalDelete';

import BulkDeleteModal from './BulkDeleteModal';
import AddEditModal from './AddEditModal';

const Index = ({ menuCode }) => {
  const {
    costCenterListMemo,
    hasMore,
    costCenterColumns,
    showModal,
    showDeleteModal,
    uniqueCode,
    uniqueCodeName,
    form,
    submitFilter,
    handleModal,
    handleDeleteModal,
    fetchData,
    handleBulkDeleteModal,
    showBulkDeleteModal
  } = useCostCenterIndex();
  const { menus } = useUserAccess();
  const { costCenterDetail, handleDelete } = useDeleteModal({
    handleDeleteModal,
    code: uniqueCode,
    modal: showDeleteModal
  });

  return (
    <div className="user__container">
      <Breadcrumbs crumbs={[{ name: 'Cost Center' }]} />

      <div className="mt-5">
        <div className="filter__content--search overflow-auto">
          <Filter
            searchInputPlaceholder="Cost Center Code, Remarks"
            buttonName="Cost Center"
            buttonLink={false}
            buttonOnClick={() => handleModal('AddEdit')}
            bulkDeleteClick={() => handleBulkDeleteModal('BulkDeleteModal')}
            form={form}
            submitFilter={submitFilter}
            menuCode={menuCode}
          />
          <InfiniteScroll
            dataLength={costCenterListMemo?.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4 className="text-center mt-5">Loading...</h4>}
            endMessage={
              <p className="text-center mt-5">
                {!costCenterListMemo.length && (
                  <span className="text-gray-50">No records found.</span>
                )}
              </p>
            }
          >
            <Datatable
              shouldDisplayEditable={false}
              datasource={costCenterListMemo || []}
              clickableRows={false}
              headingColumns={costCenterColumns}
              title="Cost Center"
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
              codeField="cost_center_code"
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
            dataList={costCenterListMemo}
            menuCode={menuCode}
          />
        )}
      </SlideModal>
      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <ModalDelete
            handleDeleteModal={handleDeleteModal}
            handleDelete={handleDelete}
            detail={costCenterDetail}
            code={uniqueCode}
            name={uniqueCodeName}
            formFor="Cost Center"
            modal={showDeleteModal}
          />
        )}
      </ModalCenter>
      <ModalCenter showModal={showBulkDeleteModal} modalName="BulkDeleteModal">
        {showBulkDeleteModal && (
          <BulkDeleteModal
            handleBulkDeleteModal={handleBulkDeleteModal}
            endpoint={BULK_DELETE_COST_CENTER}
            apiService={deleteBulkCostCenter}
            codeType="cost_center_code"
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
