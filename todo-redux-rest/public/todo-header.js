import ComponentPlus from './component-plus.js';
import React from 'react'; //eslint-disable-line

class TodoHeader extends ComponentPlus {
  getUncompletedCount(todos) {
    return todos.reduce(
      (count, todo) => todo.get('done') ? count : count + 1,
      0);
  }

  render() {
    console.log('todo-header.js render: entered');
    const {iTodos, onArchiveCompleted} = this.props;
    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount(iTodos)} of {iTodos.size} remaining
          <button onClick={onArchiveCompleted}>
            Archive Completed
          </button>
        </div>
      </div>
    );
  }
}

const PropTypes = React.PropTypes;
TodoHeader.propTypes = {
  iTodos: PropTypes.object.isRequired,
  onArchiveCompleted: PropTypes.func.isRequired
};

export default TodoHeader;
