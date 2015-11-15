import React from 'react'; //eslint-disable-line
import {pa} from './bind';

// props is passed to this function and destructured.
const Todo = ({todo, onToggleDone, onDeleteTodo}) => (
  <li>
    <input type="checkbox"
      checked={todo.get('done')}
      onChange={pa(onToggleDone, todo)}/>
    <span className={'done-' + todo.done}> {todo.get('text')}</span>
    <button onClick={pa(onDeleteTodo, todo.get('id'))}>Delete</button>
  </li>
);

export default Todo;
