import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/actions';

class BookNowButton extends React.PureComponent {
  render() {
    if (this.props.bookingInProcess) {
      return (
        <>
          <p></p>
        </>
      );
    } else {
      return (
        <div>
          <button
            className="booking"
            onClick={() => {
              this.props.getAll('ordersPage');
              this.props.setBookingState();
            }}
          >
            Book now
          </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    bookingInProcess: state.bookingInProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: (activePage) => dispatch(actions.FeetchMainTableData(activePage)),
    setBookingState: () => dispatch(actions.SetBookingStatus()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookNowButton);
