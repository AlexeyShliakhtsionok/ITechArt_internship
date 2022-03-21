import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Components/Header.js';
import NavigationBar from './Components/NavigationBar';
import HowToFindUs from './Components/HowToFindUs';
import StaffMainMenu from './Components/StaffMainMenu';
import PromotionsList from './Components/DataTablesComponents/Promotions';
import Booking from './Components/UnauthenticatedMainMenu/Booking/Booking';
import Feedbacks from './Components/DataTablesComponents/FeedbacksTable';
import OurServices from './Components/UnauthenticatedMainMenu/OurServices';
import OurStaff from './Components/UnauthenticatedMainMenu/OurStaff';
import EmployeeMenu from './Components/DataTablesComponents/EmployeeMenu/EmployeeMenu';

class App extends React.PureComponent {
  render() {
    if (this.props.employeeToken === '') {
      if (!this.props.bookingInProcess) {
        if (this.props.activeMemu === 'feedbacksPage') {
          return (
            <div className="App">
              <Header />
              <NavigationBar />
              <div className="main">
                <div className="main_window">
                  <div className="carousels">
                    <div className="mainPage">
                      <Feedbacks />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (
          this.props.activeMemu === 'promotionsPage' &&
          this.props.employeeToken === ''
        ) {
          return (
            <div className="App">
              <Header />
              <NavigationBar />
              <div className="main">
                <div className="main_window">
                  <div className="carousels">
                    <div className="mainPage">
                      <PromotionsList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (this.props.activeMemu === 'ourStaffPage') {
          return (
            <div className="App">
              <Header />
              <NavigationBar />
              <div className="main">
                <div className="main_window">
                  <div className="carousels">
                    <div className="mainPage">
                      <OurStaff />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (this.props.activeMemu === 'procedureTypesPage') {
          return (
            <div className="App">
              <Header />
              <NavigationBar />
              <div className="main">
                <div className="main_window">
                  <div className="carousels">
                    <div className="mainPage">
                      <OurServices />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (this.props.activeMemu === 'aboutUsPage') {
          return (
            <div className="App">
              <Header />
              <NavigationBar />
              <div className="main">
                <div className="main_window">
                  <div className="carousels">
                    <div className="mainPage">
                      <HowToFindUs />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (
          this.props.activeMemu === '' ||
          this.props.activeMemu === 'clientsPage'
        ) {
          return (
            <div className="App">
              <Header />
              <NavigationBar />
              <div className="main">
                <div className="main_window">
                  <div className="carousels">
                    <div className="mainPage">
                      <p>Loading...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      } else
        return (
          <div className="App">
            <Header />
            <NavigationBar />
            <div className="main">
              <div className="main_window">
                <div className="mainPage">
                  <Booking />
                </div>
              </div>
            </div>
          </div>
        );
    } else if (
      this.props.employeeToken !== '' &&
      this.props.employeeToken.employeeRole === 0
    ) {
      return (
        <div className="App">
          <Header />
          <NavigationBar />
          <div className="main">
            <div className="main_window">
              <div className="mainPage">
                <StaffMainMenu />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header />
          <div className="main">
            <div className="main_window">
              <div className="mainPage">
                <EmployeeMenu />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    employeeToken: state.employeeToken,
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    bookingInProcess: state.bookingInProcess,
    activeMemu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
