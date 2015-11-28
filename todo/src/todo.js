import React from 'react'; //eslint-disable-line

// props is passed to this function and destructured.
const Todo = ({todo, onToggleDone, onDeleteTodo}) =>
  <li>
    <input type="checkbox"
      checked={todo.done}
      onChange={onToggleDone}/>
    <span className={'done-' + todo.done}> {todo.text}</span>
    <button onClick={onDeleteTodo}>Delete</button>
  </li>;

const PropTypes = React.PropTypes;
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired
};

export default Todo;
