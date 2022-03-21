import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';

class CreateServiceTypeModal extends React.PureComponent {
  render() {
    var serviceInfoArea;
    var serviceTypeToCreate = {
      procedureTypeName: '',
    };

    serviceInfoArea = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.setProcedureTypeCreateModalState();
          this.props.onCreate(serviceTypeToCreate);
        }}
        className="profileText"
      >
        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Service type name:</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="text"
              placeholder="Service type name..."
              onChange={(e) => {
                serviceTypeToCreate.procedureTypeName = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="confirmServiceTypeInfo">
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
        open={this.props.createProcedureTypeModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setProcedureTypeCreateModalState}
      >
        <>
          <p className="title">Create new service type</p>
          <div className="profileBody">{serviceInfoArea}</div>
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    createProcedureTypeModalOpen: state.createProcedureTypeModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProcedureTypeCreateModalState: () =>
      dispatch(actions.SetProcedureTypeCreateModalState()),
    onCreate: (data) => dispatch(actions.CreateNewProcedureType(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateServiceTypeModal);
