import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import Carousel from 'react-elastic-carousel';

class OurStaff extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData.employees;
    var singleData = this.props.singleResponseData;

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
              this.props.getEmployee(data[i].employeeId, 'staffPage');
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

    if (singleData !== '') {
      var galleryElements = [];
      var galleryElement;

      for (let i = 0; i < singleData.mediaFiles.length; i++) {
        galleryElement = '';
        galleryElement = (
          <div className="carousel">
            <img
              src={`data:image/gif;base64,${singleData.mediaFiles[i].fileData}`}
              alt=""
            />
          </div>
        );
        galleryElements = galleryElements.concat(galleryElement);
      }
    }

    if (data !== '') {
      if (singleData !== '') {
        return (
          <>
            <p className="title">Employees</p>
            <div className="employeePage">
              <Carousel itemsToShow={3}>{elements}</Carousel>
            </div>
            <Carousel>{galleryElements}</Carousel>
          </>
        );
      } else {
        return (
          <>
            <p className="title">Employees</p>
            <dir className="employeePage">
              <Carousel itemsToShow={3}>{elements}</Carousel>
            </dir>
          </>
        );
      }
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
    singleResponseData: state.singleResponseData,
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

export default connect(mapStateToProps, mapDispatchToProps)(OurStaff);
