import {Component, FORM_DIRECTIVES, Input, Output, EventEmitter} from 'angular2/angular2';

export interface ITodo {
  id:number;
  text:string;
  done:boolean;
}

@Component({
  selector: 'todo',
  template: `
  <li>
    <input type="checkbox"
      [checked]="todo.done"
      (change)="toggleDone()"/>
    <span [ng-class]="'done-' + todo.done">{{todo.text}}</span>
    <button (click)="deleteTodo()">Delete</button>
  </li>
  `,
  directives: [FORM_DIRECTIVES]
})
export class TodoCmp {
  @Input() todo:ITodo;
  @Output() onDeleteTodo:EventEmitter<number> = new EventEmitter<number>();
  @Output() onToggleDone:EventEmitter<ITodo> = new EventEmitter<ITodo>();

  toggleDone():void {
    this.onToggleDone.next(this.todo);
  }

  deleteTodo():void {
    this.onDeleteTodo.next(this.todo.id);
  }
}
