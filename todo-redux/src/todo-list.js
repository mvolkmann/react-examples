import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';
import {createStore} from 'redux';
import rootReducer from './reducer';
import './todo.css';

class TodoList extends React.Component {
  constructor() {
    super(); // must call this before accessing "this"

    // Pre-bind event handling methods.
    this.onArchiveCompleted = this.onArchiveCompleted.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  getUncompletedCount(todos) {
    return todos.reduce(
      (count, todo) => todo.done ? count : count + 1,
      0);
  }

  onAddTodo(event) {
    store.dispatch({type: 'addTodo'});
    // Prevent form submission which refreshes page.
    event.preventDefault();
  }

  onArchiveCompleted() {
    store.dispatch({type: 'archiveCompleted'});
  }

  onTextChange(event) {
    store.dispatch({type: 'textChange', payload: {text: event.target.value}});
  }

  onDeleteTodo(todoId) {
    store.dispatch({type: 'deleteTodo', payload: {id: todoId}});
  }

  onToggleDone(todoId) {
    store.dispatch({type: 'toggleDone', payload: {id: todoId}});
  }

  render() {
    const state = store.getState();
    const todos = state.get('todos');

    const todoElements = todos.map(todo => {
      const id = todo.get('id');
      return (
        <Todo key={id} todo={todo}
          onDeleteTodo={this.onDeleteTodo.bind(this, id)}
          onToggleDone={this.onToggleDone.bind(this, id)}/>
      );
    }).valueSeq();

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount(todos)} of {todos.size} remaining
          <button onClick={this.onArchiveCompleted}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={state.get('text')}
            onChange={this.onTextChange}/>
          <button disabled={!state.get('text')}
            onClick={this.onAddTodo}>
            Add
          </button>
        </form>
        <ul className="unstyled">{todoElements}</ul>
      </div>
    );
  }
}

function render() {
  console.log('todo-list.js render: entered');
  ReactDOM.render(<TodoList/>, document.getElementById('container'));
}

const store = createStore(rootReducer);
store.subscribe(render);
render();
