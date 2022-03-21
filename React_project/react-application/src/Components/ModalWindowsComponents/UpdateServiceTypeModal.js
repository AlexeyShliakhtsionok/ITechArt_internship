import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';

class UpdateServiceTypeModal extends React.PureComponent {
  render() {
    var procedureTypeInfoArea;
    var actionButtons;
    var singleData = this.props.singleResponseData;
    var procedureTypeName = '';
    if (singleData !== '') procedureTypeName = singleData.procedureTypeName;
    var procedureTypeToUpdate = {
      procedureTypeId: singleData.procedureTypeId,
      procedureTypeName: singleData.procedureTypeName,
      mediaFile: singleData.mediaFile,
    };

    if (!this.props.isEditing) {
      actionButtons = (
        <div className="editProcedureTypeInfo">
          <button className="modalButton" onClick={this.props.onEdit}>
            Edit type
          </button>
          <button
            className="modalButton"
            onClick={() => {
              this.props.onDelete(this.props.activeId);
              this.props.setProcedureTypeUpdateModalState();
            }}
          >
            Delete type
          </button>
        </div>
      );
      procedureTypeInfoArea = (
        <>
          <div className="profileText">
            <div className="profileTextItem">
              <p>Procedure type name: {procedureTypeName}</p>
            </div>
          </div>
        </>
      );
    } else {
      actionButtons = (
        <div className="confirmUserInfo">
          <div>
            <form onSubmit={this.onSubmit} id="submForm">
              <input
                className="procedureTypePhotoInput"
                id="procedureTypePhoto"
                name="procedureTypePhoto"
                type="file"
              />
              <button
                className="modalButton"
                type="submit"
                onClick={() => {
                  const formData = new FormData();
                  var procedureTypePhoto =
                    document.getElementById('procedureTypePhoto');
                  formData.append(
                    'procedureTypePhoto',
                    procedureTypePhoto.files[0],
                  );
                  this.props.uploadPhoto(this.props.activeId, formData);
                  this.props.onEdit();
                  this.props.setProcedureTypeUpdateModalState();
                }}
              >
                Save photo
              </button>
            </form>
          </div>
          <div>
            <button
              className="modalButton"
              onClick={() => {
                this.props.onEdit();
                this.props.setProcedureTypeUpdateModalState();
                this.props.onUpdate(procedureTypeToUpdate);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      );

      procedureTypeInfoArea = (
        <>
          <div className="profileText">
            <div className="profileTextItem">
              <div className="profileTextItem-left">
                <p>Service type name:</p>
              </div>
              <div className="profileTextItem-right">
                <input
                  type="text"
                  placeholder={procedureTypeName}
                  onChange={(e) => {
                    procedureTypeToUpdate.procedureTypeName = e.target.value;
                  }}
                />
              </div>
            </div>
          </div>
        </>
      );
    }

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
          },
        }}
        open={this.props.updateProcedureTypeModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setProcedureTypeUpdateModalState}
      >
        <>
          <p className="title">Service type menu</p>
          <div className="procedureTypeBody">
            <div className="procedureTypePhoto">
              <img
                src={this.props.procedureTypePhoto}
                alt="There is no data..."
              />
            </div>
            {procedureTypeInfoArea}
          </div>
          {actionButtons}
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    procedureTypePhoto: state.procedureTypePhoto,
    isEditing: state.isEditing,
    singleResponseData: state.singleResponseData,
    updateProcedureTypeModalOpen: state.updateProcedureTypeModalOpen,
    activeId: state.activeId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadPhoto: (procedureTypeId, procedureTypePhoto) =>
      dispatch(
        actions.UploadProcedureTypePhoto(procedureTypeId, procedureTypePhoto),
      ),
    onEdit: () => dispatch(actions.SetEditModalState()),
    setProcedureTypeUpdateModalState: () =>
      dispatch(actions.SetProcedureTypeUpdateModalState()),
    onUpdate: (data) => dispatch(actions.UpdateProcedureType(data)),
    onDelete: (id) => dispatch(actions.DeleteServiceType(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateServiceTypeModal);
