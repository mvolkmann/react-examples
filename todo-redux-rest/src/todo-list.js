import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';
//import 'fetch';
require('whatwg-fetch');
import {createStore} from 'redux';
import rootReducer from './reducer';

class TodoList extends React.Component {
  getUncompletedCount(todos) {
    return todos.reduce(
      (count, todo) => todo.done ? count : count + 1,
      0);
  }

  onAddTodo(event) {
    // Prevent form submission which refreshes page.
    event.preventDefault();

    const text = store.getState().get('text');

    // Update server-side model.
    fetch('/todos', {method: 'post', body: text}).
    then(res => res.text()).
    then(resourceUrl => {
      // Get the assigned id from the response.
      const index = resourceUrl.lastIndexOf('/');
      const _id = resourceUrl.substring(index + 1);

      // Update client-side model.
      store.dispatch({type: 'addTodo', payload: {_id, text}});
    }).
    catch(res =>
      console.error('onAddTodo error:', res));
  }

  onArchiveCompleted() {
    // Update server-side model.
    fetch('/todos/archive', {method: 'post'}).
    then(() => {
      // Update client-side model.
      store.dispatch({type: 'archiveCompleted'});
    }).
    catch(res =>
      console.error('onArchiveCompleted error:', res));
  }

  onChange(name, event) {
    // Update client-side model.
    store.dispatch({type: 'textChange', payload: {text: event.target.value}});
  }

  onDeleteTodo(todoId) {
    // Update server-side model.
    fetch('/todos/' + todoId, {method: 'delete'}).
    then(() => {
      // Update client-side model.
      store.dispatch({type: 'deleteTodo', payload: {id: todoId}});
    }).
    catch(res =>
      console.error('onDeleteTodo error:', res));
  }

  onToggleDone(todoId) {
    // Update server-side model.
    fetch('/todos/' + todoId + '/archive', {method: 'post'}).
    then(() => {
      // Update client-side model.
      store.dispatch({type: 'toggleDone', payload: {id: todoId}});
    }).
    catch(res =>
      console.error('onToggleDone error:', res));
  }

  render() {
    const state = store.getState();
    const todos = state.get('todos');
    //console.log('todo-list.js render: todos =', todos.toJS());

    const todoElements = todos.map(todo => {
      const _id = todo.get('_id');
      return (
        <Todo key={_id} todo={todo}
          onDeleteTodo={this.onDeleteTodo.bind(this, _id)}
          onToggleDone={this.onToggleDone.bind(this, _id)}/>
      );
    }).valueSeq();

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount(todos)} of {todos.size} remaining
          <button onClick={() => this.onArchiveCompleted()}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={state.get('text')}
            onChange={e => this.onChange('todoText', e)}/>
          <button disabled={!state.get('text')}
            onClick={event => this.onAddTodo(event)}>
            Add
          </button>
        </form>
        <ul className="unstyled">{todoElements}</ul>
      </div>
    );
  }
}

function render() {
  ReactDOM.render(<TodoList/>, document.getElementById('container'));
}

const store = createStore(rootReducer);
store.subscribe(render);

fetch('todos').
  then(res => res.json()). // returns a Promise
  then(todos => {
    store.dispatch({type: 'setTodos', payload: todos});
    // This will trigger an event to which the store is subscribed
    // which will call the render function.
  }).
  catch(res => console.error(res));
