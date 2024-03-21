import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CgCheckO } from 'react-icons/cg';
import { MdOutlineCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import { setIdSelection } from '@baseStores/datatable/datatableActions';
import { getCostCenterDataItems } from 'src/api/modules/base/costCenter';
import {
  getAllCostCenterItems,
  getAllCostCenterService
} from '@baseStores/costcenter/costcenterActions';
import { getDivisionItemsService } from 'src/api/modules/base/divisions';
import {
  getAllDivision,
  getDivisions
} from '@baseStores/divisions/divisionsActions';
import { getDepartmentsServiceByPage } from 'src/api/modules/base/departments';
import {
  getAllDepartment,
  getDepartments
} from '@baseStores/departments/departmentsActions';
import { getSectionsService } from 'src/api/modules/base/sections';
import {
  getAllSection,
  getSections
} from '@baseStores/sections/sectionsActions';
import { getSubSectionList } from 'src/api/modules/base/subsections';
import {
  getAllSubSection,
  getSubSections
} from '@baseStores/subsections/subsectionsActions';

const useBulkDeleteModal = ({
  handleBulkDeleteModal,
  apiService,
  endpoint,
  codeType
}) => {
  const dispatch = useDispatch();
  const { ids } = useSelector(state => state.datatable);

  const fetchNewCostCenterList = async () => {
    getCostCenterDataItems(1)
      .then(() => {
        dispatch(getAllCostCenterService());
        dispatch(getAllCostCenterItems());
      })
      .catch(err => {
        return err;
      });
  };

  const fetchUpdateDivision = async () => {
    getDivisionItemsService(1)
      .then(() => {
        dispatch(getDivisions());
        dispatch(getAllDivision());
      })
      .catch(err => {
        return err;
      });
  };

  const fetchUpdateDepartment = async () => {
    getDepartmentsServiceByPage(1)
      .then(() => {
        dispatch(getDepartments());
        dispatch(getAllDepartment());
      })
      .catch(err => {
        return err;
      });
  };

  const fetchupdateSection = async () => {
    getSectionsService(1)
      .then(() => {
        dispatch(getSections());
        dispatch(getAllSection());
      })
      .catch(err => {
        return err;
      });
  };

  const fetchUpdateSubSection = async () => {
    getSubSectionList(1)
      .then(() => {
        dispatch(getSubSections());
        dispatch(getAllSubSection());
      })
      .catch(err => {
        return err;
      });
  };

  const handleDelete = async () => {
    if (ids) {
      const res = await apiService(ids, endpoint);
      if (res.statusCode === 200) {
        toast.success('Successfully Deleted!', {
          icon: <CgCheckO />,
          toastId: Math.random()
        });
        dispatch(setIdSelection([]));
        if (codeType === 'cost_center_code') fetchNewCostCenterList();
        else if (codeType === 'division_code') fetchUpdateDivision();
        else if (codeType === 'department_code') fetchUpdateDepartment();
        else if (codeType === 'section_code') fetchupdateSection();
        else if (codeType === 'sub_section_code') fetchUpdateSubSection();
      }
      if (res.status === 405) {
        toast.error('Unable to delete!', {
          icon: <MdOutlineCancel />
        });
      }
      handleBulkDeleteModal(null);
    }
  };
  return {
    handleDelete,
    ids
  };
};

useBulkDeleteModal.propTypes = {
  handleBulkDeleteModal: PropTypes.func,
  apiService: PropTypes.func,
  endpoint: PropTypes.string,
  codeType: PropTypes.string
};

export { useBulkDeleteModal };
