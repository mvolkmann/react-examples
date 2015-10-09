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
      onChange={props.toggleTodoDone}/>
    <span className="done-{props.todo.done}"> {props.todo.text}</span>
    <button onClick={props.deleteTodo}>Delete</button>
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
  }

  addTodo(event) {
    event.preventDefault(); // prevents form submission
    const todoText = this.refs.textInput.value;
    const newTodo = createTodo(todoText);
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

  toggleTodoDone(todo) {
    todo.done = !todo.done; //TODO: directly modifying state?
    this.setState({todos: this.state.todos});
  }

  render() {
    return (
      <div>
        <h2>To Do List</h2>
        <div>
          {this.getUncompletedCount()} of {this.state.todos.length} remaining
          <button onClick={this.archiveCompleted.bind(this)}>
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <input ref="textInput" type="text" size="30"
            value={this.state.todoText}
            placeholder="enter new todo here"/>
          {/*TODO: Disable this button if no text has be entered. */}
          <button onClick={this.addTodo.bind(this)}>
            Add
          </button>
        </form>
        <ul className="unstyled">
          {
            this.state.todos.map(todo =>
              <Todo key={todo.id} todo={todo}
                deleteTodo={this.deleteTodo.bind(this, todo.id)}
                toggleTodoDone={this.toggleTodoDone.bind(this, todo)}/>
            )
          }
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('container'));
