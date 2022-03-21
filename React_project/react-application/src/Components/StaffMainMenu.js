import React from 'react';
import { connect } from 'react-redux';
import ClientsList from './DataTablesComponents/ClientsTable';
import MaterialsList from './DataTablesComponents/MaterialsTable';
import ServicesList from './DataTablesComponents/ServicesTable';
import OrdersList from './DataTablesComponents/OrdersTable';
import MediaFilesList from './DataTablesComponents/MediaFiles';
import FeedbacksList from './DataTablesComponents/FeedbacksTable';
import EmployeesList from './DataTablesComponents/EmployeesTable';
import CompletedOrdersTable from './DataTablesComponents/CompletedOrdersTable';
import StagedOrdersTable from './DataTablesComponents/StagedOrdersTable';

class StaffMainMenu extends React.PureComponent {
  render() {
    var activeOption;
    switch (this.props.activeMenu) {
      case 'clientsPage':
        activeOption = <ClientsList />;
        break;

      case 'materialsPage':
        activeOption = <MaterialsList />;
        break;

      case 'servicesPage':
        activeOption = <ServicesList />;
        break;

      case 'ordersPage':
        activeOption = <OrdersList />;
        break;

      case 'donedOrdersPage':
        activeOption = <CompletedOrdersTable />;
        break;

      case 'stagedOrdersPage':
        activeOption = <StagedOrdersTable />;
        break;

      case 'feedbacksPage':
        activeOption = <FeedbacksList />;
        break;

      case 'staffPage':
        activeOption = <EmployeesList />;
        break;

      case 'mediaFilesPage':
        activeOption = <MediaFilesList />;
        break;

      default:
        break;
    }
    return (
      <>
        <>{activeOption}</>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffMainMenu);
