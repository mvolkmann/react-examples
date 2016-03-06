// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

import React from 'react'; //eslint-disable-line
import Todo from './todo';
import Immutable from 'immutable';

class TodoHeader extends React.Component {
  getUncompletedCount(todos): number {
    return todos.reduce(
      (count, todo) => todo.get('done') ? count : count + 1,
      0);
  }

  /*
  shouldComponentUpdate(nextProps) {
    return this.props.iTodos !== nextProps.iTodos;
  }
  */

  render() {
    console.log('todo-header.js render: entered');
    const {iTodos, onArchiveCompleted} = this.props;
    return (
      <div>
        <h2>To Do List</h2>
        <div>
          <span>
            {this.getUncompletedCount(iTodos)} of {iTodos.size} remaining
          </span>
          <button onClick={onArchiveCompleted}>
            Archive Completed
          </button>
        </div>
      </div>
    );
  }
}

const {func, object} = React.PropTypes;
TodoHeader.propTypes = {
  iTodos: object.isRequired,
  onArchiveCompleted: func.isRequired
};

export default TodoHeader;
