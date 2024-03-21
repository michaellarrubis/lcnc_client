import PropTypes from 'prop-types';
import PageTitle from '@baseComponents/Common/PageTitle';
import SlideModal from '@baseComponents/Common/SlideModal';
import ModalCenter from '@baseComponents/Common/ModalCenter';
import AddEditModal from '@baseComponents/Parts/User/Group/AddEditModal';
import DeleteModal from '@baseComponents/Parts/User/Group/DeleteModal';
import BulkDeleteModal from '@baseComponents/Parts/User/BulkDeleteModal';
import Filter from '@baseComponents/Common/Filter/Filter';
import Datatable from '@baseComponents/Common/Datatable';
import InfiniteScroll from 'react-infinite-scroll-component';
import useUserGroup from '@baseHooks/Pages/admin/users/useUserGroup';
import Breadcrumbs from '@baseComponents/Common/Breadcrumbs';
import { useUserAccess } from '@baseHooks/useUserAccess';
import { USER_GROUPS_BULK_DELETE } from 'src/api/endpoints';

const UserGroup = ({ menuCode }) => {
  const {
    groupListMemo,
    showModal,
    showDeleteModal,
    showViewModal,
    showBulkDeleteModal,
    groupId,
    groupName,
    userColumns,
    inputs,
    hasMore,
    form,
    joinGroup,
    isOpen,
    submitFilter,
    handleModal,
    handleDeleteModal,
    handleViewModal,
    handleBulkDeleteModal,
    fetchGroupData
  } = useUserGroup();
  const { menus } = useUserAccess();

  return (
    <div className="user__container">
      <Breadcrumbs crumbs={[{ name: 'Group List' }]} />

      <div className="mt-5">
        <div className="filter__content--search overflow-auto">
          <Filter
            searchInputPlaceholder="Group, Members, Menu"
            buttonName="New Group"
            inputs={inputs}
            buttonLink={false}
            buttonOnClick={() => handleViewModal('View')}
            bulkDeleteClick={() => handleBulkDeleteModal('BulkDeleteModal')}
            form={form}
            submitFilter={submitFilter}
            menuCode={menuCode}
            isOpen={isOpen}
          />
          <InfiniteScroll
            dataLength={groupListMemo?.length ?? 0}
            next={fetchGroupData}
            hasMore={hasMore}
            loader={<h4 className="text-center mt-5 mb-[35px]">Loading...</h4>}
            style={{ overflow: 'visible' }}
            endMessage={
              <p className="text-center mt-5">
                {!groupListMemo.length && (
                  <span className="text-gray-50">No records found.</span>
                )}
              </p>
            }
          >
            <Datatable
              shouldDisplayEditable={false}
              datasource={groupListMemo || []}
              clickableRows={false}
              headingColumns={userColumns}
              actions={['view', 'delete']}
              showModal={showModal}
              showViewModal={showViewModal}
              handleModal={handleModal}
              handleViewModal={handleViewModal}
              handleDeleteModal={handleDeleteModal}
              modalName="View"
              deleteModal="DeleteModal"
              keyField="id"
              shouldEllipsis
              access={menus[menuCode]?.user_group_access}
              onExport={false}
              isExport={false}
              joinGroup={joinGroup}
            />
          </InfiniteScroll>
        </div>
      </div>

      <SlideModal
        showModal={showViewModal}
        modalName="View"
        handleModal={handleViewModal}
      >
        {showViewModal && (
          <AddEditModal
            handleModal={handleViewModal}
            id={groupId}
            menuCode={menuCode}
            joinGroup={joinGroup}
          />
        )}
      </SlideModal>

      <ModalCenter showModal={showDeleteModal} modalName="DeleteModal">
        {showDeleteModal && (
          <DeleteModal
            handleDeleteModal={handleDeleteModal}
            id={groupId}
            name={groupName}
            modal={showDeleteModal}
            joinGroup={joinGroup}
          />
        )}
      </ModalCenter>
      <ModalCenter showModal={showBulkDeleteModal} modalName="BulkDeleteModal">
        {showBulkDeleteModal && (
          <BulkDeleteModal
            handleBulkDeleteModal={handleBulkDeleteModal}
            endpoint={USER_GROUPS_BULK_DELETE}
            menuCode={menuCode}
          />
        )}
      </ModalCenter>
    </div>
  );
};

UserGroup.propTypes = {
  menuCode: PropTypes.string
};

export default UserGroup;
