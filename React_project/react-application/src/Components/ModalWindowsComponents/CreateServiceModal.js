import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { SetCreateModalState, AddData } from '../../Redux/Actions/actions.js';
import Select from 'react-select';

class CreateServiceModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var serviceInfoArea;
    var serviceToCreate = {
      procedureName: '',
      procedureDescription: '',
      timeAmount: '',
      procedurePrice: '',
      procedureType: '',
      materials: [],
    };

    var procedureTypesList = [];
    var materialList = [];

    data.procedureTypesSelectList.forEach((element) => {
      procedureTypesList.push({
        value: element.value,
        label: element.text,
      });
    });

    data.materialsSelectList.forEach((element) => {
      materialList.push({
        value: element.value,
        label: element.text,
      });
    });

    serviceInfoArea = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            serviceToCreate.procedureType === '' ||
            serviceToCreate.materials === ''
          ) {
            alert('Some of required fields is empty. Adding failed... ');
          } else {
            this.props.setCreateModalState();
            this.props.onCreate(this.props.activeMenu, serviceToCreate);
          }
        }}
        className="profileText"
      >
        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Procedure name:</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="text"
              placeholder="Procedure name..."
              onChange={(e) => {
                serviceToCreate.procedureName = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Procedure description:</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="text"
              placeholder="Procedure description..."
              onChange={(e) => {
                serviceToCreate.procedureDescription = e.target.value;
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
              required
              pattern="00:0[0-9]:[0-5][0-9]"
              type="text"
              placeholder="Time amount (00:hh:mm)..."
              onChange={(e) => {
                serviceToCreate.timeAmount = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Procedure price:</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="text"
              pattern="^[0-9]+$"
              placeholder="Procedure price..."
              onChange={(e) => {
                serviceToCreate.procedurePrice = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Procedure type:</p>
          </div>
          <div className="profileTextItem-right">
            <Select
              maxMenuHeight={100}
              options={procedureTypesList}
              onChange={(data) => {
                serviceToCreate.procedureType = data.value;
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
                serviceToCreate.materials = [];
                for (var i = 0; i < data.length; i++) {
                  serviceToCreate.materials.push(data[i].value);
                }
              }}
            />
          </div>
        </div>
        <div className="confirmUserInfo">
          <div>
            <input type="submit" className="modalButton" value="Create" />
          </div>
        </div>
      </form>
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
          },
        }}
        open={this.props.createModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setCreateModalState}
      >
        <>
          <p className="title">Create new service</p>
          <div className="profileBody">{serviceInfoArea}</div>
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    createModalOpen: state.createModalOpen,
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCreateModalState: () => dispatch(SetCreateModalState()),
    onCreate: (activeMenu, data) => dispatch(AddData(activeMenu, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateServiceModal);
