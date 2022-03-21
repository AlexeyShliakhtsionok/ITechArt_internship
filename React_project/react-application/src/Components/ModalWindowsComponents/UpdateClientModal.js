import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';

class UpdateClientModal extends React.PureComponent {
  render() {
    var singleData = this.props.singleResponseData;
    var firstName = singleData.firstName;
    var lastName = singleData.lastName;
    var phone = singleData.phoneNumber;
    var email = singleData.email;
    var clientInfoArea;
    var actionButtons;
    var clientToUpdate = {
      clientId: this.props.activeId,
      firstName: singleData.firstName,
      lastName: singleData.lastName,
      phoneNumber: singleData.phoneNumber,
      email: singleData.email,
    };

    var orders = [];
    if (singleData !== '') {
      singleData.orders.forEach((order) => {
        orders.push(order);
      });
      // Client orders table
    }

    if (orders !== null) {
      var elements = [];
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

      for (let i = 0; i < orders.length; i++) {
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
    // End of client orders table

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

      clientInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <p>First name: {firstName}</p>
          </div>

          <div className="profileTextItem">
            <p>Last name: {lastName}</p>
          </div>

          <div className="profileTextItem">
            <p>Phone: {phone}</p>
          </div>

          <div className="profileTextItem">
            <p>Email: {email}</p>
          </div>
        </div>
      );
    } else {
      actionButtons = (
        <div className="confirmUserInfo">
          <div>
            <button
              className="modalButton"
              onClick={() => {
                this.props.onEdit();
                this.props.setUpdateModalState();
                this.props.onUpdate(this.props.activeMenu, clientToUpdate);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      );

      clientInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>First name:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                defaultValue={firstName}
                onChange={(e) => {
                  clientToUpdate.firstName = e.target.value;
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
                defaultValue={lastName}
                onChange={(e) => {
                  clientToUpdate.lastName = e.target.value;
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
                defaultValue={phone}
                onChange={(e) => {
                  clientToUpdate.phoneNumber = e.target.value;
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
                defaultValue={email}
                onChange={(e) => {
                  clientToUpdate.email = e.target.value;
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
            <p className="title">Client profile</p>
            <div className="profileBody">{clientInfoArea}</div>
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
            <div className="profileBody">{clientInfoArea}</div>
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
    pagedTablesData: state.pagedTablesData,
    updateModalOpen: state.updateModalOpen,
    singleResponseData: state.singleResponseData,
    isEditing: state.isEditing,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    onEdit: () => dispatch(actions.SetEditModalState()),
    onDelete: (id, menu) => {
      dispatch(actions.DeleteData(id, menu));
    },
    onUpdate: (activeMenu, data) =>
      dispatch(actions.UpdateData(activeMenu, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClientModal);
