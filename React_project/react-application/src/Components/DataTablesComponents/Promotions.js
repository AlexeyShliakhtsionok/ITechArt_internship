import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/actions.js';
import Carousel from 'react-elastic-carousel';

class PromotionsList extends React.PureComponent {
  componentDidMount = () => {
    this.props.getAllMedia('promotionsPage', 'promo', 0);
  };
  render() {
    var data = this.props.pagedTablesData;

    if (data !== '') {
      var elements = [];
      var element;

      data.mediafiles.forEach((file) => {
        element = [];
        element = (
          <dir className="profileCardBody">
            <div className="profileCardInfo">
              <div className="profilePhoto">
                <img
                  src={`data:image/gif;base64,${file.fileContents}`}
                  alt=""
                />
              </div>
            </div>
          </dir>
        );
        elements.push(element);
      });
    }

    if (data !== '') {
      return (
        <>
          <p className="title">Promotions</p>
          <div className="employeePage">
            <Carousel itemsToShow={3}>{elements}</Carousel>
          </div>
        </>
      );
    } else {
      return <p className="title">Whait while promos is loading...</p>;
    }
  }
}

function mapStateToProps(state) {
  return {
    pagedTablesData: state.pagedTablesData,
    activeMenu: state.activeMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setInitialMenu: (activeMenu) => dispatch(actions.SetActiveMenu(activeMenu)),
    getAllMedia: (activeMenu, type, id) =>
      dispatch(actions.FeetchAllMediafiles(activeMenu, type, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotionsList);
