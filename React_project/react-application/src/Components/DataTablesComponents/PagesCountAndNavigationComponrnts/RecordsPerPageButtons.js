import React from 'react';
import StyleChange from '../../../Functions/ChangeStyles';
import * as actions from '../../../Redux/Actions/actions';
import { connect } from 'react-redux';

class RecordsPerPage extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    return (
      <div>
        <p style={{ color: 'wheat' }}>Records per page </p>
        <button
          className="recordsPerPage active"
          id="12"
          onClick={(e) => {
            this.props.getOrders(
              this.props.activeMenu,
              e.target.id,
              data.pageNumber,
              this.props.sortBy,
            );
            StyleChange(e.target.id, 'recordsPerPage');
          }}
        >
          12
        </button>
        <button
          className="recordsPerPage"
          id="24"
          onClick={(e) => {
            this.props.getOrders(
              this.props.activeMenu,
              e.target.id,
              1,
              this.props.sortBy,
            );
            StyleChange(e.target.id, 'recordsPerPage');
          }}
        >
          24
        </button>
        <button
          className="recordsPerPage"
          id="48"
          onClick={(e) => {
            this.props.getOrders(
              this.props.activeMenu,
              e.target.id,
              1,
              this.props.sortBy,
            );
            StyleChange(e.target.id, 'recordsPerPage');
          }}
        >
          48
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    activeMenu: state.activeMenu,
    sortBy: state.sortBy,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: (menu, rowsPerPage, pageNumber, sortBy) =>
      dispatch(
        actions.FeetchMainTableData(menu, rowsPerPage, pageNumber, sortBy),
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPerPage);
