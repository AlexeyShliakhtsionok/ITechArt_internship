import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/actions';

class ClientCheck extends React.PureComponent {
  render() {
    var email;
    var getClientByEmail = () => {
      return () => {
        this.props.getByEmail(email);
      };
    };

    getClientByEmail = getClientByEmail.bind(this);

    var clientCheck = (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getClientByEmail(email);
          }}
          className="profileTextItem"
        >
          <div className="profileTextItem-left">
            <input
              type="submit"
              className="modalButton"
              onClick={getClientByEmail(email)}
              value="Next"
            />
          </div>
          <div className="profileTextItem-right">
            <input
              placeholder="Enter your email"
              type="email"
              onChange={(e) => {
                email = e.target.value;
              }}
            />
          </div>
        </form>
      </>
    );

    return (
      <>
        <p className="title">Let us check if you have been served before</p>
        <p className="emailCheckMessage">
          Please, enter the email of your own account...
        </p>
        <div className="profileBody">{clientCheck}</div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    bookingInProcess: state.bookingInProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getByEmail: (email) => dispatch(actions.FetchClientByEmail(email)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientCheck);
