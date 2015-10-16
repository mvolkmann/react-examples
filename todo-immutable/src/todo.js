import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';

let lastId = 0;
function createTodo(text, done = false) {
  return Map({id: ++lastId, text, done});
}

const Todo = props => (
  <li>
    <input type="checkbox"
      checked={props.todo.done}
      onChange={props.toggleDone.bind(null, props.todo)}/>
    <span className={'done-' + props.todo.done}> {props.todo.text}</span>
    <button onClick={props.deleteTodo.bind(null, props.todo.id)}>Delete</button>
  </li>
);

class TodoList extends React.Component {
  constructor() {
    super();

    const t1 = createTodo('learn React', true);
    const t2 = createTodo('build a React app');
    // React state must be a plain JS object.
    this.state = {
      data: Map({
        todos: Map({
          [t1.id]: t1,
          [t2.id]: t2
        })
      })
    };

    // Create bound versions of methods used in event handlers
    // to avoid creating new functions on each render.
    this.boundAddTodo = this.addTodo.bind(this);
    this.boundArchiveCompleted = this.archiveCompleted.bind(this);
    this.boundDeleteTodo = this.deleteTodo.bind(this);
    this.boundToggleDone = this.toggleDone.bind(this);
  }

  addTodo() {
    const data = this.state.data;
    data.set('todoText', '');
    const newTodo = createTodo(data.todoText);
    data.todos.set(newTodo.id, newTodo);
    this.setState({data});
  }

  archiveCompleted() {
    const data = this.state.data;
    data.todos.filter(todo => !todo.done);
    this.setState({data});
  }

  deleteTodo(todoId) {
    const data = this.state.data;
    data.todos.delete(todoId);
    this.setState({data});
  }

  getUncompletedCount() {
    const data = this.state.data;
    return data.todos.count(todo => !todo.done);
  }

  //TODO: Something like this should be provided by React.Component!
  onChange(name, event) {
    this.setState({[name]: event.target.value});
  }

  toggleDone(todo) {
    todo.set('done', !todo.done);
    this.setState({data: this.state.data});
  }

  render() {
    console.log('todo.js render: this.state =', this.state);
    const todos = this.state.data.todos;
    const lis = todos.map(todo => (
      <Todo key={todo.id} todo={todo}
        deleteTodo={this.boundDeleteTodo}
        toggleDone={this.boundToggleDone}/>
    ));

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount()} of {this.state.todos.length} remaining
          <button onClick={this.boundArchiveCompleted}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={this.state.todoText}
            onChange={this.onChange.bind(this, 'todoText')}/>
          <button disabled={!this.state.todoText} onClick={this.boundAddTodo}>
            Add
          </button>
        </form>
        <ul className="unstyled">{lis}</ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('container'));
