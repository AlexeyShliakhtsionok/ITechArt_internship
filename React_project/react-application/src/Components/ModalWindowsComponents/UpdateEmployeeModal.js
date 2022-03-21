import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';

class UpdateEmployeeModal extends React.PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    var data = this.props.pagedTablesData;
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
      employeeId: this.props.activeId,
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

    var roles = [];
    data.roles.forEach((element) => {
      roles.push({ value: element.value, label: element.name });
    });

    var procedureTypes = [];
    data.procedureTypesSelectList.forEach((element) => {
      procedureTypes.push({ value: element.value, label: element.text });
    });

    var qualifications = [];
    data.qualification.forEach((element) => {
      qualifications.push({ value: element.value, label: element.name });
    });

    var elements = [];
    if (singleData !== '') {
      var element;
      var header = (
        <thead>
          <tr>
            <th>Date of service</th>
            <th>Client name</th>
            <th>Client phone number</th>
            <th>Client email</th>
            <th>Procedure name</th>
            <th>Procedure cost</th>
            <th>Employee</th>
          </tr>
        </thead>
      );

      for (let i = 0; i < singleData.orders.length; i++) {
        var date = singleData.orders[i].dateOfService.substr(0, 10);
        var time = singleData.orders[i].dateOfService.substr(11, 5);
        element = '';
        element = (
          <tr
            key={singleData.orders[i].orderId}
            id={singleData.orders[i].orderId}
          >
            <td>{date + ' ' + time}</td>
            <td>{singleData.orders[i].clientFullName}</td>
            <td>{singleData.orders[i].clientPhoneNumber}</td>
            <td>{singleData.orders[i].clientEmail}</td>
            <td>{singleData.orders[i].procedureName}</td>
            <td>{singleData.orders[i].procedureCost}</td>
            <td>{singleData.orders[i].employeeFullName}</td>
          </tr>
        );
        elements = elements.concat(element);
      }
    }
    if (!this.props.isEditing) {
      actionButtons = (
        <div className="editUserInfo">
          <button className="modalButton" onClick={this.props.onEdit}>
            Edit profile
          </button>
          <button
            className="modalButton"
            onClick={() => {
              this.props.onDelete(this.props.activeId, this.props.activeMenu);
              this.props.setUpdateModalState();
            }}
          >
            Delete profile
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
                  const formData = new FormData();
                  var profilePhoto = document.getElementById('profilePhoto');
                  formData.append('profilePhoto', profilePhoto.files[0]);
                  this.props.uploadPhoto(this.props.activeId, formData);
                  this.props.onEdit();
                  this.props.setUpdateModalState();
                }}
              >
                Save photo
              </button>
            </form>
          </div>
          <div>
            <button
              className="modalButton"
              onClick={() => {
                this.props.onEdit();
                this.props.setUpdateModalState();
                this.props.onUpdate(this.props.activeMenu, employeeToUpdate);
              }}
            >
              Save changes
            </button>
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
              <p>Hired:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="date"
                defaultValue={hireDate.substr(0, 10)}
                onChange={(e) => {
                  employeeToUpdate.hireDate = e.target.value;
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

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Role:</p>
            </div>
            <div className="profileTextItem-right">
              <Select
                onChange={(data) => {
                  employeeToUpdate.role = data.value;
                }}
                options={roles}
                placeholder={role}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>ProcedureType:</p>
            </div>
            <div className="profileTextItem-right">
              <Select
                options={procedureTypes}
                placeholder={procedureType}
                onChange={(data) => {
                  employeeToUpdate.procedureType = data.label;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Qualification:</p>
            </div>
            <div className="profileTextItem-right">
              <Select
                options={qualifications}
                placeholder={qualification}
                onChange={(data) => {
                  employeeToUpdate.qualification = data.value;
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (singleData !== '' && singleData.orders.length !== 0) {
      return (
        <Modal
          styles={{
            modal: {
              maxWidth: 'fit-content',
              background: '#6c3636',
              padding: '40px',
              fontFamily: 'Play',
              alignItems: 'center',
              textAlign: 'center',
              border: '6px solid #f7f6f6',
              borderRadius: '10px',
            },
          }}
          open={this.props.updateModalOpen}
          center={true}
          showCloseIcon={false}
          onOverlayClick={this.props.setUpdateModalState}
        >
          <>
            <div>
              <p className="title">Employee profile</p>
            </div>
            <div className="profileBody">
              <div className="profilePhoto">
                <img src={this.props.employeeProfilePhoto} alt="profile" />
              </div>
              {employeeInfoArea}
            </div>
            {actionButtons}
            <div className="dataTable">
              <table className="tableStyle">
                {header}
                <tbody>{elements}</tbody>
              </table>
            </div>
          </>
        </Modal>
      );
    } else {
      return (
        <Modal
          styles={{
            modal: {
              maxWidth: 'fit-content',
              background: '#6c3636',
              padding: '40px',
              fontFamily: 'Play',
              alignItems: 'center',
              textAlign: 'center',
              border: '6px solid #f7f6f6',
              borderRadius: '10px',
            },
          }}
          open={this.props.updateModalOpen}
          center={true}
          showCloseIcon={false}
          onOverlayClick={this.props.setUpdateModalState}
        >
          <>
            <div>
              <p className="title">Employee profile</p>
            </div>
            <div className="profileBody">
              <div className="profilePhoto">
                <img src={this.props.employeeProfilePhoto} alt="profile" />
              </div>
              {employeeInfoArea}
            </div>
            {actionButtons}
            <div className="dataTable">
              <table className="tableStyle">There is no active orders...</table>
            </div>
          </>
        </Modal>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    updateModalOpen: state.updateModalOpen,
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    isEditing: state.isEditing,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    employeeProfilePhoto: state.employeeProfilePhoto,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetSingleData: () => dispatch(actions.ResetActiveSingleData()),
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    onEdit: () => dispatch(actions.SetEditModalState()),
    onDelete: (id, menu) => {
      dispatch(actions.DeleteData(id, menu));
    },
    onUpdate: (activeMenu, data) =>
      dispatch(actions.UpdateData(activeMenu, data)),
    uploadPhoto: (id, profilePhoto) =>
      dispatch(actions.UploadProfilePhoto(id, profilePhoto)),
    getAll: (id) => dispatch(actions.FeetchMainTableData(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateEmployeeModal);
