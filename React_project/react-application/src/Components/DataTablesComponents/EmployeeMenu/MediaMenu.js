import React from 'react';
import { connect } from 'react-redux';
import CreateMediafileModal from '../../ModalWindowsComponents/CreateMediafileModal.js';
import * as actions from '../../../Redux/Actions/actions';
import EmployeeMediafilesByType from './EmployeeMediafilesByType.js';

class MediaMenu extends React.PureComponent {
  componentDidMount = () => {
    this.props.getAllMedia(
      this.props.activeMenu,
      'profile',
      this.props.singleResponseData.employeeId,
    );
  };
  render() {
    var data = this.props.pagedTablesData;
    if (data.mediafiles !== undefined) {
      var elements = [];
      var element;
      if (data.mediafiles.length > 0) {
        for (let i = 0; i < data.mediafiles.length; i++) {
          element = [];
          element = (
            <dir
              className="profileCardBody"
              key={i}
              id={i}
              onClick={() => {
                this.props.setUpdateModalState();
              }}
            >
              <div className="profileCardInfo">
                <div className="profilePhoto">
                  <img
                    src={`data:image/gif;base64,${data.mediafiles[i].fileContents}`}
                    alt=""
                  />
                </div>
              </div>
            </dir>
          );
          elements = elements.concat(element);
        }
      }
    } else {
      <p>Please, wait...</p>;
    }

    if (data.mediafiles !== undefined && data.mediafiles.length > 0) {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Mediafiles</p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setCreateModalState();
              }}
            >
              Add new media
            </button>
            <EmployeeMediafilesByType />
          </div>
          <div className="dataTable">
            <div className="tableStyle media" style={{ width: '1000px' }}>
              {elements}
            </div>
          </div>
          <CreateMediafileModal />
        </>
      );
    } else {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Mediafiles</p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setCreateModalState();
                this.props.setButtonDisableState();
              }}
            >
              Add new media
            </button>
            <EmployeeMediafilesByType />
          </div>
          <div className="dataTable">
            <div className="tableStyle media">
              {'There is no files satisfying the condition...'}
            </div>
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
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMedia: (activeMenu, type, id) =>
      dispatch(actions.FeetchAllMediafiles(activeMenu, type, id)),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaMenu);
