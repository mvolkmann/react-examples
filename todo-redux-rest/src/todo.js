import React from 'react'; //eslint-disable-line

class Todo extends React.Component {
  shouldComponentUpdate(nextProps) {
    // This test is easy because iTodo is an Immutable object!
    return nextProps.iTodo !== this.props.iTodo;
  }

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

const PropTypes = React.PropTypes;
Todo.propTypes = {
  iTodo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired
};

export default Todo;
