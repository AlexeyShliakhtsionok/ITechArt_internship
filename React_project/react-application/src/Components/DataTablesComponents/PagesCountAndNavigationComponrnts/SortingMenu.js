import React from 'react';
import StyleChange from '../../../Functions/ChangeStyles';
import * as actions from '../../../Redux/Actions/actions';
import { connect } from 'react-redux';

class SortingMenu extends React.PureComponent {
  render() {
    return (
      <div>
        <p style={{ color: 'wheat' }}>Sort by: </p>
        <button
          className="sortingMenu active"
          id="desc"
          onClick={(e) => {
            this.props.getOrders(this.props.activeMenu, 12, 1, e.target.id);
            StyleChange(e.target.id, 'sortingMenu');
          }}
        >
          DESC
        </button>
        <button
          className="sortingMenu"
          id="asc"
          onClick={(e) => {
            this.props.getOrders(this.props.activeMenu, 12, 1, e.target.id);
            StyleChange(e.target.id, 'sortingMenu');
          }}
        >
          ASC
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenu: state.activeMenu,
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

export default connect(mapStateToProps, mapDispatchToProps)(SortingMenu);
