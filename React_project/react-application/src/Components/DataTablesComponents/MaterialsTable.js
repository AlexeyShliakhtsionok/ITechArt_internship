import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import { SetActiveIdentifier } from '../../Redux/Actions/actions.js';
import CreateMaterialModal from '../ModalWindowsComponents/CreateMaterialModal.js';
import UpdateMaterialModal from '../ModalWindowsComponents/UpdateMaterialModal.js';
import RecordsPerPage from './PagesCountAndNavigationComponrnts/RecordsPerPageButtons';
import PageButtons from './PagesCountAndNavigationComponrnts/PagesButtons';
import SearchInput from './PagesCountAndNavigationComponrnts/SearchInput.js';

class MaterialsList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData.materials;
    if (data !== '') {
      var elements = [];
      var element;
      var header = (
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Productiond date</th>
            <th>Best before date</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
      );

      for (let i = 0; i < data.length; i++) {
        var productionDate = data[i].productionDate.substr(0, 10);
        var bestBeforeDate = data[i].bestBeforeDate.substr(0, 10);
        element = '';
        element = (
          <tr
            key={data[i].materialId}
            id={data[i].materialId}
            onClick={() => {
              if (this.props.isEditing) {
                this.props.onEdit();
              }
              this.props.setActiveId(data[i].materialId);
              this.props.getMaterial(data[i].materialId, this.props.activeMenu);
              this.props.setUpdateModalState();
            }}
          >
            <td>{data[i].materialName}</td>
            <td>{data[i].materialAmount}</td>
            <td>{productionDate}</td>
            <td>{bestBeforeDate}</td>
            <td>{data[i].materialManufacturer}</td>
          </tr>
        );
        elements = elements.concat(element);
      }
    }

    if (data !== '') {
      return (
        <>
          <div className="tableFunctionality">
            <p className="title">Materials</p>
            <button
              className="modalButton"
              onClick={() => {
                this.props.setCreateModalState();
              }}
            >
              Add new material
            </button>
            <RecordsPerPage />
            <SearchInput />
          </div>
          <div className="dataTable">
            <table className="tableStyle">
              {header}
              <tbody>{elements}</tbody>
            </table>
            <CreateMaterialModal />
            <UpdateMaterialModal />
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
    isEditing: state.isEditing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEdit: () => dispatch(actions.SetEditModalState()),
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    setActiveId: (id) => dispatch(SetActiveIdentifier(id)),
    getMaterial: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsList);
