// These files use the convention that variables
// referring to immutable objects begin with "i".
const axios = require('axios');
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import rootReducer from './reducer';
import {createStore} from 'redux';
//import Perf from 'react-addons-perf';
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
  onAddTodo(event) {
    //Perf.start();

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
    //Perf.start();

    // Update database.
    axios.post('/todos/archive').
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'archiveCompleted'});
      }).
      catch(res => handleError('Error archiving todos', res));
  }

  onDeleteTodo(todoId) {
    //Perf.start();

    // Update database.
    axios.delete('/todos/' + todoId).
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'deleteTodo', payload: {_id: todoId}});
      }).
      catch(res => handleError('Error deleting todo', res));
  }

  onTextChange(event) {
    //Perf.start();

    // Update client-side model.
    store.dispatch({
      type: 'textChange',
      payload: {text: event.target.value}
    });
  }

  onToggleDone(iTodo) {
    //Perf.start();

    const _id = iTodo.get('_id');
    const done = iTodo.get('done') || false;

    // Update database.
    axios.patch('/todos/' + _id, {done: !done}).
      then(() => {
        // Update client-side model.
        store.dispatch({type: 'toggleDone', payload: {_id}});
      }).
      catch(res => handleError('Error toggling todo done', res));
  }

  // This component needs to be rendered for every change,
  // so no need for shouldComponentUpdate method.
  render() {
    console.log('todo-app.js render: entered');
    const iState = store.getState();
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
            onChange={this.onTextChange}/>
          <button disabled={!iState.get('text')}
            onClick={this.onAddTodo}>
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

/*
function logPerf() {
  Perf.stop();
  const measurements = Perf.getLastMeasurements();
  console.log('Inclusive');
  Perf.printInclusive(measurements);
  console.log('Exclusive');
  Perf.printExclusive(measurements);
  console.log('Wasted');
  Perf.printWasted(measurements);
  console.log('DOM');
  Perf.printDOM(measurements);
  // This may be showing that all the components in this app
  // render so fast, even when they don't need to,
  // that shouldComponentUpdate methods are not needed.
}
*/

function render() {
  ReactDOM.render(<TodoApp/>, document.getElementById('content'));
  //logPerf();
}

const store = createStore(rootReducer);
store.subscribe(render);

// Initial hydration of store
axios.get('todos').
  then(res => {
    const todos = res.data;
    store.dispatch({type: 'setTodos', payload: todos});
    // This will trigger an event to which the store is subscribed
    // which will call the render function.
  }).
  catch(res => handleError('Error getting todos', res));
