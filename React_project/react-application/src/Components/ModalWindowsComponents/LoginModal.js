import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Authorization from './Authorization';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';

class LoginModal extends React.PureComponent {
  render() {
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
        open={this.props.loginModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={() => {
          this.props.setLoginModalState();
        }}
      >
        <>
          <Authorization />
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginModalOpen: state.loginModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoginModalState: () => dispatch(actions.SetLoginModalState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
