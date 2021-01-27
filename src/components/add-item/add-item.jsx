import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './add-item.css';

class AddItem extends Component {
	
	state = {
		label: ''
	}
	
	OnLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};
	
	OnSubmit = (e) => {
		e.preventDefault();
		this.props.OnAdded(this.state.label);
		this.setState({
			label: ''
		});
	};
	
	render() {
		return (
			<form
				className="add-item d-flex"
				onSubmit={ this.OnSubmit }>
				<input
					type="text"
					className="form-control"
					onChange={ this.OnLabelChange }
					placeholder="Write your new task"
					value={ this.state.label }/>
				<button
					type="submit"
					className="btn btn-outline-secondary">Add</button>
			</form>
		);
	}
}

AddItem.propTypes = {
	OnAdded: PropTypes.func,
}

export { AddItem };
