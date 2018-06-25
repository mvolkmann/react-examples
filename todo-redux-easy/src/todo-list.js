import {arrayOf, bool, shape, string} from 'prop-types';
import React from 'react';
import {dispatchFilter, dispatchPush, dispatchSet, watch} from 'redux-easy';
import Todo from './todo';
import './todo.css';

let lastId = 0;

export const createTodo = (text, done = false) => ({id: ++lastId, text, done});

class TodoList extends React.Component {
  static propTypes = {
    todos: arrayOf(
      shape({
        done: bool.isRequired,
        text: string.isRequired
      })
    ).isRequired,
    todoText: string.isRequired
  };

  get uncompletedCount() {
    return this.props.todos.filter(todo => !todo.done).length;
  }

  onAddTodo = () => {
    dispatchPush('todos', createTodo(this.props.todoText));
    dispatchSet('todoText', '');
  };

  onArchiveCompleted = () => dispatchFilter('todos', todo => !todo.done);

  onTextChange = event => dispatchSet('todoText', event.target.value);

  render() {
    const {todos, todoText} = this.props;

    const todoElements = todos.map(todo => <Todo key={todo.id} todo={todo} />);

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

export default watch(TodoList, {todos: '', todoText: ''});