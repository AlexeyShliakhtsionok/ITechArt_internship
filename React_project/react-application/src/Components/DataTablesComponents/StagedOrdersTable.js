import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import RecordsPerPage from './PagesCountAndNavigationComponrnts/RecordsPerPageButtons';
import PageButtons from './PagesCountAndNavigationComponrnts/PagesButtons';
import SearchInput from './PagesCountAndNavigationComponrnts/SearchInput.js';

class StagedOrdersList extends React.PureComponent {
  MaterialsWriteOff = (id) => {
    var dataDiv = document.getElementById(id);
    var materialNames = dataDiv.getElementsByClassName('materialName');
    var materialAmounts = dataDiv.getElementsByClassName('materialAmount');
    var result = [];
    for (let i = 0; i < materialNames.length; i++) {
      result.push([materialNames[i].id, materialAmounts[i].value]);
    }
    this.props.onAmountUpdate(result);
    this.props.onOrderComplete(id);
  };

  render() {
    var data = this.props.pagedTablesData;
    if (data.orders.length !== 0) {
      var elements = [];
      let materialsAmount = [];
      var element;
      var header = (
        <thead>
          <tr>
            <th>Date of service</th>
            <th>Client name</th>
            <th>Client phone number</th>
            <th>Procedure name</th>
            <th>Employee</th>
            <th>Material</th>
          </tr>
        </thead>
      );
      for (let i = 0; i < data.orders.length; i++) {
        materialsAmount = [];
        // eslint-disable-next-line no-loop-func
        data.materials.forEach((material) => {
          material.procedures.forEach((procedure) => {
            if (procedure.procedureId === data.orders[i].procedureId) {
              materialsAmount = materialsAmount.concat(
                <div>
                  <p style={{ fontSize: '20px' }} name="materialName">
                    <span className="materialName" id={material.materialId}>
                      {material.materialName}
                    </span>{' '}
                    ,mg/pcs.
                  </p>
                  <input type="text" className="materialAmount" />{' '}
                </div>,
              );
            }
          });
        });

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
            onClick={() => {
              if (this.props.isEditing) {
                this.props.onEdit();
              }
              this.props.setActiveId(data.orders[i].orderId);
              this.props.getOrder(
                data.orders[i].orderId,
                this.props.activeMenu,
              );
            }}
          >
            <td>{serviceDateInfo}</td>
            <td>{data.orders[i].clientFullName}</td>
            <td>{data.orders[i].clientPhoneNumber}</td>
            <td>{data.orders[i].procedureName}</td>
            <td>{data.orders[i].employeeFullName}</td>
            <td>
              <>
                {materialsAmount}{' '}
                <button
                  className="modalButton"
                  id={data.orders[i].orderId}
                  style={{ fontSize: '10px', width: '60px', height: '20px' }}
                  onClick={(e) => {
                    this.MaterialsWriteOff(e.target.id);
                  }}
                >
                  Write off
                </button>
              </>
            </td>
          </tr>
        );
        elements = elements.concat(element);
      }
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Staged orders</p>
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
            <p className="title">Staged orders</p>
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
    singleResponseData: state.singleResponseData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    isEditing: state.isEditing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onOrderComplete: (id) => dispatch(actions.UpdateOrderStatus(id)),
    onAmountUpdate: (data) => dispatch(actions.UpdateMaterialAmount(data)),
    getOrders: (activePage, rowsPerPage, pageNumber) =>
      dispatch(
        actions.FeetchMainTableData(activePage, rowsPerPage, pageNumber),
      ),
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    getOrder: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StagedOrdersList);
