import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/actions';

class CreateNewClient extends React.PureComponent {
  render() {
    var clientInfoArea;
    var actionButton;
    var clientToCreate = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    };

    actionButton = (
      <div className="confirmUserInfo">
        <div>
          <button
            className="modalButton"
            onClick={() => {
              this.props.onCreate(clientToCreate);
              this.props.redirectToOrdering();
            }}
          >
            Next
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
              type="email"
              placeholder="E-mail..."
              onChange={(e) => {
                clientToCreate.email = e.target.value;
              }}
            />
          </div>
        </div>
      </div>
    );

    return (
      <>
        <div className="profileBody">{clientInfoArea}</div>
        {actionButton}
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCreate: (data) => dispatch(actions.CreateClientFromMain(data)),
    redirectToOrdering: () => dispatch(actions.RedirectToOrdering()),
  };
}

export default connect(null, mapDispatchToProps)(CreateNewClient);
