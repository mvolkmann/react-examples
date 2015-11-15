import React from 'react';
import ReactDOM from 'react-dom';
import {bindMethods, pa, pam} from './bind';

let lastId = 0;
function createTodo(text, done = false) {
  return {id: ++lastId, text, done};
}

// props is passed to this function and destructured.
const Todo = ({todo, onToggleDone, onDeleteTodo}) => (
  <li>
    <input type="checkbox"
      checked={todo.done}
      onChange={pa(onToggleDone, todo)}/>
    <span className={'done-' + todo.done}> {todo.text}</span>
    <button onClick={pa(onDeleteTodo, todo.id)}>Delete</button>
  </li>
);

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [
        createTodo('learn React', true),
        createTodo('build a React app')
      ]
    };

    // Create bound versions of methods used in event handlers
    // to avoid creating new functions on each render.
    bindMethods(/^on/, this);
    this.onChangeFn = pam(this, this.onChange, 'todoText');
  }

  getUncompletedCount() {
    return this.state.todos.reduce(
      (count, todo) => todo.done ? count : count + 1,
      0);
  }

  onAddTodo() {
    const newTodo = createTodo(this.state.todoText);
    this.setState({
      todoText: '',
      todos: this.state.todos.concat(newTodo)
    });
  }

  onArchiveCompleted() {
    this.setState({
      todos: this.state.todos.filter(t => !t.done)
    });
  }

  //TODO: Something like this should be provided by React.Component!
  onChange(name, event) {
    this.setState({[name]: event.target.value});
  }

  onDeleteTodo(todoId) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== todoId)
    });
  }

  onToggleDone(todo) {
    const id = todo.id;
    const todos = this.state.todos.map(t =>
      t.id === id ?
        {id, text: todo.text, done: !todo.done} :
        t);
    this.setState({todos});
  }

  render() {
    const todos = this.state.todos.map(todo =>
      <Todo key={todo.id} todo={todo}
        onDeleteTodo={this.onDeleteTodoFn}
        onToggleDone={this.onToggleDoneFn}/>);

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount()} of {this.state.todos.length} remaining
          <button onClick={this.onArchiveCompletedFn}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={this.state.todoText}
            onChange={this.onChangeFn}/>
          <button disabled={!this.state.todoText} onClick={this.onAddTodoFn}>
            Add
          </button>
        </form>
        <ul className="unstyled">{todos}</ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('container'));
