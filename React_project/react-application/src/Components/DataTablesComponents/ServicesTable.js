import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import CreateServiceModal from '../ModalWindowsComponents/CreateServiceModal.js';
import UpdateServiceModal from '../ModalWindowsComponents/UpdateServiceModal';
import RecordsPerPage from './PagesCountAndNavigationComponrnts/RecordsPerPageButtons';
import PageButtons from './PagesCountAndNavigationComponrnts/PagesButtons';
import SearchInput from './PagesCountAndNavigationComponrnts/SearchInput.js';
import CreateServiceTypeModal from '../ModalWindowsComponents/CreateServiceTypeModal.js';
import UpdateServiceTypeModal from '../ModalWindowsComponents/UpdateServiceTypeModal.js';

class ServicesList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    if (data !== '') {
      var serviceElements = [];
      var serviceTypeElements = [];
      var serviceElement;
      var serviceTypeElement;

      var servicesHeader = (
        <thead>
          <tr className="tableRow">
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Time amount</th>
            <th>Price</th>
          </tr>
        </thead>
      );

      var serviceTypesHeader = (
        <thead>
          <tr className="tableRow">
            <th>Service type</th>
          </tr>
        </thead>
      );

      for (let j = 0; j < data.procedureTypesSelectList.length; j++) {
        serviceTypeElement = '';
        serviceTypeElement = (
          <tr
            key={data.procedureTypesSelectList[j].value}
            id={data.procedureTypesSelectList[j].value}
            onClick={() => {
              if (this.props.isEditing) {
                this.props.onEdit();
              }
              this.props.setActiveId(data.procedureTypesSelectList[j].value);
              this.props.getProcedureType(
                data.procedureTypesSelectList[j].value,
                'serviceTypesPage',
              );
              this.props.setProcedureTypeUpdateModalState();
              this.props.getProcedureTypePhotoById(
                data.procedureTypesSelectList[j].value,
              );
            }}
          >
            <td>{data.procedureTypesSelectList[j].text}</td>
          </tr>
        );
        serviceTypeElements = serviceTypeElements.concat(serviceTypeElement);
      }

      for (let i = 0; i < data.procedures.length; i++) {
        serviceElement = '';
        serviceElement = (
          <tr
            key={data.procedures[i].procedureId}
            id={data.procedures[i].procedureId}
            onClick={() => {
              if (this.props.isEditing) {
                this.props.onEdit();
              }
              this.props.setActiveId(data.procedures[i].procedureId);
              this.props.getService(
                data.procedures[i].procedureId,
                this.props.activeMenu,
              );
              this.props.setUpdateModalState();
            }}
          >
            <td>{data.procedures[i].procedureName}</td>
            <td>{data.procedures[i].procedureDescription}</td>
            <td>{data.procedures[i].procedureType}</td>
            <td>{data.procedures[i].timeAmount}</td>
            <td>{data.procedures[i].procedurePrice}</td>
          </tr>
        );
        serviceElements = serviceElements.concat(serviceElement);
      }
    }

    if (data !== '') {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Services</p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setCreateModalState();
              }}
            >
              New service
            </button>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setProcedureTypeCreateModalState();
              }}
            >
              New service type
            </button>
            <RecordsPerPage />
            <SearchInput />
          </div>
          <div className="dataTable">
            <table className="tableStyle">
              {servicesHeader}
              <tbody>{serviceElements}</tbody>
            </table>
            <table className="tableStyle">
              {serviceTypesHeader}
              <tbody>{serviceTypeElements}</tbody>
            </table>
            <CreateServiceModal />
            <UpdateServiceModal />
            <CreateServiceTypeModal />
            <UpdateServiceTypeModal />
          </div>
          <PageButtons />
        </>
      );
    } else {
      return (
        <>
          <p>There is no Data in DB...</p>
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
    isEditing: state.isEditing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProcedureType: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
    onEdit: () => dispatch(actions.SetEditModalState()),
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    setProcedureTypeCreateModalState: () =>
      dispatch(actions.SetProcedureTypeCreateModalState()),
    setProcedureTypeUpdateModalState: () =>
      dispatch(actions.SetProcedureTypeUpdateModalState()),
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    getService: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
    getProcedureTypePhotoById: (id) =>
      dispatch(actions.GetProcedureTypePhotoById(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
