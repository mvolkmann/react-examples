import React from 'react';

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

class Todo extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li>
        {/*TODO: Why doesn't the checked state start correctly? */}
        <input type="checkbox"
          checked={todo.done}
          onChange={this.props.toggleTodoDone}/>
        <span className="done-{todo.done}">{todo.text}</span>
        <button onClick={this.props.deleteTodo}>Delete</button>
      </li>
    );
  }
}

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
    const newTodo = createTodo(this.state.todoText);
    this.state.todos.push(newTodo);
    this.setState({todos: this.state.todos});
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

  setTodoText(event) {
    this.setState({
      todos: this.state.todos,
      todoText: event.target.value
    });
  }

  toggleTodoDone(todo) {
    todo.done = !todo.done;
    this.setState(Object.assign(this.state,
      {todos: this.state.todos}));
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
          <input type="text" size="30"
            value={this.state.todoText} onChange={this.setTodoText}
            placeholder="enter new todo here"/>
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

React.render(<TodoList/>, document.body);
