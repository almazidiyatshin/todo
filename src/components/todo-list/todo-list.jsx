import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToDoListItem } from '../todo-list-item/todo-list-item';

import './todo-list.css';

class TodoList extends Component {
  render() {
    const { todos, OnDeleted, OnToggleImportant, OnToggleDone } = this.props;
    const elements = todos.map((item) => {
      const {id, ...itemProps} = item;
      return (
        <li key={id} className="list-group-item">
          <ToDoListItem
            {...itemProps}
            onDeleted={() => OnDeleted(id)}
            onToggleImportant={() => OnToggleImportant(id)}
            onToggleDone={() => OnToggleDone(id)}
          />
        </li>
      );
    });
  
    return (
      <ul className="list-group todo-list">
        { elements }
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.any,
  OnDeleted: PropTypes.any,
  OnToggleImportant: PropTypes.any,
  OnToggleDone: PropTypes.any,
}

export { TodoList };
