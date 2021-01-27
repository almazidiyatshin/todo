import React, { Component } from 'react';

import { AppHeader } from '../app-header/app-header';
import { SearchPanel } from '../search-panel/search-panel';
import { TodoList } from '../todo-list/todo-list';
import { ItemStatusFilter } from '../item-status-filter/item-status-filter';
import { AddItem } from '../add-item/add-item';

import './app.css';

class App extends Component {
	
	maxId = 100;
	
	state = {
		toDoData: [
			this.CreateToDoItem('Drink coffee'),
			this.CreateToDoItem('Build Awesome app'),
			this.CreateToDoItem('Have a lunch')
		],
		term: '',
		filter: 'all'
	};
	
	DeleteItem = (id) => {
		this.setState(({ toDoData }) => {
			const newToDoData = toDoData.filter((item) => item.id !== id);
			return {
				toDoData: newToDoData
			};
		});
	};
	
	CreateToDoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}
	
	AddItem = (text) => {
		const newItem = this.createToDoItem(text);
	
		this.setState(({ toDoData }) => {
			const newToDoData = toDoData.concat(newItem);
			return {
				toDoData: newToDoData
			};
		});
	};
	
	ToggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem.[propName] };
		
		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
		}
	
	OnToggleImportant = (id) => {
		this.setState(({ toDoData }) => {
			return {
				toDoData: this.toggleProperty(toDoData, id, 'important')
			};
		});
	};
	
	OnToggleDone = (id) => {
		this.setState(({ toDoData }) => {
			return {
				toDoData: this.ToggleProperty(toDoData, id, 'done')
			};
		});
	};
	
	OnSearchChange = (term) => {
		this.setState({ term })
	}
	
	OnFilterChange = (filter) => {
		this.setState({ filter })
	}
	
	Search(items, term) {
		if (term.length === 0) {
			return items;
		}
		return items.filter((item) => {
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
	}
	
	Filter(items, filter) {
		const all = 'all';
		const active = 'active';
		const done = 'done';
		
		switch(filter) {
			case all:
				return items;
			case active:
				return items.filter((item) => !item.done);
			case done:
				return items.filter((item) => item.done);
			default:
				return items;
		}
	}
	
	render() {
		const { toDoData, term, filter } = this.state;
		const visibleItems = this.Filter(this.Search(toDoData, term), filter);
		
		const doneCount = toDoData.filter((el) => el.done).length;
		const toDoCount = toDoData.filter((el) => !el.done).length;
		
		return (
			<div className="todo-app">
				<AppHeader toDo={ toDoCount } done={ doneCount }/>
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={ this.OnSearchChange }/>
					<ItemStatusFilter
						filter={ filter }
						onFilterChange={ this.OnFilterChange }/>
				</div>
				<TodoList
					todos={ visibleItems }
					onDeleted={ this.DeleteItem }
					onToggleImportant={ this.OnToggleImportant }
					onToggleDone={ this.OnToggleDone }
				/>
				<AddItem onAdded={ this.AddItem }/>
			</div>
		);
	}
}

export { App };
