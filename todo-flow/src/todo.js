// @flow
import React from 'react'; //eslint-disable-line

// See https://flowtype.org/docs/type-aliases.html
type EventHandler = (event: Event) => void;
type TodoObj = {id: number, text: string, done: boolean};
type todoProps = {
  onDeleteTodo: EventHandler,
  onToggleDone: EventHandler,
  todo: TodoObj
};
// A props object is passed to this function and destructured.
const Todo = ({onDeleteTodo, onToggleDone, todo}: todoProps) =>
  <li>
    <input type="checkbox"
      checked={todo.done}
      onChange={onToggleDone}/>
    {/* toString is needed on the next line to make Flow happy */}
    <span className={'done-' + todo.done.toString()}>{todo.text}</span>
    <button onClick={onDeleteTodo}>Delete</button>
  </li>;

//const {func, object} = React.PropTypes;
const {bool, func, shape, string} = React.PropTypes;
Todo.propTypes = {
  //todo: object.isRequired,
  todo: shape({
    done: bool.isRequired,
    text: string.isRequired
  }).isRequired,
  onDeleteTodo: func.isRequired,
  onToggleDone: func.isRequired
};

export default Todo;
