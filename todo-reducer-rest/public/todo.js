// @flow
import React from 'react'; //eslint-disable-line

class Todo extends React.Component {
  /*
  shouldComponentUpdate(nextProps) {
    return this.props.iTodo !== nextProps.iTodo;
  }
  */

  render() {
    console.log('todo.js render: entered');
    const {iTodo, onDeleteTodo, onToggleDone} = this.props;
    const done = iTodo.get('done');
    const text = iTodo.get('text');
    return (
      <li>
        <input type="checkbox"
          checked={done}
          onChange={onToggleDone}/>
        <span className={'done-' + done}>{text}</span>
        <button onClick={onDeleteTodo}>Delete</button>
      </li>
    );
  }
}

const {func, object} = React.PropTypes;
Todo.propTypes = {
  iTodo: object.isRequired,
  onDeleteTodo: func.isRequired,
  onToggleDone: func.isRequired
};

export default Todo;
