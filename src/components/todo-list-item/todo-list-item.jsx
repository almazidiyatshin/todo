import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './todo-list-item.css';

class ToDoListItem extends Component {
  render() {
    const {
      label, OnDeleted, OnToggleImportant, OnToggleDone, important, done,
    } = this.props;

    let classNames = 'todo-list-item';

    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    return (
      <span className={ classNames }>

        <span
          className="todo-list-item-label"
          onClick={ OnToggleDone }
        >
          { label }
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={ OnToggleImportant }
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={ OnDeleted }
        >
          <i className="fa fa-trash-o" />
        </button>

      </span>
    );
  }
}

ToDoListItem.propTypes = {
  label: PropTypes.any,
  OnDeleted: PropTypes.any,
  OnToggleImportant: PropTypes.any,
  OnToggleDone: PropTypes.any,
  important: PropTypes.any,
  done: PropTypes.any,
}

export { ToDoListItem };
