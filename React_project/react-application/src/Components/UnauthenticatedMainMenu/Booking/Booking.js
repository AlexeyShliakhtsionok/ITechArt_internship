import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/actions';
import ClientCheck from './ClientCheck';
import CreateNewClient from './CreateNewClient';
import CreateNewOrder from './CreateNewOrder';

class Booking extends React.PureComponent {
  render() {
    if (
      this.props.bookingInProcess === true &&
      this.props.singleResponseData === ''
    ) {
      return <ClientCheck />;
    } else if (
      this.props.bookingInProcess === true &&
      this.props.singleResponseData !== '' &&
      this.props.singleResponseData !== 'Not found'
    ) {
      return <CreateNewOrder />;
    } else if (
      this.props.bookingInProcess === true &&
      this.props.singleResponseData === 'Not found'
    ) {
      return <CreateNewClient />;
    } else if (this.props.newOrderSuccess) {
    }
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    bookingInProcess: state.bookingInProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getByEmail: (email) => dispatch(actions.FetchClientByEmail(email)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
