import React, { Component } from 'react';
import "./add-item.css";

class AddItem extends Component {
	
	state = {
		label: ''
	}
	
	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};
	
	onSubmit = (e) => {
		e.preventDefault();
		this.props.onAdded(this.state.label);
		this.setState({
			label: ''
		});
	};
	
	render() {
		return (
			<form
				className="add-item d-flex"
				onSubmit={ this.onSubmit }>
				<input
					type="text"
					className="form-control"
					onChange={ this.onLabelChange }
					placeholder="Write your new task"
					value={ this.state.label }/>
				<button
					type="submit"
					className="btn btn-outline-secondary">Add</button>
			</form>
		);
	};
}

export { AddItem };
