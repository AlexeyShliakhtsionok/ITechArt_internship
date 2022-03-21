import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/actions';

class ProfileMenu extends React.PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    var singleData = this.props.singleResponseData;
    var hireDate = String(singleData.hireDate);
    var firstName = singleData.firstName;
    var lastName = singleData.lastName;
    var phone = singleData.phoneNumber;
    var email = singleData.email;
    var qualification = singleData.qualification;
    var procedureType = singleData.procedureType;
    var role = singleData.role;

    var employeeInfoArea;
    var actionButtons;
    var employeeToUpdate = {
      employeeId: singleData.employeeId,
      firstName: singleData.firstName,
      lastName: singleData.lastName,
      phoneNumber: singleData.phoneNumber,
      password: singleData.password,
      email: singleData.email,
      procedureType: singleData.procedureType,
      qualification: singleData.qualification,
      role: singleData.role,
      hireDate: singleData.hireDate,
    };

    if (!this.props.isEditing) {
      actionButtons = (
        <div className="editUserInfo">
          <button className="modalButton" onClick={this.props.onEdit}>
            Edit profile
          </button>
        </div>
      );

      employeeInfoArea = (
        <>
          <div className="profileText">
            <div className="profileTextItem">
              <p>First name: {firstName}</p>
            </div>

            <div className="profileTextItem">
              <p>Last name: {lastName}</p>
            </div>

            <div className="profileTextItem">
              <p>Hired: {hireDate.substr(0, 10)}</p>
            </div>

            <div className="profileTextItem">
              <p>Phone: {phone}</p>
            </div>

            <div className="profileTextItem">
              <p>Email: {email}</p>
            </div>

            <div className="profileTextItem">
              <p>ProcedureType: {procedureType}</p>
            </div>

            <div className="profileTextItem">
              <p>Qualification: {qualification}</p>
            </div>

            <div className="profileTextItem">
              <p>Role: {role}</p>
            </div>
            {actionButtons}
          </div>
        </>
      );
    } else {
      actionButtons = (
        <div className="confirmUserInfo">
          <div>
            <form onSubmit={this.onSubmit} id="submForm">
              <input
                className="profilePhotoInput"
                id="profilePhoto"
                name="profilePhoto"
                type="file"
              />
              <button
                className="modalButton"
                type="submit"
                onClick={() => {
                  this.props.onEdit();
                  this.props.onUpdate(this.props.activeMenu, employeeToUpdate);
                  const formData = new FormData();
                  var profilePhoto = document.getElementById('profilePhoto');
                  formData.append('profilePhoto', profilePhoto.files[0]);
                  this.props.uploadPhoto(singleData.employeeId, formData);
                  this.props.getEmployee(singleData.employeeId, 'staffPage');
                }}
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      );

      employeeInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>First name:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                placeholder={firstName}
                onChange={(e) => {
                  employeeToUpdate.firstName = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Last name:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                placeholder={lastName}
                onChange={(e) => {
                  employeeToUpdate.lastName = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Phone:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="tel"
                placeholder={phone}
                onChange={(e) => {
                  employeeToUpdate.phoneNumber = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Email:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="email"
                placeholder={email}
                onChange={(e) => {
                  employeeToUpdate.email = e.target.value;
                }}
              />
            </div>
          </div>
          {actionButtons}
        </div>
      );
    }

    if (singleData !== '') {
      return (
        <>
          <div className="profileBody">
            <div className="profilePhoto">
              <img src={this.props.employeeProfilePhoto} alt="profile" />
            </div>
            {employeeInfoArea}
          </div>
        </>
      );
    } else {
      return (
        <>
          <p>Something went wrong...</p>
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    singleResponseData: state.singleResponseData,
    isEditing: state.isEditing,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    employeeProfilePhoto: state.employeeProfilePhoto,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEdit: () => dispatch(actions.SetEditModalState()),
    onUpdate: (activeMenu, data) =>
      dispatch(actions.UpdateData(activeMenu, data)),
    uploadPhoto: (id, profilePhoto) =>
      dispatch(actions.UploadProfilePhoto(id, profilePhoto)),
    getEmployee: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
