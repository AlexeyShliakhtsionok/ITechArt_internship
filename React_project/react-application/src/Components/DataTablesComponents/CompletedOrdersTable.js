import React from 'react';
import { connect } from 'react-redux';
import RecordsPerPage from './PagesCountAndNavigationComponrnts/RecordsPerPageButtons';
import PageButtons from './PagesCountAndNavigationComponrnts/PagesButtons';
import SearchInput from './PagesCountAndNavigationComponrnts/SearchInput.js';
import * as actions from '../../Redux/Actions/actions';

class CompletedOrdersList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    if (data.orders.length !== 0) {
      var elements = [];
      var element;
      var header = (
        <thead>
          <tr>
            <th>Date of service</th>
            <th>Client name</th>
            <th>Client phone number</th>
            <th>Procedure name</th>
            <th>Employee</th>
          </tr>
        </thead>
      );

      for (let i = 0; i < data.orders.length; i++) {
        var serviceDateInfo =
          String(data.orders[i].dateOfService).substring(0, 10) +
          ' ' +
          String(data.orders[i].dateOfService).substring(11, 16);

        element = '';
        element = (
          <tr
            key={data.orders[i].orderId + data.orders[i].isCompleted}
            id={data.orders[i].orderId + data.orders[i].isCompleted}
            // eslint-disable-next-line no-loop-func
          >
            <td>{serviceDateInfo}</td>
            <td>{data.orders[i].clientFullName}</td>
            <td>{data.orders[i].clientPhoneNumber}</td>
            <td>{data.orders[i].procedureName}</td>
            <td>{data.orders[i].employeeFullName}</td>
          </tr>
        );
        elements = elements.concat(element);
      }

      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Completed orders</p>
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
              <PageButtons />
            </table>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Completed orders</p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setCreateModalState();
              }}
            >
              New order
            </button>
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
          <div className="dataTable">
            <table className="tableStyle">
              <p>There is no completed orders yet...</p>
            </table>
          </div>
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: (activePage, rowsPerPage, pageNumber) =>
      dispatch(
        actions.FeetchMainTableData(activePage, rowsPerPage, pageNumber),
      ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompletedOrdersList);
