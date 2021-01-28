import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchPanel.css';

class SearchPanel extends Component {
  state = {
    term: '',
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="search"
        className="form-control search-input"
        onChange={this.onSearchChange}
        value={this.state.term}
      />
    );
  }
}

SearchPanel.propTypes = {
  onSearchChange: PropTypes.func,
};

export { SearchPanel };
