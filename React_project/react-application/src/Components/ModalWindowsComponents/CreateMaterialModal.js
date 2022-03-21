import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';

class CreateMaterialModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var materialManufacturerInfoArea;
    var materialInfoArea;
    var manufacturerToCreate = {
      manufacturerName: '',
      madeIn: '',
    };
    var materialToCreate = {
      materialName: '',
      materialAmount: '',
      productionDate: '',
      bestBeforeDate: '',
      materialManufacturer: '',
    };

    // Array for using in <Select /> dropdown list
    var manufacturers = [];
    data.materialManufacturersSelectList.forEach((element) => {
      manufacturers.push({ value: element.value, label: element.text });
    });

    // Elements to render conrent

    materialManufacturerInfoArea = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <p className="title">Add new manufacturer</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (materialToCreate.materialManufacturer === '') {
              alert('Some of required fields is empty. Adding failed... ');
            } else {
              this.props.setCreateModalState();
              this.props.onManufacturerCreate(manufacturerToCreate);
            }
          }}
          className="profileText"
        >
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Manufacturer:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                required
                type="text"
                placeholder="Manufacturer name..."
                onChange={(e) => {
                  manufacturerToCreate.manufacturerName = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Made in:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                required
                pattern="^[A-Z][A-Z,a-z,\s]+$"
                type="text"
                placeholder="Made in..."
                onChange={(e) => {
                  manufacturerToCreate.madeIn = e.target.value;
                }}
              />
            </div>
          </div>
          <div className="confirmUserInfo">
            <input
              type="submit"
              value="Add new manufacturer"
              className="modalButton"
            />
          </div>
        </form>
      </div>
    );

    materialInfoArea = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <p className="title">Create new material</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.setCreateModalState();
            this.props.onCreate(this.props.activeMenu, materialToCreate);
          }}
          className="profileText"
        >
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Material name:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                required
                type="text"
                placeholder="Material name..."
                onChange={(e) => {
                  materialToCreate.materialName = e.target.value;
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
                required
                pattern="^[0-9]+$"
                type="text"
                placeholder="Material amount..."
                onChange={(e) => {
                  materialToCreate.materialAmount = e.target.value;
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
                required
                type="date"
                placeholder="Phone number..."
                onChange={(e) => {
                  materialToCreate.productionDate = e.target.value;
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
                required
                type="date"
                placeholder="Best before date..."
                onChange={(e) => {
                  materialToCreate.bestBeforeDate = e.target.value;
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
                  materialToCreate.materialManufacturer = data.value;
                }}
              />
            </div>
          </div>
          <div className="confirmUserInfo">
            <input
              type="submit"
              className="modalButton"
              value="Create new marerial"
            />
          </div>
        </form>
      </div>
    );

    return (
      <Modal
        maxMenuHeight={100}
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
        open={this.props.createModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setCreateModalState}
      >
        <>
          <div className="profileBody">
            {materialInfoArea} {materialManufacturerInfoArea}
          </div>
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    createModalOpen: state.createModalOpen,
    pagedTablesData: state.pagedTablesData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    onCreate: (activeMenu, data) => dispatch(actions.AddData(activeMenu, data)),
    onManufacturerCreate: (activeMenu) =>
      dispatch(actions.CreateNewManufacturer(activeMenu)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateMaterialModal);
