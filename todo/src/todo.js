import gronk from 'gronk';
console.log('todo.js x: gronk =', gronk);
import React from 'react'; //eslint-disable-line

// A props object is passed to this function and destructured.
const Todo = ({onDeleteTodo, onToggleDone, todo}) =>
  <li>
    <input type="checkbox"
      checked={todo.done}
      onChange={onToggleDone}/>
    <span className={'done-' + todo.done}>{todo.text}</span>
    <button onClick={onDeleteTodo}>Delete</button>
  </li>;

//const {func, object} = React.PropTypes;
const {bool, func, shape, string} = React.PropTypes;
Todo.propTypes = {
  //todo: object.isRequired,
  onDeleteTodo: func.isRequired,
  onToggleDone: func.isRequired,
  todo: shape({
    done: bool.isRequired,
    text: string.isRequired
  }).isRequired
};

export default Todo;
