import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import CreateEmployeeModal from '../ModalWindowsComponents/CreateEmployeeModal.js';
import UpdateEmployeeModal from '../ModalWindowsComponents/UpdateEmployeeModal.js';

class EmployeeList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData.employees;
    if (data !== '') {
      var elements = [];
      var element;
      var profileImg = '';
      for (let i = 0; i < data.length; i++) {
        if (data[i].mediaFiles.length > 0) {
          // eslint-disable-next-line no-loop-func
          data[i].mediaFiles.forEach((file) => {
            if (file.isProfilePhoto)
              profileImg = `data:image/gif;base64,${file.fileData}`;
          });
        }
        element = [];
        element = (
          <dir
            className="profileCardBody"
            key={data[i].employeeId}
            id={data[i].employeeId}
            onClick={() => {
              if (this.props.isEditing) {
                this.props.onEdit();
              }
              this.props.setActiveId(data[i].employeeId);
              this.props.getEmployee(data[i].employeeId, this.props.activeMenu);
              this.props.setUpdateModalState();
              this.props.getProfilePhotoByEmployeeId(data[i].employeeId);
            }}
          >
            <div className="profileCardInfo">
              <p>{data[i].fullName}</p>
              <div className="profilePhoto">
                <img src={profileImg} alt="" />
              </div>
            </div>
          </dir>
        );
        elements.push(element);
      }
    }

    if (data !== '') {
      return (
        <>
          <dir style={{ display: 'flex' }}>
            <p className="title" style={{ paddingRight: '30px' }}>
              Employees
            </p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setCreateModalState();
              }}
            >
              New employee
            </button>
          </dir>

          <dir className="employeePage">
            {elements}
            <CreateEmployeeModal />
            <UpdateEmployeeModal />
          </dir>
        </>
      );
    } else {
      return (
        <>
          <p>There is no Data in DB...</p>
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    isEditing: state.isEditing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEdit: () => dispatch(actions.SetEditModalState()),
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    getEmployee: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
    getProfilePhotoByEmployeeId: (id) =>
      dispatch(actions.GetProfilePhotoByEmployeeId(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
