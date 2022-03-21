import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { SetCreateModalState, AddData } from '../../Redux/Actions/actions.js';

class CreateClientModal extends React.PureComponent {
  render() {
    var clientInfoArea;
    var clientToCreate = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    };

    clientInfoArea = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.setCreateModalState();
          this.props.onCreate(this.props.activeMenu, clientToCreate);
        }}
      >
        <div className="profileText">
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
                  clientToCreate.firstName = e.target.value;
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
                  clientToCreate.lastName = e.target.value;
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
                pattern="^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$"
                required
                placeholder="Phone number..."
                onChange={(e) => {
                  clientToCreate.phoneNumber = e.target.value;
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
                  clientToCreate.email = e.target.value;
                }}
              />
            </div>
          </div>
        </div>
        <div className="confirmUserInfo">
          <div>
            <input type="submit" className="modalButton" value="Create" />
          </div>
        </div>
      </form>
    );

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
        open={this.props.createModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setCreateModalState}
      >
        <>
          <div>
            <p className="title">Create new client</p>
          </div>
          <div className="profileBody">{clientInfoArea}</div>
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    createModalOpen: state.createModalOpen,
    responseDataList: state.responseDataList,
    singleResponseData: state.singleResponseData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCreateModalState: () => dispatch(SetCreateModalState()),
    onCreate: (activeMenu, data) => dispatch(AddData(activeMenu, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClientModal);
