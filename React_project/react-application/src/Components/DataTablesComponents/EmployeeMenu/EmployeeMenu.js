import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/actions';
import ProfileMenu from '../EmployeeMenu/ProfileMenu';
import ScheduleMenu from '../EmployeeMenu/ScheduleMenu';
import MediaMenu from '../EmployeeMenu/MediaMenu';
import StyleChange from '../../../Functions/ChangeStyles';

class EmployeeMenu extends React.PureComponent {
  componentDidMount = () => {
    this.props.getEmployee(this.props.employeeToken.employeeId, 'staffPage');
    this.props.setActivePage('staffPage');
    this.props.getProfilePhotoByEmployeeId(this.props.employeeToken.employeeId);
  };
  render() {
    var activeTab = '';
    switch (this.props.activeMenu) {
      case 'staffPage':
        activeTab = <ProfileMenu />;
        break;
      case 'scheduleMenu':
        activeTab = <ScheduleMenu />;
        break;
      case 'mediaFilesPage':
        activeTab = <MediaMenu />;
        break;

      default:
        break;
    }

    return (
      <>
        <dir style={{ display: 'flex' }}>
          <p className="title" style={{ paddingRight: '30px' }}>
            Employee menu
          </p>
          <button
            id="staffPage"
            className="modalButton"
            onClick={(e) => {
              this.props.setActivePage('staffPage');
              StyleChange(e.target.id);
            }}
          >
            My profile
          </button>
          <button
            className="modalButton"
            id="scheduleMenu"
            onClick={(e) => {
              this.props.setActivePage('scheduleMenu');
              StyleChange(e.target.id);
            }}
          >
            My schedule
          </button>
          <button
            className="modalButton"
            id="mediaFilesPage"
            onClick={(e) => {
              this.props.setActivePage('mediaFilesPage');
              this.props.getAllMedia(
                'mediaFilesPage',
                'profile',
                this.props.employeeToken.employeeId,
                StyleChange(e.target.id),
              );
            }}
          >
            My media
          </button>
        </dir>

        <dir className="employeePage">{activeTab}</dir>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    employeeToken: state.employeeToken,
    pagedTablesData: state.pagedTablesData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMedia: (activeMenu, type, id) =>
      dispatch(actions.FeetchAllMediafiles(activeMenu, type, id)),
    getEmployee: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
    setActivePage: (activePage) => dispatch(actions.SetActiveMenu(activePage)),
    getProfilePhotoByEmployeeId: (id) =>
      dispatch(actions.GetProfilePhotoByEmployeeId(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMenu);
