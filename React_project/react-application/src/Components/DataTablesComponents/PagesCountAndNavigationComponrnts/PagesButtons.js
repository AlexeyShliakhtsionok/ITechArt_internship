import React from 'react';
import StyleChange from '../../../Functions/ChangeStyles';
import * as actions from '../../../Redux/Actions/actions';
import { connect } from 'react-redux';

class PageButtons extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var pages = [];
    let pageNumber = 1;
    for (let j = 0; j < 1; j++) {
      pages.push(
        <button
          className="page active"
          id={j + 1}
          key={j + 1}
          onClick={(e) => {
            this.props.getOrders(
              this.props.activeMenu,
              data.elementsPerPage,
              e.target.id,
              this.props.sortBy,
            );
            StyleChange(e.target.id, 'page');
          }}
        >
          {pageNumber}
        </button>,
      );
      pageNumber++;
    }
    for (let i = 1; i < data.pagesCount; i++) {
      pages.push(
        <button
          className="page"
          id={i + 1}
          key={i + 1}
          onClick={(e) => {
            this.props.getOrders(
              this.props.activeMenu,
              data.elementsPerPage,
              e.target.id,
              this.props.sortBy,
            );
            StyleChange(e.target.id, 'page');
          }}
        >
          {pageNumber}
        </button>,
      );
      pageNumber++;
    }
    return pages;
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

export default connect(mapStateToProps, mapDispatchToProps)(PageButtons);
