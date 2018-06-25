import React from 'react'; //eslint-disable-line
import {bool, func, shape, string} from 'prop-types';

// A props object is passed to this function and destructured.
const Todo = ({onDeleteTodo, onToggleDone, todo}) => (
  <li>
    <input type="checkbox" checked={todo.done} onChange={onToggleDone} />
    <span className={'done-' + todo.done}>{todo.text}</span>
    <button onClick={onDeleteTodo}>Delete</button>
  </li>
);

Todo.propTypes = {
  onDeleteTodo: func.isRequired,
  onToggleDone: func.isRequired,
  todo: shape({
    done: bool.isRequired,
    text: string.isRequired
  }).isRequired
};

export default Todo;
