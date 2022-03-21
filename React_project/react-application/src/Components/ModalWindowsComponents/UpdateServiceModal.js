import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';

class UpdateServiceModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var singleData = this.props.singleResponseData;
    var procedureName = singleData.procedureName;
    var procedureDescription = singleData.procedureDescription;
    var timeAmount = singleData.timeAmount;
    var price = singleData.procedurePrice;
    var serviceInfoArea;
    var actionButtons;
    var serviceToUpdate = {
      procedureId: this.props.activeId,
      procedureName: singleData.procedureName,
      procedureDescription: singleData.procedureDescription,
      timeAmount: singleData.timeAmount,
      procedurePrice: singleData.procedurePrice,
      procedureType: singleData.procedureType,
      materials: singleData.materials,
    };

    var procedureTypesList = [];
    data.procedureTypesSelectList.forEach((element) => {
      procedureTypesList.push({
        value: element.value,
        label: element.text,
      });
    });

    var materialList = [];
    data.materialsSelectList.forEach((element) => {
      materialList.push({
        value: element.value,
        label: element.text,
      });
    });

    if (!this.props.isEditing) {
      actionButtons = (
        <div className="editUserInfo">
          <button className="modalButton" onClick={this.props.onEdit}>
            Edit service
          </button>
          <button
            className="modalButton"
            onClick={() => {
              this.props.onDelete(this.props.activeId, this.props.activeMenu);
              this.props.setUpdateModalState();
            }}
          >
            Delete service
          </button>
        </div>
      );

      serviceInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <p>Service name: {procedureName}</p>
          </div>

          <div className="profileTextItem">
            <p>Service description: {procedureDescription}</p>
          </div>

          <div className="profileTextItem">
            <p>Time amount: {timeAmount}</p>
          </div>

          <div className="profileTextItem">
            <p>Price: {price}</p>
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
                this.props.onUpdate(this.props.activeMenu, serviceToUpdate);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      );

      serviceInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Service name:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                defaultValue={procedureName}
                onChange={(e) => {
                  serviceToUpdate.procedureName = e.target.value;
                }}
              />
            </div>
          </div>
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Service description:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                defaultValue={procedureDescription}
                onChange={(e) => {
                  serviceToUpdate.procedureDescription = e.target.value;
                }}
              />
            </div>
          </div>
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Price:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                defaultValue={price}
                onChange={(e) => {
                  serviceToUpdate.procedurePrice = e.target.value;
                }}
              />
            </div>
          </div>
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Time amount:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="text"
                defaultValue={timeAmount}
                onChange={(e) => {
                  serviceToUpdate.timeAmount = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>ProcedureType:</p>
            </div>
            <div className="profileTextItem-right">
              <Select
                options={procedureTypesList}
                onChange={(data) => {
                  serviceToUpdate.procedureType = data.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Materials:</p>
            </div>
            <div className="profileTextItem-right">
              <Select
                isMulti={true}
                maxMenuHeight={100}
                options={materialList}
                onChange={(data) => {
                  serviceToUpdate.materials = [];

                  for (var i = 0; i < data.length; i++) {
                    serviceToUpdate.materials.push(data[i].value);
                  }
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
          <p className="title">Service menu</p>
          <div className="profileBody">{serviceInfoArea}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateServiceModal);
