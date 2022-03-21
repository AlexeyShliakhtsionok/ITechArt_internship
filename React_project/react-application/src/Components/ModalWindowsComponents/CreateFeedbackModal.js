import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';

class CreateFeedbacktModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var singleData = this.props.singleResponseData;
    var isDisabled = false;
    if (singleData === '') {
      isDisabled = false;
    } else {
      isDisabled = true;
    }
    var feedbackInfoArea;
    var emailCheck;
    var feedbackToCreate = {
      client: singleData,
      feedbackTitle: '',
      feedbackText: '',
      isVerify: false,
      createdOn: new Date(),
    };
    emailCheck = (
      <div className="profileTextItem">
        <div className="profileTextItem-right">
          <input
            type="email"
            placeholder="Email..."
            onChange={(e) => {
              data.clients.forEach((client) => {
                if (client.email === e.target.value)
                  feedbackToCreate.client = this.props.getByEmail(client.email);
              });
            }}
          />
        </div>
      </div>
    );

    feedbackInfoArea = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          feedbackToCreate.createdOn = new Date(
            feedbackToCreate.createdOn.getTime() + 180 * 60000,
          );
          this.props.setCreateModalState();
          this.props.onCreate('feedbacksPage', feedbackToCreate);
        }}
        className="profileText"
      >
        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Title</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="text"
              placeholder="Title..."
              onChange={(e) => {
                feedbackToCreate.feedbackTitle = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Text:</p>
          </div>
          <div className="profileTextItem-right">
            <textarea
              required
              type="text"
              className="feedbackBodyText"
              placeholder="Text..."
              onChange={(e) => {
                feedbackToCreate.feedbackText = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="confirmUserInfo">
          <input
            type="submit"
            value="Create feedback"
            className="modalButton"
          />
        </div>
      </form>
    );

    if (isDisabled) {
      return (
        <Modal
          styles={{
            modal: {
              maxWidth: 'fit-content',
              background: '#6c3636',
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
            <p className="title">New feedback</p>
            <div>{feedbackInfoArea}</div>
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
            <p className="title">Let us check if you have been served before</p>
            <p className="emailCheckMessage">
              Please, enter the email of your own account...
            </p>
            <div className="profileBody">{emailCheck}</div>
          </>
        </Modal>
      );
    }
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
    onCreate: (activeMenu, data) =>
      dispatch(actions.CreateFeedback(activeMenu, data)),
    getByEmail: (email) => dispatch(actions.FetchClientByEmail(email)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateFeedbacktModal);
