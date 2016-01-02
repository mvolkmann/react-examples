// These files use the convention that variables
// referring to immutable objects begin with "i".
const axios = require('axios');
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducer';
import {createStore} from 'redux';
import TodoHeader from './todo-header';
import TodoList from './todo-list';
import './todo.css';

function handleError(msg, res) {
  store.dispatch({
    type: 'error',
    payload: msg + ': ' + res.data
  });
}

class TodoApp extends React.Component {
  constructor() {
    super();

    // Prebind some event handling methods because this is
    // more effcient than doing it in every call to the render method.
    this.onArchiveCompleted = this.onArchiveCompleted.bind(this);
    this.onDeleteTodo = this.onDeleteTodo.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
  }

  onAddTodo(event) {
    // Prevent form submission which refreshes page.
    event.preventDefault();

    const text = store.getState().get('text');

    // Update server-side model.
    axios.post('/todos', text, {headers: {'Content-Type': 'text/plain'}}).
      then(res => {
        const resourceUrl = res.data;
        // Get the assigned id from the response.
        const index = resourceUrl.lastIndexOf('/');
        const _id = resourceUrl.substring(index + 1);

        // Update client-side model.
        store.dispatch({type: 'addTodo', payload: {_id, text}});
      }).
      catch(res => handleError('Error adding todo', res));
  }

  onArchiveCompleted() {
    // Update server-side model.
    axios.post('/todos/archive').
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'archiveCompleted'});
      }).
      catch(res => handleError('Error archiving todos', res));
  }

  onChange(name, event) {
    // Update client-side model.
    store.dispatch({type: 'textChange', payload: {text: event.target.value}});
  }

  onDeleteTodo(todoId) {
    // Update server-side model.
    axios.delete('/todos/' + todoId).
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'deleteTodo', payload: {_id: todoId}});
      }).
      catch(res => handleError('Error deleting todo', res));
  }

  onToggleDone(todo) {
    todo = todo.toJS();
    // Update server-side model.
    // The Fetch API doesn't support PATCH requests, but axios does!
    axios.patch('/todos/' + todo._id, {done: !todo.done}).
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'toggleDone', payload: {_id: todo._id}});
      }).
      catch(res => handleError('Error toggling todo done', res));
  }

  // This component needs to be rendered for every change,
  // so there is no need to write a shouldComponentUpdate method.
  render() {
    console.log('todo-app.js render: entered');
    const iState = store.getState();
    //console.log('todo-app.js render: state =', iState.toJS());
    const iTodos = iState.get('todos');

    return (
      <div>
        <TodoHeader iTodos={iTodos}
          onArchiveCompleted={this.onArchiveCompleted}/>
        <div className="error">{iState.get('error')}</div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={iState.get('text')}
            onChange={e => this.onChange('todoText', e)}/>
          <button disabled={!iState.get('text')}
            onClick={event => this.onAddTodo(event)}>
            Add
          </button>
        </form>

        <TodoList iTodos={iTodos}
          onDeleteTodo={this.onDeleteTodo}
          onToggleDone={this.onToggleDone}/>
      </div>
    );
  }
}

function render() {
  ReactDOM.render(<TodoApp/>, document.getElementById('container'));
}

const store = createStore(rootReducer);
store.subscribe(render);

axios.get('todos').
  then(res => {
    const todos = res.data;
    store.dispatch({type: 'setTodos', payload: todos});
    // This will trigger an event to which the store is subscribed
    // which will call the render function.
  }).
  catch(res => console.error(res));
