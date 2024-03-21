import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import useDepartment from '@baseHooks/Pages/CostCenter/Department/useDepartment';
import { useDeleteModal } from '@baseHooks/Components/Parts/Cost-Center/Department/useDeleteModal';
import { useUserAccess } from '@baseHooks/useUserAccess';

import { BULK_DELETE_DEPARTMENTS } from 'src/api/endpoints';
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
    departmentList,
    departmentListMemo,
    hasMore,
    form,
    departmentColumns,
    showModal,
    showDeleteModal,
    uniqueCode,
    uniqueCodeName,
    handleModal,
    handleDeleteModal,
    fetchData,
    handleBulkDeleteModal,
    submitFilter,
    showBulkDeleteModal
  } = useDepartment();
  const { menus } = useUserAccess();
  const { departmentDetail, handleDelete } = useDeleteModal({
    handleDeleteModal,
    code: uniqueCode,
    modal: showDeleteModal
  });

  return (
    <div className="user__container">
      <Breadcrumbs
        crumbs={[
          { name: 'Cost Center', link: '/cost-center' },
          { name: 'Department' }
        ]}
      />

      <div className="mt-5">
        <div className="filter__content--search overflow-auto">
          <Filter
            searchInputPlaceholder="Code, Name, Head"
            buttonName="Department"
            buttonLink={false}
            buttonOnClick={() => handleModal('AddEdit')}
            bulkDeleteClick={() => handleBulkDeleteModal('BulkDeleteModal')}
            form={form}
            submitFilter={submitFilter}
            menuCode={menuCode}
          />
          <InfiniteScroll
            dataLength={departmentListMemo?.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4 className="text-center mt-5">Loading...</h4>}
            endMessage={
              <p className="text-center mt-5">
                {!departmentListMemo.length && (
                  <span className="text-gray-50">No records found.</span>
                )}
              </p>
            }
          >
            <Datatable
              shouldDisplayEditable={false}
              datasource={departmentListMemo || []}
              clickableRows={false}
              headingColumns={departmentColumns}
              title="Department"
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
              codeField="department_code"
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
            dataList={departmentList}
            menuCode={menuCode}
          />
        )}
      </SlideModal>
      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <ModalDelete
            handleDeleteModal={handleDeleteModal}
            handleDelete={handleDelete}
            detail={departmentDetail}
            code={uniqueCode}
            name={uniqueCodeName}
            formFor="Department"
            modal={showDeleteModal}
          />
        )}
      </ModalCenter>
      <ModalCenter showModal={showBulkDeleteModal} modalName="BulkDeleteModal">
        {showBulkDeleteModal && (
          <BulkDeleteModal
            handleBulkDeleteModal={handleBulkDeleteModal}
            endpoint={BULK_DELETE_DEPARTMENTS}
            apiService={deleteBulkCostCenter}
            codeType="department_code"
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
