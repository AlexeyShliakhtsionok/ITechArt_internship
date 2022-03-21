import React from 'react';
import StyleChange from '../../../Functions/ChangeStyles';
import * as actions from '../../../Redux/Actions/actions';
import { connect } from 'react-redux';

class EmployeeMediafilesByType extends React.PureComponent {
  render() {
    var singleData = this.props.singleResponseData;
    return (
      <div>
        <p style={{ color: 'wheat' }}>Mediafiles type: </p>
        <button
          className="recordsPerPage files"
          id="profile"
          onClick={(e) => {
            this.props.setActiveMediaType(e.target.id);
            this.props.getAllMedia(
              this.props.activeMenu,
              'profile',
              singleData.employeeId,
            );
            StyleChange(e.target.id);
          }}
        >
          Profile photo
        </button>
        <button
          className="recordsPerPage files"
          id="employeeGallery"
          onClick={(e) => {
            this.props.setActiveMediaType(e.target.id);
            this.props.getAllMedia(
              this.props.activeMenu,
              'employeeGallery',
              singleData.employeeId,
            );
            StyleChange(e.target.id);
          }}
        >
          Gallery
        </button>

        <button
          className="recordsPerPage files"
          id="promo"
          onClick={(e) => {
            this.props.setActiveMediaType(e.target.id);
            this.props.getAllMedia(
              this.props.activeMenu,
              'promo',
              singleData.employeeId,
            );
            StyleChange(e.target.id);
          }}
        >
          Promo gallery
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    activeMenu: state.activeMenu,
    activeMediaType: state.activeMediaType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMedia: (activeMenu, type, id) =>
      dispatch(actions.FeetchAllMediafiles(activeMenu, type, id)),
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    setActiveMediaType: (type) => dispatch(actions.SetActiveMediatype(type)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeMediafilesByType);
