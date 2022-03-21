import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';

class UpdateMaterialModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var singleData = this.props.singleResponseData;
    var materialName = '';
    var materialAmount = '';
    var productionDate = '';
    var bestBeforeDate = '';
    if (singleData !== '') {
      materialName = singleData.materialName;
      materialAmount = singleData.materialAmount;
      productionDate = singleData.productionDate;
      bestBeforeDate = singleData.bestBeforeDate;
    }
    var materialInfoArea;
    var actionButtons;
    var materialToUpdate = {
      materialId: this.props.activeId,
      materialName: singleData.materialName,
      materialAmount: singleData.materialAmount,
      productionDate: singleData.productionDate,
      bestBeforeDate: singleData.bestBeforeDate,
      phoneNumber: singleData.phoneNumber,
      materialManufacturer: singleData.materialManufacturer,
    };

    // Array for using in <Select /> dropdown list
    var manufacturers = [];
    data.materialManufacturersSelectList.forEach((element) => {
      manufacturers.push({ value: element.value, label: element.text });
    });

    if (!this.props.isEditing) {
      actionButtons = (
        <div className="editUserInfo">
          <button className="modalButton" onClick={this.props.onEdit}>
            Edit material
          </button>
          <button
            className="modalButton"
            onClick={() => {
              this.props.onDelete(this.props.activeId, this.props.activeMenu);
              this.props.setUpdateModalState();
            }}
          >
            Delete material
          </button>
        </div>
      );

      materialInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <p>Material name: {materialName}</p>
          </div>

          <div className="profileTextItem">
            <p>Material amount: {materialAmount}</p>
          </div>

          <div className="profileTextItem">
            <p>Production date: {productionDate.substring(0, 10)}</p>
          </div>

          <div className="profileTextItem">
            <p>Best before date: {bestBeforeDate.substring(0, 10)}</p>
          </div>
        </div>
      );
    } else {
      actionButtons = (
        <div className="confirmUserInfo">
          <div>
            <button
              className="modalButton"
              onClick={() => {
                this.props.onEdit();
                this.props.setUpdateModalState();
                console.log('MTU', materialToUpdate);
                this.props.onUpdate(this.props.activeMenu, materialToUpdate);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      );

      materialInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Material name:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                defaultValue={materialName}
                onChange={(e) => {
                  materialToUpdate.materialName = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Material amount:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                defaultValue={materialAmount}
                onChange={(e) => {
                  materialToUpdate.materialAmount = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Production date:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="date"
                defaultValue={productionDate.substring(0, 10)}
                onChange={(e) => {
                  materialToUpdate.productionDate = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Best before date:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="date"
                defaultValue={bestBeforeDate.substring(0, 10)}
                onChange={(e) => {
                  materialToUpdate.bestBeforeDate = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Manufacturer:</p>
            </div>
            <div className="profileTextItem-right">
              <Select
                maxMenuHeight={100}
                options={manufacturers}
                onChange={(data) => {
                  materialToUpdate.materialManufacturer = data.value;
                }}
              />
            </div>
          </div>
        </div>
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
        open={this.props.updateModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setUpdateModalState}
      >
        <>
          <p className="title">Material menu</p>
          <div className="profileBody">{materialInfoArea}</div>
          {actionButtons}
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateModalOpen: state.updateModalOpen,
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    isEditing: state.isEditing,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    onEdit: () => dispatch(actions.SetEditModalState()),
    onDelete: (id, menu) => {
      dispatch(actions.DeleteData(id, menu));
    },
    onUpdate: (activeMenu, data) =>
      dispatch(actions.UpdateData(activeMenu, data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateMaterialModal);
