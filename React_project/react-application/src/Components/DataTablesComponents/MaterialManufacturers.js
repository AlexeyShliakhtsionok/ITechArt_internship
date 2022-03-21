import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';

class MaterialManufacturers extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    if (data !== '') {
      var elements = [];
      var element;
      var header = (
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Made in</th>
          </tr>
        </thead>
      );

      for (let i = 0; i < data.length; i++) {
        element = '';
        element = (
          <tr
            key={data[i].ManufacturerId}
            id={data[i].ManufacturerId}
            onClick={() => {
              this.props.setActiveId(data[i].ManufacturerId);
              this.props.getManufacturer(
                data[i].ManufacturerId,
                this.props.activeMenu,
              );
              this.props.setUpdateModalState();
            }}
          >
            <td>{data[i].manufacturerName}</td>
            <td>{data[i].madeIn}</td>
          </tr>
        );
        elements = elements.concat(element);
      }
    }

    if (data !== '') {
      return (
        <>
          <button
            className="modalButton"
            onClick={() => {
              this.props.setCreateModalState();
            }}
          >
            New material
          </button>
          <div className="dataTable">
            <table className="tableStyle">
              {header}
              <tbody>{elements}</tbody>
            </table>
            {/* <CreateMaterialModal />
            <UpdateMaterialModal /> */}
          </div>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    setActiveId: (id) => dispatch(actions.SetActiveIdentifier(id)),
    getManufacturer: (id, activeMenu) =>
      dispatch(actions.FetchActiveRecordData(id, activeMenu)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaterialManufacturers);
