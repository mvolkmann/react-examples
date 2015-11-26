import {Component, FORM_DIRECTIVES} from 'angular2/angular2';
import {TodoCmp, ITodo} from "./todoCmp";

interface IState {
  todos?:ITodo[];
  todoText?:string;
}

@Component({
  selector: 'todo-list',
  template: `<div>
    <h2>To Do List</h2>
    <div>
      {{uncompletedCount}} of {{state.todos.length}} remaining
      <button (click)="onArchiveCompleted()">Archive Completed</button>
    </div>
    <br/>
    <form>
      <input type="text" size="30" autoFocus
        placeholder="enter new todo here"
        [ng-model]="state.todoText"
        (input)="onChange('todoText', $event)"/>
      <button [disabled]="!state.todoText" (click)="onAddTodo()">Add</button>
    </form>
    <ul class="unstyled">
      <todo *ng-for="#todo of state.todos" [todo]="todo"
        (on-delete-todo)="onDeleteTodo($event)"
        (on-toggle-done)="onToggleDone($event)"></todo>
    </ul>
  </div>`,
  directives: [FORM_DIRECTIVES, TodoCmp]
})
export class TodoListCmp {
  private state:IState;
  private static lastId:number = 0;

  constructor() {
    this.state = {
      todos: [
        TodoListCmp.createTodo('learn Angular 2', true),
        TodoListCmp.createTodo('build an Angular 2 app')
      ]
    };
  }

  static createTodo(text:string, done:boolean = false):ITodo {
    return {id: ++TodoListCmp.lastId, text, done};
  }

  get uncompletedCount():number {
    return this.state.todos.reduce(
      (count:number, todo:ITodo) => todo.done ? count : count + 1,
      0);
  }

  onAddTodo():void {
    const newTodo:ITodo = TodoListCmp.createTodo(this.state.todoText);
    this.state.todoText = '';
    this.state.todos = this.state.todos.concat(newTodo);
  }

  onArchiveCompleted():void {
    this.state.todos = this.state.todos.filter((t:ITodo) => !t.done);
  }

  onChange(name:string, event:Event):void {
    this.state[name] = (<HTMLInputElement>event.target).value;
  }

  onDeleteTodo(todoId:number):void {
    this.state.todos = this.state.todos.filter(
      (t:ITodo) => t.id !== todoId);
  }

  onToggleDone(todo:ITodo):void {
    const id:number = todo.id;
    this.state.todos = this.state.todos.map(
      (t:ITodo) => t.id === id ?
        {id, text: todo.text, done: !todo.done} :
        t);
  }
}
