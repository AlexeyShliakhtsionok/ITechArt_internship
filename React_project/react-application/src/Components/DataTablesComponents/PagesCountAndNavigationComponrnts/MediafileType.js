import React from 'react';
import StyleChange from '../../../Functions/ChangeStyles';
import * as actions from '../../../Redux/Actions/actions';
import { connect } from 'react-redux';
import Select from 'react-select';

class MediaFileTypes extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var employeeList = [{ value: 0, label: 'All employees' }];
    data.employeesSelectList.forEach((element) => {
      employeeList.push({
        value: element.value,
        label: element.text,
      });
    });

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
              this.props.activeId,
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
              this.props.activeId,
            );
            StyleChange(e.target.id);
          }}
        >
          Employee gallery
        </button>

        <button
          className="recordsPerPage files"
          id="promo"
          onClick={(e) => {
            this.props.setActiveMediaType(e.target.id);
            this.props.getAllMedia(
              this.props.activeMenu,
              'promo',
              this.props.activeId,
            );
            StyleChange(e.target.id);
          }}
        >
          Promo gallery
        </button>
        <Select
          maxMenuHeight={100}
          options={employeeList}
          placeholder="Choose the employee..."
          onChange={(data) => {
            this.props.setActiveId(data.value);
            this.props.getAllMedia(
              this.props.activeMenu,
              this.props.activeMediaType,
              data.value,
            );
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    activeMenu: state.activeMenu,
    activeId: state.activeId,
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaFileTypes);
