import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import CreateClientModal from '../ModalWindowsComponents/CreateClientModal.js';
import UpdateClientModal from '../ModalWindowsComponents/UpdateClientModal.js';
import RecordsPerPage from './PagesCountAndNavigationComponrnts/RecordsPerPageButtons';
import PageButtons from './PagesCountAndNavigationComponrnts/PagesButtons';
import SearchInput from './PagesCountAndNavigationComponrnts/SearchInput.js';
import SortingMenu from './PagesCountAndNavigationComponrnts/SortingMenu.js';

class ClientsList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData.clients;
    if (data !== '') {
      var elements = [];
      var element;
      var header = (
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
      );

      for (let i = 0; i < data.length; i++) {
        element = '';
        element = (
          <tr
            key={data[i].clientId}
            id={data[i].clientId}
            onClick={() => {
              if (this.props.isEditing) {
                this.props.onEdit();
              }
              this.props.setActiveId(data[i].clientId);
              this.props.getClient(data[i].clientId, this.props.activeMenu);
              this.props.setUpdateModalState();
            }}
          >
            <td>{data[i].fullName}</td>
            <td>{data[i].phoneNumber}</td>
            <td>{data[i].email}</td>
          </tr>
        );
        elements = elements.concat(element);
      }
    }

    if (data !== '') {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Clients</p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setCreateModalState();
              }}
            >
              New client
            </button>
            <RecordsPerPage />
            <SortingMenu />
            <SearchInput />
          </div>
          <div className="dataTable">
            <table className="tableStyle">
              {header}
              <tbody>{elements}</tbody>
            </table>
            <CreateClientModal />
            <UpdateClientModal />
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
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    sortBy: state.sortBy,
    isEditing: state.isEditing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEdit: () => dispatch(actions.SetEditModalState()),
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    getClient: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList);
