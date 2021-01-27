import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './search-panel.css';

class SearchPanel extends Component {
	state = {
		term: ''
	}
	
	OnSearchChange = (e) => {
		const term = e.target.value;
		this.setState({ term });
		this.props.OnSearchChange(term);
	};
	
	render() {
		return <input
				type="text"
				placeholder="search"
				className="form-control search-input"
				onChange={ this.OnSearchChange }
				value={ this.state.term }/>;
	}
}

SearchPanel.propTypes = {
	OnSearchChange: PropTypes.func,
}

export { SearchPanel };
