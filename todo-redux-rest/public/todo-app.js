// These files use the convention that variables
// referring to immutable objects begin with "i".
import autobind from './autobind';
const axios = require('axios');
import React from 'react'; //eslint-disable-line
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
    autobind(this, 'on');
  }

  shouldComponentUpdate() {
    return true; // always re-render this
  }

  componentWillUnmount() {
    //TODO: This will probably never be called, and so isn't needed.
    console.log('todo-app.js componentWillUnmount: unsubscribing');
    store.unsubscribe();
  }

  onAddTodo(event) {
    // Prevent form submission which refreshes page.
    event.preventDefault();

    const text = store.getState().get('text');

    // Update database.
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
    // Update database.
    axios.post('/todos/archive').
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'archiveCompleted'});
      }).
      catch(res => handleError('Error archiving todos', res));
  }

  onDeleteTodo(todoId) {
    // Update database.
    axios.delete('/todos/' + todoId).
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'deleteTodo', payload: {_id: todoId}});
      }).
      catch(res => handleError('Error deleting todo', res));
  }

  onTextChange(event) {
    // Update client-side model.
    store.dispatch({
      type: 'textChange',
      payload: {text: event.target.value}
    });
  }

  onToggleDone(iTodo) {
    const todo = iTodo.toJS();
    // Update database.
    axios.patch('/todos/' + todo._id, {done: !todo.done}).
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'toggleDone', payload: {_id: todo._id}});
      }).
      catch(res => handleError('Error toggling todo done', res));
  }

  // This component needs to be rendered for every change,
  // so no need for shouldComponentUpdate method.
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
        {/*TODO: Consider moving this form to a TodoEntry component. */}
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={iState.get('text')}
            onChange={e => this.onTextChange(e)}/>
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
  ReactDOM.render(<TodoApp/>, document.getElementById('content'));
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
  catch(res => handleError('Error getting todos', res));
