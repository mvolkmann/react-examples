import React from 'react';
import {reduxSetup} from 'redux-easy';
import TodoList, {createTodo} from './todo-list';

const initialState = {
  todos: [createTodo('learn React', true), createTodo('build a React app')],
  todoText: ''
};
reduxSetup({component: <TodoList />, initialState});
