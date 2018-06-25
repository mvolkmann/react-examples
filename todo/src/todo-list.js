import React, {Component} from 'react';
import Todo from './todo';
import './todo.css';

let lastId = 0;

const createTodo = (text, done = false) => ({id: ++lastId, text, done});

class TodoList extends Component {
  state = {
    todoText: '',
    todos: [createTodo('learn React', true), createTodo('build a React app')]
  };

  get uncompletedCount() {
    return this.state.todos.filter(todo => !todo.done).length;
  }

  onAddTodo = () =>
    this.setState(state => ({
      todoText: '',
      todos: state.todos.concat(createTodo(state.todoText))
    }));

  onArchiveCompleted = () =>
    this.setState(state => ({
      todos: this.state.todos.filter(t => !t.done)
    }));

  onDeleteTodo = todoId =>
    this.setState(state => ({
      todos: this.state.todos.filter(t => t.id !== todoId)
    }));

  onTextChange = event => this.setState({todoText: event.target.value});

  onToggleDone = todo =>
    this.setState(state => {
      const id = todo.id;
      const todos = state.todos.map(
        t => (t.id === id ? {id, text: todo.text, done: !todo.done} : t)
      );
      return {todos};
    });

  render() {
    const {todos, todoText} = this.state;
    const todoElements = todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onDeleteTodo={() => this.onDeleteTodo(todo.id)}
        onToggleDone={() => this.onToggleDone(todo)}
      />
    ));

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.uncompletedCount} of {todos.length} remaining
          <button onClick={this.onArchiveCompleted}>Archive Completed</button>
        </div>
        <br />
        <form>
          <input
            type="text"
            size="30"
            autoFocus
            placeholder="enter new todo here"
            value={todoText}
            onChange={this.onTextChange}
          />
          <button disabled={!todoText} onClick={this.onAddTodo}>
            Add
          </button>
        </form>
        <ul className="unstyled">{todoElements}</ul>
      </div>
    );
  }
}

export default TodoList;
