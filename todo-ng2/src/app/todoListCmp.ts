import 'angular2/bundles/angular2-polyfills';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {TodoCmp, ITodo} from './todoCmp';

// Used for type of state property in TodoListCmp class. Both
// values are optional.
interface IState {
  todos?: ITodo[];
  todoText?: string;
}

// This syntax is called a Decorator and is similar to Annotations
// in other languages. Decorators are under consideration to be
// included in ES2016. The Component decorator indicates that
// TodoListCmp is a reusable UI building block.
@Component({
  directives: [TodoCmp], // other components used here
  selector: 'todo-list', // TodoListCmp's html element selector
  // defining the html inline (or templateUrl for external)
  template: `
      <div>
        <h2>To Do List</h2>
        <div>
          {{uncompletedCount}} of
          {{state.todos.length}} remaining
          <!--clicking the button invokes the component method-->
          <button (click)="onArchiveCompleted()">
            Archive Completed
          </button>
        </div>
        <br/>
        <form>
          <!--[ngModel] tells where to get the value-->
          <!--(input) tells what to do on value change-->
          <input type="text" size="30" autoFocus
            placeholder="enter new todo here"
            [ngModel]="state.todoText"
            (input)="onChange($event.target.value)"/>
          <!--[disabled] sets the html attribute by state-->
          <button [disabled]="!state.todoText"
          (click)="onAddTodo()">Add</button>
        </form>
        <ul class="unstyled">
          <!--uses a for loop to generate TodoCmps-->
          <!--#todo defines a variable to use within the loop-->
          <!--[todo] sets a property on each TodoCmp-->
          <!--(onDeleteTodo) and (onToggleDone) are outputs from-->
          <!--the TodoCmp, and they call functions on TodoListCmp-->
          <!--with emitted values-->
          <!--deleteTodo receives a type of number"-->
          <!--toggleDone receives a type of ITodo"-->
          <todo *ngFor="#todo of state.todos" [todo]="todo"
          (onDeleteTodo)="deleteTodo($event)"
          (onToggleDone)="toggleDone($event)"></todo>
        </ul>
      </div>`
})
export class TodoListCmp {
  private static lastId: number = 0;
  private state: IState;

  constructor() {
    this.state = {
      todos: [
        TodoListCmp.createTodo('learn Angular', true),
        TodoListCmp.createTodo('build an Angular app')
      ]
    };
  }

  static createTodo(text: string, done: boolean = false): ITodo {
    return {id: ++TodoListCmp.lastId, text, done};
  }

  get uncompletedCount(): number {
    return this.state.todos.reduce(
      (count: number, todo: ITodo) =>
        todo.done ? count : count + 1, 0);
  }

  onAddTodo(): void {
    const newTodo: ITodo =
      TodoListCmp.createTodo(this.state.todoText);
    this.state.todoText = '';
    this.state.todos = this.state.todos.concat(newTodo);
  }

  onArchiveCompleted(): void {
    this.state.todos =
      this.state.todos.filter((t: ITodo) => !t.done);
  }

  onChange(newText: string): void {
    this.state.todoText = newText;
  }

  deleteTodo(todoId: number): void {
    this.state.todos =
      this.state.todos.filter((t: ITodo) => t.id !== todoId);
  }

  toggleDone(todo: ITodo): void {
    const id: number = todo.id;
    this.state.todos =
      this.state.todos.map((t: ITodo) => t.id === id ?
      {id, text: todo.text, done: !todo.done} : t);
  }

} // end of TodoListCmp class


// Each Angular app needs a bootstrap call to specify explicitly the root component.
// In larger apps, bootstrapping usually is in a separate file with more configuration.
bootstrap(TodoListCmp);
