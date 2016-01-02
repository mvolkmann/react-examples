import React from 'react'; //eslint-disable-line

// A props object is passed to this function and destructured.
const Todo = ({onDeleteTodo, onToggleDone, todo}) =>
  <li>
    <input type="checkbox"
      checked={todo.done}
      onChange={onToggleDone}/>
    <span className={'done-' + todo.done}>{todo.text}</span>
    <button onClick={onDeleteTodo}>Delete</button>
    Foo
  </li>;

const PropTypes = React.PropTypes;
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired
};

export default Todo;
