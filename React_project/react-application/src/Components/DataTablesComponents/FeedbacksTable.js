import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import CreateFeedbackModal from '../ModalWindowsComponents/CreateFeedbackModal';
import RecordsPerPage from './PagesCountAndNavigationComponrnts/RecordsPerPageButtons';
import PageButtons from './PagesCountAndNavigationComponrnts/PagesButtons';

class FeedbacksList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData.feedbacks;
    if (data !== '') {
      var elements = [];
      var element;
      for (let i = 0; i < data.length; i++) {
        var actionButtons = '';
        var createFeedbackButton = '';
        if (this.props.employeeToken !== '') {
          if (!data[i].isVerify) {
            actionButtons = (
              <>
                <button
                  className="modalButton"
                  onClick={() => {
                    this.props.onApprove(this.props.activeMenu, data[i]);
                    this.props.onNewFeedbacksCheck();
                  }}
                >
                  Approve
                </button>
                <button
                  className="modalButton"
                  onClick={() => {
                    this.props.onDelete(
                      data[i].feedbackId,
                      this.props.activeMenu,
                    );
                    this.props.onNewFeedbacksCheck();
                  }}
                >
                  Remove
                </button>
              </>
            );
          } else {
            actionButtons = (
              <>
                <button
                  className="modalButton"
                  onClick={() => {
                    this.props.onDelete(
                      data[i].feedbackId,
                      this.props.activeMenu,
                    );
                    this.props.onNewFeedbacksCheck();
                  }}
                >
                  Remove
                </button>
              </>
            );
          }
        } else {
          var createFeedbackButton = (
            <button
              className="managementMenuButton"
              id="feedback"
              onClick={(e) => {
                this.props.setCreateModalState();
              }}
            >
              Create feedback
            </button>
          );
        }

        element = '';
        element = (
          <div
            className="feedback"
            key={data[i].feedbackId}
            id={data[i].feedbackId}
          >
            <div className="feedbackTitle">{data[i].feedbackTitle}</div>
            <div className="feedbackBody">
              <div className="feedbackInfo">
                <div className="feedbackAuthor">{data.clientFullName}</div>
                <div className="feedbackAuthorEmail">{data[i].clientEmail}</div>
                <div className="feedbackDate">
                  {data[i].createdOn.substring(0, 10) +
                    ' ' +
                    data[i].createdOn.substring(11, 16)}
                </div>
                <div>{actionButtons}</div>
              </div>
              <div className="feedbackText">{data[i].feedbackText}</div>
            </div>
          </div>
        );
        elements = elements.concat(element);
      }
      console.log('elements', elements);
    }

    if (data !== '') {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Feedbacks</p>
            <RecordsPerPage />
            {createFeedbackButton}
          </div>

          {elements}
          <PageButtons />
          <CreateFeedbackModal />
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    unwachedFeedbacks: state.unwachedFeedbacks,
    employeeToken: state.employeeToken,
    pagedTablesData: state.pagedTablesData,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNewFeedbacksCheck: () => dispatch(actions.CheckUnwachedFeedbacks()),
    onApprove: (activeMenu, feedback) =>
      dispatch(actions.UpdateFeedback(activeMenu, feedback)),
    onDelete: (id, activeMenu) =>
      dispatch(actions.DeleteFeedback(id, activeMenu)),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbacksList);
