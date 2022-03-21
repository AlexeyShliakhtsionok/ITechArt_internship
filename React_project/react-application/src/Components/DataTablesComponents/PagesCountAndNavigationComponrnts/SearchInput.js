import React from 'react';
import StyleChange from '../../../Functions/ChangeStyles';
import * as actions from '../../../Redux/Actions/actions';
import { connect } from 'react-redux';
import { Search } from '../../../Functions/Search';

class SearchInput extends React.PureComponent {
  render() {
    return (
      <div className="searchArea">
        <p style={{ color: 'wheat', marginBottom: '5px' }}>Search on page</p>
        <input
          type="text"
          placeholder="Find..."
          onChange={(e) => {
            Search(e.target.value);
          }}
        />
      </div>
    );
  }
}

export default connect()(SearchInput);
