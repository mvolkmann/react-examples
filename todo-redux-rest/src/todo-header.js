import React from 'react'; //eslint-disable-line

class TodoHeader extends React.Component {
  getUncompletedCount(todos) {
    return todos.reduce(
      (count, todo) => todo.done ? count : count + 1,
      0);
  }

  shouldComponentUpdate(nextProps) {
    // This test is easy because iTodo is an Immutable object!
    return nextProps.iTodos !== this.props.iTodos;
  }

  render() {
    console.log('todo-header.js render: entered');
    const {iTodos, onArchiveCompleted} = this.props;
    return (
      <div>
        <h2>To Do List</h2>
        {this.getUncompletedCount(iTodos)} of {iTodos.size} remaining
        <button onClick={onArchiveCompleted}>
          Archive Completed
        </button>
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
