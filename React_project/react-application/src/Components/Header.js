import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions/actions';

class Header extends React.PureComponent {
  render() {
    var logoutButton;

    if (this.props.isAuthenticated) {
      logoutButton = (
        <button
          className="logoutButton headerAdditionalElement"
          onClick={() => {
            this.props.onLogout();
            this.props.setInitialMenu('promotionsPage');
            this.props.resetActiveSingleData();
          }}
        >
          Logout
        </button>
      );
    } else {
      logoutButton = <></>;
    }

    return (
      <>
        <header className="header">
          <div className="logotype">
            <img src="./images/logo.png" alt="logotype" />
          </div>
          <div className="tagLine">
            <p>Just make yourself perfect</p>
          </div>
          <div className="contactUs">
            <img src="./images/tel.png" alt="contacts" />
            <p style={{ color: 'wheat', marginRight: '50px' }}>
              {' '}
              +375 (29) 217-05-24
            </p>
          </div>
          <div className="workingHours">
            <p>Mon-Sat 09:00-21:00</p>
          </div>
          {logoutButton}
        </header>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(actions.EmployeeLogout()),
    resetActiveSingleData: () => dispatch(actions.ResetActiveSingleData()),
    setInitialMenu: (activeMenu) => dispatch(actions.SetActiveMenu(activeMenu)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
