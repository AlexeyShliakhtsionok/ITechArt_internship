import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions/actions';
import ManagementPage from './DataTablesComponents/Management';
import LoginModal from './ModalWindowsComponents/LoginModal';
import StyleChange from '../Functions/ChangeStyles';
import CreateFeedbackModal from './ModalWindowsComponents/CreateFeedbackModal';
import BookNowButton from './UnauthenticatedMainMenu/Booking/BookNowButton';

class NavigationBar extends React.PureComponent {
  render() {
    if (this.props.employeeToken === '') {
      return (
        <nav className="navigationBar">
          <ul>
            <li>
              <button
                className="managementMenuButton"
                id="ourServices"
                onClick={(e) => {
                  this.props.getServices();
                  if (this.props.bookingInProcess) {
                    this.props.setOrderCreationStatus();
                  }
                  StyleChange(e.target.id);
                }}
              >
                Our services
              </button>
            </li>
            <li>
              <button
                className="managementMenuButton"
                id="ourStaffPage"
                onClick={(e) => {
                  this.props.resetSingleData();
                  this.props.getAll(e.target.id);
                  if (this.props.bookingInProcess) {
                    this.props.setOrderCreationStatus();
                  }
                  StyleChange(e.target.id);
                }}
              >
                Our staff
              </button>
            </li>
            <li>
              <button
                className="managementMenuButton"
                id="feedbacksPage"
                onClick={(e) => {
                  StyleChange(e.target.id);
                  this.props.getReviews(e.target.id);
                  if (this.props.bookingInProcess) {
                    this.props.setOrderCreationStatus();
                  }
                }}
              >
                Reviews
              </button>
            </li>
            <li>
              <button
                className="managementMenuButton"
                id="aboutUsPage"
                onClick={(e) => {
                  this.props.getGoogleMap('aboutUsPage');
                  StyleChange(e.target.id);
                  if (this.props.bookingInProcess) {
                    this.props.setOrderCreationStatus();
                  }
                }}
              >
                About us
              </button>
            </li>
            <li>
              <button
                className="managementMenuButton"
                id="aboutUsPage"
                onClick={() => {
                  if (this.props.bookingInProcess) {
                    this.props.setOrderCreationStatus();
                  }
                  this.props.setLoginModalState();
                  this.props.onNewFeedbacksCheck();
                  this.props.onUnprocessedOrdersCheck();
                }}
              >
                Login
              </button>
              <LoginModal />
              <CreateFeedbackModal />
            </li>
          </ul>
          <BookNowButton />
        </nav>
      );
    } else {
      return <ManagementPage />;
    }
  }
}

function mapStateToProps(state) {
  return {
    employeeToken: state.employeeToken,
    activeMemu: state.activeMenu,
    bookingInProcess: state.bookingInProcess,
    updateModalOpen: state.updateModalOpen,
    loginModalOpen: state.loginModalOpen,
    unwachedFeedbacks: state.unwachedFeedbacks,
    uncalledClients: state.uncalledClients,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUnprocessedOrdersCheck: () => dispatch(actions.CheckUnprocessedOrders()),
    onNewFeedbacksCheck: () => dispatch(actions.CheckUnwachedFeedbacks()),
    resetSingleData: () => dispatch(actions.ResetActiveSingleData()),
    setLoginModalState: () => dispatch(actions.SetLoginModalState()),
    getGoogleMap: (activeMenu) => dispatch(actions.SetActiveMenu(activeMenu)),
    getServices: () => dispatch(actions.FeetchAllProcedureTypes()),
    getAllClients: (activePage) =>
      dispatch(actions.FeetchMainTableData(activePage)),
    getReviews: (activeMenu) =>
      dispatch(actions.GetAllApprovedFeedbacks(activeMenu)),
    getAll: (activePage) => dispatch(actions.FeetchMainTableData(activePage)),
    setBookingState: () => dispatch(actions.SetBookingStatus()),
    setOrderCreationStatus: () => dispatch(actions.SetOrderStatus()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
