import React, { Component } from 'react';

import { AppHeader } from '../AppHeader/AppHeader';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import { TodoList } from '../TodoList/TodoList';
import { ItemStatusFilter } from '../ItemStatusFilter/ItemStatusFilter';
import { AddItem } from '../AddItem/AddItem';

import { ALL, ACTIVE, DONE } from './constants';

import './App.css';

class App extends Component {
  maxId = 100;

  state = {
    toDoData: [
      this.createToDoItem('Drink coffee'),
      this.createToDoItem('Build Awesome App'),
      this.createToDoItem('Have a lunch'),
    ],
    term: '',
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ toDoData }) => {
      const newToDoData = toDoData.filter((item) => item.id !== id);
      return {
        toDoData: newToDoData,
      };
    });
  };

  createToDoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  addItem = (text) => {
    const newItem = this.createToDoItem(text);

    this.setState(({ toDoData }) => {
      const newToDoData = toDoData.concat(newItem);
      return {
        toDoData: newToDoData,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ toDoData }) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, 'important'),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ toDoData }) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, 'done'),
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case ALL:
        return items;
      case ACTIVE:
        return items.filter((item) => !item.done);
      case DONE:
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { toDoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(toDoData, term), filter);

    const doneCount = toDoData.filter((el) => el.done).length;
    const toDoCount = toDoData.filter((el) => !el.done).length;

    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onAdded={this.addItem} />
      </div>
    );
  }
}

export { App };
