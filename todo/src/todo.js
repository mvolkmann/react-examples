import React from 'react';
import ReactDOM from 'react-dom';

let lastId = 0;

function createTodo(text, done = false) {
  return {id: ++lastId, text, done};
}

// See info on LinkedStateMixin at
// http://blog.iansinnott.com/...
// managing-state-and-controlled-form-fields-with-react/

// React this.state is similar to Angular $scope.
// React this.props is similar to using Angular directive isolate scope
// "@" properties to get values from HTML attributes of custom directives.

const Todo = props => (
  <li>
    <input type="checkbox"
      checked={props.todo.done}
      onChange={props.toggleDone.bind(null, props.todo)}/>
    <span className={'done-' + props.todo.done}> {props.todo.text}</span>
    <button onClick={props.deleteTodo.bind(null, props.todo.id)}>Delete</button>
  </li>
);

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        createTodo('learn React', true),
        createTodo('build a React app')
      ]
    };

    // Create bound versions of methods used in event handlers
    // to avoid creating new functions on each render.
    this.boundAddTodo = this.addTodo.bind(this);
    this.boundArchiveCompleted = this.archiveCompleted.bind(this);
    this.boundDeleteTodo = this.deleteTodo.bind(this);
    this.boundToggleDone = this.toggleDone.bind(this);
  }

  addTodo(event) {
    event.preventDefault(); // prevents form submission
    const newTodo = createTodo(this.state.todoText);
    this.setState({
      todoText: '',
      todos: this.state.todos.concat(newTodo)
    });
  }

  archiveCompleted() {
    this.setState({
      todos: this.state.todos.filter(t => !t.done)
    });
  }

  deleteTodo(todoId) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== todoId)
    });
  }

  getUncompletedCount() {
    const count = this.state.todos.reduce(
      (count, todo) => todo.done ? count : count + 1, 0);
    return count;
  }

  //TODO: Something like this should be provided by React.Component!
  onChange(name, event) {
    this.setState({[name]: event.target.value});
  }

  toggleDone(todo) {
    const id = todo.id;
    const todos = this.state.todos.map(t =>
      t.id === id ?
        {id, text: todo.text, done: !todo.done} :
        t);
    this.setState({todos});
  }

  render() {
    const lis = this.state.todos.map(todo =>
      <Todo key={todo.id} todo={todo}
        deleteTodo={this.boundDeleteTodo}
        toggleDone={this.boundToggleDone}/>);

    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount()} of {this.state.todos.length} remaining
          <button onClick={this.boundArchiveCompleted}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            value={this.state.todoText}
            onChange={this.onChange.bind(this, 'todoText')}/>
          <button disabled={!this.state.todoText} onClick={this.boundAddTodo}>
            Add
          </button>
        </form>
        <ul className="unstyled">{lis}</ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('container'));
