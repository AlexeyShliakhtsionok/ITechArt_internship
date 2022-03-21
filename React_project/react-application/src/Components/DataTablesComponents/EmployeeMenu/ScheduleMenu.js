import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/actions';

class UpdateEmployeeModal extends React.PureComponent {
  render() {
    var singleData = this.props.singleResponseData;

    var elements = [];
    if (singleData !== '') {
      var element;
      var header = (
        <thead>
          <tr>
            <th>Date of service</th>
            <th>Client name</th>
            <th>Client phone number</th>
            <th>Client email</th>
            <th>Procedure name</th>
            <th>Procedure cost</th>
            <th>Employee</th>
          </tr>
        </thead>
      );

      for (let i = 0; i < singleData.orders.length; i++) {
        var date = singleData.orders[i].dateOfService.substr(0, 10);
        var time = singleData.orders[i].dateOfService.substr(11, 5);
        element = '';
        element = (
          <tr
            key={singleData.orders[i].orderId}
            id={singleData.orders[i].orderId}
          >
            <td>{date + ' ' + time}</td>
            <td>{singleData.orders[i].clientFullName}</td>
            <td>{singleData.orders[i].clientPhoneNumber}</td>
            <td>{singleData.orders[i].clientEmail}</td>
            <td>{singleData.orders[i].procedureName}</td>
            <td>{singleData.orders[i].procedureCost}</td>
            <td>{singleData.orders[i].employeeFullName}</td>
          </tr>
        );
        elements = elements.concat(element);
      }
    }
    return (
      <>
        <div className="dataTable">
          <table className="tableStyle">
            {header}
            <tbody>{elements}</tbody>
          </table>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleResponseData: state.singleResponseData,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetSingleData: () => dispatch(actions.ResetActiveSingleData()),
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    onEdit: () => dispatch(actions.SetEditModalState()),
    onDelete: (id, menu) => {
      dispatch(actions.DeleteData(id, menu));
    },
    onUpdate: (activeMenu, data) =>
      dispatch(actions.UpdateData(activeMenu, data)),
    uploadPhoto: (id, profilePhoto) =>
      dispatch(actions.UploadProfilePhoto(id, profilePhoto)),
    getAll: (id) => dispatch(actions.FeetchMainTableData(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateEmployeeModal);
