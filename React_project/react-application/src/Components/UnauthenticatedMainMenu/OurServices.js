import React from 'react';
import { connect } from 'react-redux';

class OurServicesList extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    if (data !== '') {
      var serviceTypeElements = [];
      var serviceElements = [];
      var serviceTypeElement;
      var serviceElement;

      var servicesHeader = (
        <thead>
          <tr className="tableRow">
            <th>Name</th>
            <th>Description</th>
            <th>Time amount</th>
            <th>Price</th>
          </tr>
        </thead>
      );

      for (let j = 0; j < data.length - 1; j++) {
        let typePhoto = `data:image/gif;base64,${data[j].mediaFile.fileData}`;
        for (let i = 0; i < data[j].procedures.length; i++) {
          serviceElement = (
            <tr key={data[j].procedureId} id={data[j].procedureId}>
              <td>{data[j].procedures[i].procedureName}</td>
              <td>{data[j].procedures[i].procedureDescription}</td>
              <td>{data[j].procedures[i].timeAmount}</td>
              <td>{data[j].procedures[i].procedurePrice}</td>
            </tr>
          );
          serviceElements = serviceElements.concat(serviceElement);
        }

        serviceTypeElement = (
          <div className="serviceInfo">
            <div className="profileCardBody">
              <div className="profileCardInfo">
                <p>{data[j].procedureTypeName}</p>
                <div className="profilePhoto">
                  <img src={typePhoto} alt="" />
                </div>
              </div>
            </div>

            <div className="dataTable">
              <table className="tableStyle">
                {servicesHeader}
                <tbody>{serviceElements}</tbody>
              </table>
            </div>
          </div>
        );
        serviceTypeElements = serviceTypeElements.concat(serviceTypeElement);
        serviceElements = [];
      }

      if (data !== '') {
        return (
          <>
            <div className="tableFunctionality">
              <p className="title">Our services</p>
            </div>
            <div className="dataTable">{serviceTypeElements}</div>
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
}
function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    activeMenu: state.activeMenu,
  };
}

export default connect(mapStateToProps, null)(OurServicesList);
