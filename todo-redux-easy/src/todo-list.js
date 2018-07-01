import {arrayOf, string} from 'prop-types';
import React, {Component} from 'react';
import {
  dispatchFilter,
  dispatchPush,
  dispatchSet,
  Input,
  watch
} from 'redux-easy';
import Todo from './todo';
import './todo.css';

let lastId = 0;

export const createTodo = (text, done = false) => ({id: ++lastId, text, done});

class TodoList extends Component {
  static propTypes = {
    todos: arrayOf(Todo.propTypes.todo).isRequired,
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
          <Input
            type="text"
            size="30"
            autoFocus
            path="todoText"
            placeholder="enter new todo here"
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
