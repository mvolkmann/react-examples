import {bool, shape, string} from 'prop-types';
import React from 'react'; //eslint-disable-line
import {dispatchFilter, dispatchMap} from 'redux-easy';

function onDeleteTodo(todoId) {
  dispatchFilter('todos', todo => todo.id !== todoId);
}

function onToggleDone(todo) {
  const id = todo.id;
  dispatchMap(
    'todos',
    t => (t.id === id ? {id, text: todo.text, done: !todo.done} : t)
  );
}

// A props object is passed to this function and destructured.
const Todo = ({todo}) => (
  <li>
    <input
      type="checkbox"
      checked={todo.done}
      onChange={() => onToggleDone(todo)}
    />
    <span className={'done-' + todo.done}>{todo.text}</span>
    <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
  </li>
);

Todo.propTypes = {
  todo: shape({
    done: bool.isRequired,
    text: string.isRequired
  }).isRequired
};

export default Todo;
