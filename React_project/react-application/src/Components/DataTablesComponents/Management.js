import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import StyleChange from '../../Functions/ChangeStyles.js';
import OkImage from '../../Images/ok.png';
import AttentionImage from '../../Images/attention.png';

class ManagementPage extends React.PureComponent {
  render() {
    var newFeedbacksIndication;
    var newOrdersIndication;

    if (this.props.unwachedFeedbacks == 0) {
      newFeedbacksIndication = (
        <img className="checkImage" src={OkImage} alt="Ok" />
      );
    } else {
      newFeedbacksIndication = (
        <img className="checkImage" src={AttentionImage} alt="Attention" />
      );
    }

    if (this.props.uncalledClients == 0) {
      newOrdersIndication = (
        <img className="checkImage" src={OkImage} alt="Ok" />
      );
    } else {
      newOrdersIndication = (
        <img className="checkImage" src={AttentionImage} alt="Attention" />
      );
    }
    return (
      <nav className="navigationBar">
        <ul>
          <li>
            <button
              className="managementMenuButton"
              id="staffPage"
              onClick={(e) => {
                this.props.resetSingleData();
                this.props.getAll(e.target.id);
                StyleChange(e.target.id);
              }}
            >
              Staff
            </button>
          </li>

          <li>
            <button
              className="managementMenuButton"
              id="clientsPage"
              onClick={(e) => {
                this.props.resetSingleData();
                this.props.getAll(e.target.id);
                StyleChange(e.target.id);
              }}
            >
              Clients
            </button>
          </li>

          <li>
            <button
              className="managementMenuButton"
              id="servicesPage"
              onClick={(e) => {
                this.props.resetSingleData();
                this.props.getAll(e.target.id);
                StyleChange(e.target.id);
              }}
            >
              Services
            </button>
          </li>

          <li>
            <button
              className="managementMenuButton"
              id="materialsPage"
              onClick={(e) => {
                this.props.resetSingleData();
                this.props.getAll(e.target.id);
                StyleChange(e.target.id);
              }}
            >
              Materials
            </button>
          </li>

          <li>
            <button
              className="managementMenuButton"
              id="ordersPage"
              onClick={(e) => {
                this.props.resetSingleData();
                this.props.getOrders(e.target.id);
                StyleChange(e.target.id);
              }}
            >
              Orders {newOrdersIndication}
            </button>
          </li>

          <li>
            <button
              className="managementMenuButton"
              id="mediaFilesPage"
              onClick={(e) => {
                this.props.resetSingleData();
                this.props.getAllMedia(e.target.id, 'all', 0);
                StyleChange(e.target.id);
              }}
            >
              Files
            </button>
          </li>
          <li>
            <button
              className="managementMenuButton"
              id="feedbacksPage"
              onClick={(e) => {
                this.props.resetSingleData();
                this.props.getAll(e.target.id);
                StyleChange(e.target.id);
              }}
            >
              Feedbacks {newFeedbacksIndication}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenu: state.activeMenu,
    unwachedFeedbacks: state.unwachedFeedbacks,
    uncalledClients: state.uncalledClients,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: (id) => dispatch(actions.FeetchMainTableData(id)),
    onUnprocessedOrdersCheck: () => dispatch(actions.CheckUnprocessedOrders()),
    onNewFeedbacksCheck: () => dispatch(actions.CheckUnwachedFeedbacks()),
    getOrders: (id) => dispatch(actions.FeetchMainTableData(id)),
    getAllMedia: (activeMenu, fileType, employeeId) =>
      dispatch(actions.FeetchAllMediafiles(activeMenu, fileType, employeeId)),
    resetSingleData: () => dispatch(actions.ResetActiveSingleData()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagementPage);
