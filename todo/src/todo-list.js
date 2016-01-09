import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';
import './todo.css';

let lastId = 0;

class TodoList extends React.Component {
  constructor() {
    super(); // must call this before accessing "this"

    this.state = {
      todos: [
        TodoList.createTodo('learn React', true),
        TodoList.createTodo('build a React app')
      ]
    };
  }

  static createTodo(text, done = false) {
    return {id: ++lastId, text, done};
  }

  get uncompletedCount() {
    return this.state.todos.reduce(
      (count, todo) => todo.done ? count : count + 1,
      0);
  }

  onAddTodo() {
    const newTodo = TodoList.createTodo(this.state.todoText);
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
        onDeleteTodo={this.onDeleteTodo.bind(this, todo.id)}
        onToggleDone={this.onToggleDone.bind(this, todo)}/>);

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.uncompletedCount} of {this.state.todos.length} remaining
          <button onClick={() => this.onArchiveCompleted()}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={this.state.todoText}
            onChange={e => this.onChange('todoText', e)}/>
          <button disabled={!this.state.todoText}
            onClick={() => this.onAddTodo()}>
            Add
          </button>
        </form>
        <ul className="unstyled">{todos}</ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('container'));
