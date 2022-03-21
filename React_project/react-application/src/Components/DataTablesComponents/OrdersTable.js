import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import CreateOrderModal from '../ModalWindowsComponents/CreateOrderModal.js';
import UpdateOrderModal from '../ModalWindowsComponents/UpdateOrderModal.js';
import RecordsPerPage from './PagesCountAndNavigationComponrnts/RecordsPerPageButtons';
import PageButtons from './PagesCountAndNavigationComponrnts/PagesButtons';
import SearchInput from './PagesCountAndNavigationComponrnts/SearchInput.js';

class OrdersList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    if (data.orders !== '' || data.orders !== 0) {
      var elements = [];
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

      if (data.orders !== undefined) {
        for (let i = 0; i < data.orders.length; i++) {
          var confirmed;
          if (data.orders[i].processedByAdmimistrator === false) {
            confirmed = (
              <button
                className="modalButton"
                onClick={() => {
                  this.props.onOrderConfirm(data.orders[i].orderId);
                }}
              >
                Confirm
              </button>
            );
          } else {
            confirmed = '';
          }
          var serviceDateInfo =
            String(data.orders[i].dateOfService).substring(0, 10) +
            ' ' +
            String(data.orders[i].dateOfService).substring(11, 16);

          var serviceDate = String(data.orders[i].dateOfService).substring(
            0,
            10,
          );

          element = '';
          element = (
            <>
              <tr
                key={data.orders[i].orderId}
                id={data.orders[i].orderId}
                // eslint-disable-next-line no-loop-func
                onClick={() => {
                  if (this.props.isEditing) {
                    this.props.onEdit();
                  }
                  this.props.setActiveId(data.orders[i].orderId);
                  this.props.getOrder(
                    data.orders[i].orderId,
                    this.props.activeMenu,
                  );
                  this.props.setUpdateModalState();
                  this.props.getSchedule(
                    data.orders[i].employeeId,
                    serviceDate,
                    data.orders[i].procedureId,
                    this.props.openTime,
                    this.props.closeTime,
                  );
                }}
              >
                <td>{serviceDateInfo}</td>
                <td>{data.orders[i].clientFullName}</td>
                <td>{data.orders[i].clientPhoneNumber}</td>
                <td>{data.orders[i].clientEmail}</td>
                <td>{data.orders[i].procedureName}</td>
                <td>{data.orders[i].procedureCost}</td>
                <td>{data.orders[i].employeeFullName}</td>
              </tr>
              {confirmed}
            </>
          );
          elements = elements.concat(element);
        }

        if (data !== '') {
          return (
            <>
              <div className="tableFunctionality">
                <p className="title">Active orders</p>
                <button
                  className="modalButton"
                  onClick={() => {
                    this.props.setCreateModalState();
                  }}
                >
                  New order
                </button>
                <div>
                  <button
                    className="modalButton"
                    onClick={() => {
                      this.props.getOrders('ordersPage');
                    }}
                  >
                    Active orders
                  </button>
                  <button
                    className="modalButton"
                    onClick={() => {
                      this.props.getOrders('stagedOrdersPage');
                    }}
                  >
                    Staged orders
                  </button>
                  <button
                    className="modalButton"
                    onClick={() => {
                      this.props.getOrders('donedOrdersPage');
                    }}
                  >
                    Completed orders
                  </button>
                </div>

                <RecordsPerPage />
                <SearchInput />
              </div>

              <div className="dataTable">
                <table className="tableStyle">
                  {header}
                  <tbody>{elements}</tbody>
                  <CreateOrderModal />
                  <UpdateOrderModal />
                  <PageButtons />
                </table>
              </div>
            </>
          );
        }
      } else {
        return (
          <>
            <div className="tableFunctionality">
              <p className="title">Orders</p>
              <button
                className="modalButton"
                onClick={() => {
                  this.props.setCreateModalState();
                }}
              >
                New order
              </button>
            </div>

            <div className="dataTable">
              <table className="tableStyle">
                {header}
                <tbody>{elements}</tbody>
                <CreateOrderModal />
              </table>
            </div>
          </>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    openTime: state.openTime,
    closeTime: state.closeTime,
    isEditing: state.isEditing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onOrderConfirm: (id) => dispatch(actions.ConfirmOrder(id)),
    onEdit: () => dispatch(actions.SetEditModalState()),
    getOrders: (activePage, rowsPerPage, pageNumber) =>
      dispatch(
        actions.FeetchMainTableData(activePage, rowsPerPage, pageNumber),
      ),
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    getOrder: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
    getSchedule: (employeeId, dateOfService, procedureId, open, close) =>
      dispatch(
        actions.GetAvaliableTimes(
          employeeId,
          dateOfService,
          procedureId,
          open,
          close,
        ),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
