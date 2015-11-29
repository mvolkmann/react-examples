import {bootstrap} from 'angular2/angular2';
import {TodoListCmp} from './todoListCmp';

bootstrap(TodoListCmp)
  .then(()=> console.log('Bootstrap success'))
  .catch((error: any) => console.error(error));
