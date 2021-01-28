import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TodoListItem } from '../TodoListItem/TodoListItem';

import './TodoList.css';

class TodoList extends Component {
  render() {
    const { todos, onDeleted, onToggleImportant, onToggleDone } = this.props;
    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <li key={id} className="list-group-item">
          <TodoListItem
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        </li>
      );
    });

    return <ul className="list-group todo-list">{elements}</ul>;
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export { TodoList };
