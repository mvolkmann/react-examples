import React from 'react'; //eslint-disable-line

// A props object is passed to this function and destructured.
//TODO: Modify this to use shouldComponentUpdate
//TODO: to avoid unnecessary re-rendering.
const Todo = ({onDeleteTodo, onToggleDone, todo}) => {
  const done = todo.get('done');
  const text = todo.get('text');
  return (
    <li>
      <input type="checkbox"
        checked={done}
        onChange={onToggleDone}/>
      <span className={'done-' + done}>{text}</span>
      <button onClick={onDeleteTodo}>Delete</button>
    </li>
  );
};

const PropTypes = React.PropTypes;
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired
};

export default Todo;
