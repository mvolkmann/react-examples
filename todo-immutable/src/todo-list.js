import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';
import {bindMethods, pam} from './bind';
import './todo.css';

let lastId = 0;
function createTodo(text, done = false) {
  // Immutable Map keys need to be strings.
  return {id: String(++lastId), text, done};
}

class TodoList extends React.Component {
  constructor() {
    super();

    const t1 = createTodo('learn React', true);
    const t2 = createTodo('build a React app');

    // React state must be a plain JS object.
    this.state = {
      data: Immutable.fromJS({
        todoText: '',
        todos: {
          [t1.id]: t1,
          [t2.id]: t2
        }
      })
    };

    // Create bound versions of methods used in event handlers
    // to avoid creating new functions on each render.
    bindMethods(/^on/, this);
    this.onChangeFn = pam(this, this.onChange, 'todoText');
  }

  getUncompletedCount() {
    const data = this.state.data;
    const todos = data.get('todos');
    return todos.count(todo => !todo.get('done'));
  }

  onAddTodo() {
    let data = this.state.data;
    const todo = createTodo(data.get('todoText'));
    const keyPath = ['todos', todo.id];
    data = data.setIn(keyPath, Immutable.fromJS(todo));
    data = data.set('todoText', '');
    this.setState({data});
  }

  onArchiveCompleted() {
    let data = this.state.data;
    let todos = data.get('todos');
    todos = todos.filter(todo => !todo.get('done'));
    data = data.set('todos', todos);
    this.setState({data});
  }

  onChange(name, event) {
    let data = this.state.data;
    data = data.set(name, event.target.value);
    this.setState({data});
  }

  onDeleteTodo(todoId) {
    let data = this.state.data;
    data = data.deleteIn(['todos', todoId]);
    this.setState({data});
  }

  onToggleDone(todo) {
    let data = this.state.data;
    const keyPath = ['todos', todo.get('id'), 'done'];
    data = data.updateIn(keyPath, bool => !bool);
    this.setState({data});
  }

  render() {
    const data = this.state.data;
    const todos = data.get('todos');
    const todoText = data.get('todoText');

    const todoElements = todos.valueSeq().map(todo =>
      <Todo key={todo.get('id')} todo={todo}
        onDeleteTodo={this.onDeleteTodoFn}
        onToggleDone={this.onToggleDoneFn}/>
    );

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount()} of {todos.size} remaining
          <button onClick={this.onArchiveCompletedFn}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={todoText}
            onChange={this.onChangeFn}/>
          <button disabled={!todoText} onClick={this.onAddTodoFn}>
            Add
          </button>
        </form>
        <ul className="unstyled">{todoElements}</ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('container'));
