import {Component, Input, Output, EventEmitter} from 'angular2/core';

// Used for type of each item.
export interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'todo',
  template: `
  <li>
    <input type="checkbox"
      [checked]="todo.done"
      (change)="markDone()"/>
    <span [ngClass]="'done-' + todo.done">{{todo.text}}</span>
    <button (click)="deleteItem()">Delete</button>
  </li>`
})
export class TodoCmp {
  // input allows this component to receive initialization values
  // from the containing component
  @Input() todo: ITodo;
  // input allows this component publish values to the containing
  // component
  @Output() onDeleteTodo: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() onToggleDone: EventEmitter<ITodo> =
    new EventEmitter<ITodo>();

  deleteItem(): void {
    this.onDeleteTodo.emit(this.todo.id);
  }

  markDone(): void {
    this.onToggleDone.emit(this.todo);
  }
}
