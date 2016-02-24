// @flow
// These files use the convention that variables
// referring to immutable objects begin with "i".
import autobind from './autobind';
const axios = require('axios');
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import reducer from './reducer';
import TodoHeader from './todo-header';
import TodoList from './todo-list';
import './todo.css';

type State = {iState: Object};

class TodoApp extends React.Component {
  state: State; //{iState: Object};

  constructor() {
    super();
    autobind(this, 'on');

    // Get the initial state.
    // If state is set to an Immutable collection,
    // calling this.setState will lose its type.
    // For example, an Immutable Map will become a plain Object.
    // To avoid this, make the Immutable collection be
    // a property on the state instead of the state itself.
    this.state = {iState: reducer()};

    // Get current todos.
    axios.get('todos').
      then(res => {
        const todos = res.data;
        // This will update state which will
        // cause the top component to be re-rendered.
        this.dispatch({type: 'setTodos', payload: todos});
      }).
      catch(res => this.handleError('Error getting todos', res));
  }

  /*
  shouldComponentUpdate() {
    return true; // always re-render this
  }
  */

  dispatch(action) {
    this.setState(state => ({
      iState: reducer(state.iState, action)
    }));
  }

  handleError(msg, res) {
    this.dispatch({
      type: 'error',
      payload: res.data ? msg + ': ' + res.data :
        res instanceof Error ? res.message :
        res
    });
  }

  onAddTodo(event) {
    // Prevent form submission which refreshes page.
    event.preventDefault();

    const text = this.state.iState.get('text');

    // Update database.
    axios.post('/todos', text, {headers: {'Content-Type': 'text/plain'}}).
      then(res => {
        const resourceUrl = res.data;
        // Get the assigned id from the response.
        const index = resourceUrl.lastIndexOf('/');
        const _id = resourceUrl.substring(index + 1);

        // Update client-side model.
        this.dispatch({type: 'addTodo', payload: {_id, text}});
      }).
      catch(res => this.handleError('Error adding todo', res));
  }

  onArchiveCompleted() {
    // Update database.
    axios.post('/todos/archive').
      then(() => {
        // Update client-side model.
        this.dispatch({type: 'archiveCompleted'});
      }).
      catch(res => this.handleError('Error archiving todos', res));
  }

  onDeleteTodo(todoId) {
    // Update database.
    axios.delete('/todos/' + todoId).
      then(() => {
        // Update client-side model.
        this.dispatch({type: 'deleteTodo', payload: {_id: todoId}});
      }).
      catch(res => this.handleError('Error deleting todo', res));
  }

  onTextChange(event) {
    // Update client-side model.
    this.dispatch({
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
        this.dispatch({type: 'toggleDone', payload: {_id: todo._id}});
      }).
      catch(res => this.handleError('Error toggling todo done', res));
  }

  // This component needs to be rendered for every change,
  // so no need for shouldComponentUpdate method.
  render() {
    console.log('todo-app.js render: entered');
    const iState = this.state.iState;
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

ReactDOM.render(<TodoApp/>, document.getElementById('content'));
