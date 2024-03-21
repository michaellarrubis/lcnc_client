import React from 'react';
import PageTitle from '@baseComponents/Common/PageTitle';
import Filter from '@baseComponents/Common/Filter/Filter';
import Datatable from '@baseComponents/Common/Datatable';
import SlideModal from '@baseComponents/Common/SlideModal';
import AddModal from '@baseComponents/Parts/User/AddModal';
import ViewEditModal from '@baseComponents/Parts/User/ViewEditModal';
import ModalCenter from '@baseComponents/Common/ModalCenter';
import DeleteModal from '@baseComponents/Parts/User/DeleteModal';
import BulkDeleteModal from '@baseComponents/Parts/User/BulkDeleteModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import useUsersIndex from '@baseHooks/Pages/admin/users/useUsersIndex';
import Breadcrumbs from '@baseComponents/Common/Breadcrumbs';
import PropTypes from 'prop-types';
import { USER_COLUMNS } from '@baseUtils/constants';
import { useUserAccess } from '@baseHooks/useUserAccess';
import { USER_BULK_DELETE } from 'src/api/endpoints';
import 'src/assets/base/css/user.scss';

const UsersIndex = ({ menuCode }) => {
  const {
    userListMemo,
    dataList,
    showModal,
    showViewModal,
    showDeleteModal,
    showBulkDeleteModal,
    userId,
    userName,
    hasMore,
    inputs,
    form,
    isOpen,
    submitFilter,
    handleModal,
    handleViewModal,
    handleDeleteModal,
    handleBulkDeleteModal,
    fetchData
  } = useUsersIndex();
  const { access } = useUserAccess(menuCode);

  return (
    <div className="user__container">
      <Breadcrumbs crumbs={[{ name: 'User List' }]} />

      <div className="mt-5">
        <div className="filter__content--search overflow-visible">
          <Filter
            searchInputPlaceholder="User Name, Email"
            buttonName="New User"
            inputs={inputs}
            buttonLink={false}
            deleteModal="DeleteModal"
            modalName="AddEdit"
            buttonOnClick={() => handleModal('AddEdit')}
            bulkDeleteClick={() => handleBulkDeleteModal('BulkDeleteModal')}
            form={form}
            submitFilter={submitFilter}
            menuCode={menuCode}
            isOpen={isOpen}
          />
          <InfiniteScroll
            dataLength={userListMemo?.length ?? 0}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4 className="text-center mt-5 mb-[35px]">Loading...</h4>}
            style={{ overflow: 'visible' }}
            endMessage={
              <p className="text-center mt-5">
                {!userListMemo.length && (
                  <span className="text-gray-50">No records found.</span>
                )}
              </p>
            }
          >
            <Datatable
              shouldDisplayEditable={false}
              datasource={userListMemo || []}
              clickableRows={false}
              headingColumns={USER_COLUMNS}
              title="User List"
              actions={['view', 'delete']}
              showModal={showModal}
              showViewModal={showViewModal}
              handleModal={handleModal}
              handleViewModal={handleViewModal}
              handleDeleteModal={handleDeleteModal}
              modalName="View"
              deleteModal="DeleteModal"
              noPadding
              access={access}
              onExport={false}
              isExport={false}
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
          <AddModal
            handleModal={handleModal}
            userId={userId}
            dataList={dataList}
          />
        )}
      </SlideModal>
      <SlideModal
        showModal={showViewModal}
        modalName="View"
        handleModal={handleViewModal}
      >
        {showViewModal && (
          <ViewEditModal
            handleModal={handleViewModal}
            userId={userId}
            dataList={dataList}
            menuCode={menuCode}
          />
        )}
      </SlideModal>
      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <DeleteModal
            handleDeleteModal={handleDeleteModal}
            id={userId}
            name={userName}
            modal={showDeleteModal}
          />
        )}
      </ModalCenter>
      <ModalCenter showModal={showBulkDeleteModal} modalName="BulkDeleteModal">
        {showBulkDeleteModal && (
          <BulkDeleteModal
            handleBulkDeleteModal={handleBulkDeleteModal}
            endpoint={USER_BULK_DELETE}
          />
        )}
      </ModalCenter>
    </div>
  );
};

UsersIndex.propTypes = {
  menuCode: PropTypes.string
};

export default UsersIndex;
