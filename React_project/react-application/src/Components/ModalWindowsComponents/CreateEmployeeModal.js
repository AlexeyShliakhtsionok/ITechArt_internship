import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';

class CreateEmployeeModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var employeeInfoArea;
    var employeeToCreate = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      email: '',
      procedureTypeId: '',
      qualification: '',
      role: '',
      hireDate: '',
    };

    var roles = [];
    data.roles.forEach((element) => {
      roles.push({ value: element.value, label: element.name });
    });

    var procedureTypesSL = [];
    data.procedureTypesSelectList.forEach((element) => {
      procedureTypesSL.push({ value: element.value, label: element.text });
    });

    var qualifications = [];
    data.qualification.forEach((element) => {
      qualifications.push({ value: element.value, label: element.name });
    });

    employeeInfoArea = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            employeeToCreate.procedureTypeId === '' ||
            employeeToCreate.role === '' ||
            employeeToCreate.qualification === ''
          ) {
            alert('Some of required fields is empty. Adding failed... ');
          } else {
            this.props.setCreateModalState();
            this.props.onCreate(this.props.activeMenu, employeeToCreate);
          }
        }}
        className="profileText"
      >
        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>First name:</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="text"
              placeholder="First name..."
              onChange={(e) => {
                employeeToCreate.firstName = e.target.value;
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
              required
              type="text"
              placeholder="Last name..."
              onChange={(e) => {
                employeeToCreate.lastName = e.target.value;
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
              required
              type="date"
              placeholder="Hire date..."
              onChange={(e) => {
                employeeToCreate.hireDate = e.target.value;
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
              required
              pattern="^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$"
              type="tel"
              placeholder="Phone number..."
              onChange={(e) => {
                employeeToCreate.phoneNumber = e.target.value;
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
              required
              type="email"
              placeholder="E-mail..."
              onChange={(e) => {
                employeeToCreate.email = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Password:</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="password"
              placeholder="Password..."
              onChange={(e) => {
                employeeToCreate.password = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>ProcedureType:</p>
          </div>
          <div className="profileTextItem-right">
            <Select
              options={procedureTypesSL}
              onChange={(data) => {
                employeeToCreate.procedureTypeId = data.value;
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
              onChange={(data) => {
                employeeToCreate.qualification = data.value;
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
              options={roles}
              onChange={(data) => {
                employeeToCreate.role = data.value;
              }}
            />
          </div>
        </div>
        <div className="confirmUserInfo">
          <div>
            <input type="submit" value="Create" className="modalButton" />
          </div>
        </div>
      </form>
    );

    return (
      <Modal
        styles={{
          modal: {
            background: '#6c3636',
            padding: '40px',
            fontFamily: 'Play',
            alignItems: 'center',
            textAlign: 'center',
            border: '6px solid #f7f6f6',
            borderRadius: '10px',
          },
        }}
        open={this.props.createModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setCreateModalState}
      >
        <>
          <div>
            <p className="title">Create new employee</p>
          </div>
          <div className="profileBody">{employeeInfoArea}</div>
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    createModalOpen: state.createModalOpen,
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    onCreate: (activeMenu, data) => dispatch(actions.AddData(activeMenu, data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEmployeeModal);
