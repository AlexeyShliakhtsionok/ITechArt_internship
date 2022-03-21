import React from 'react';
import { connect } from 'react-redux';
import CreateMediafileModal from '../ModalWindowsComponents/CreateMediafileModal.js';
import MediafileType from './PagesCountAndNavigationComponrnts/MediafileType.js';
import * as actions from '../../Redux/Actions/actions.js';

class MediaFilesList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    if (data !== '') {
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
    }

    if (data.mediafiles.length > 0) {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Mediafiles</p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setActiveId('');
                this.props.setCreateModalState();
              }}
            >
              Add new media
            </button>
            <MediafileType />
          </div>
          <div className="dataTable">
            <div className="tableStyle media">{elements}</div>
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
              }}
            >
              Add new media
            </button>
            <MediafileType />
          </div>
          <div className="dataTable">
            <div className="tableStyle media">
              {'There is no files satisfying the condition...'}
            </div>
          </div>
          <CreateMediafileModal />
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaFilesList);
