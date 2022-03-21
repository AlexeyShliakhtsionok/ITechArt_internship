import React from 'react';
import * as actions from '../../Redux/Actions/actions.js';
import { connect } from 'react-redux';

class Autorization extends React.PureComponent {
  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.resetMenu();
          this.props.onAuth(
            document.getElementById('employeeEmail').value,
            document.getElementById('employeePassword').value,
          );

          this.props.setLoginModalState();
        }}
      >
        <p className="title">Email: </p>
        <input
          type="email"
          className="employeeCredentials"
          id="employeeEmail"
        />
        <p className="title">Password: </p>
        <input
          type="password"
          className="employeeCredentials"
          id="employeePassword"
        />
        <div>
          <input type="submit" value="Login" className="modalButton" />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginModalOpen: state.updateModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoginModalState: () => dispatch(actions.SetLoginModalState()),
    resetMenu: () => dispatch(actions.ResetActiveMenu()),
    onAuth: (email, password) =>
      dispatch(actions.EmployeeAutorization(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Autorization);
