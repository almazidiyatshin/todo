import React, { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
	state = {
		term: ''
	}
	
	onSearchChange = (e) => {
		const term = e.target.value;
		this.setState({ term });
		this.props.onSearchChange(term);
	};
	
	render() {
		return <input
				type="text"
				placeholder="search"
				className='form-control search-input'
				onChange={ this.onSearchChange }
				value={ this.state.term }/>;
	};
}

export { SearchPanel };
