import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';

class CreateMediafileModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var employeeList = [{ value: 0, label: 'All employees' }];
    data.employeesSelectList.forEach((element) => {
      employeeList.push({
        value: element.value,
        label: element.text,
      });
    });
    var actionButtons;
    var addMediaArea;
    var submitId;

    if (this.props.activeId !== '') {
      actionButtons = (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData();
              var mediafile = document.getElementById('mediafile');
              formData.append('mediafile', mediafile.files[0]);
              this.props.uploadPhoto(this.props.activeId, submitId, formData);
              this.props.setCreateModalState();
            }}
            id="submForm"
            style={{ marginTop: '30px' }}
          >
            <input
              className="photoInput"
              id="mediafile"
              name="mediafile"
              type="file"
            />
            <input
              className="modalButton"
              id="promo"
              type="submit"
              onMouseEnter={(e) => {
                submitId = e.target.id;
              }}
              value="Add as promo media"
            />

            <input
              className="modalButton"
              type="submit"
              onMouseEnter={(e) => {
                submitId = e.target.id;
              }}
              id="gallery"
              value="Add as gallery media"
            />
          </form>
        </div>
      );
    } else {
      actionButtons = <></>;
    }
    addMediaArea = (
      <div
        className="confirmUserInfo"
        style={{ flexDirection: 'column', height: '150px' }}
      >
        <Select
          maxMenuHeight={100}
          options={employeeList}
          placeholder="Choose the employee..."
          onChange={(data) => {
            this.props.setActiveId(data.value);
          }}
        />
        {actionButtons}
      </div>
    );
    return (
      <Modal
        styles={{
          modal: {
            maxWidth: 'fit-content',
            background: '#6c3636',
            padding: '40px',
            fontFamily: 'Play',
            alignItems: 'center',
            textAlign: 'center',
            border: '6px solid #f7f6f6',
            borderRadius: '10px',
            height: '400px',
          },
        }}
        open={this.props.createModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={() => {
          this.props.setCreateModalState();
          this.props.setActiveId('');
        }}
      >
        <>
          <p className="title">Add new media</p>
          <div className="profileBody"></div>
          {addMediaArea}
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    createModalOpen: state.createModalOpen,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    pagedTablesData: state.pagedTablesData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    uploadPhoto: (id, type, mediafile) =>
      dispatch(actions.UploadPhoto(id, type, mediafile)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateMediafileModal);
