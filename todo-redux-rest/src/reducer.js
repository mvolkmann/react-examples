import Immutable from 'immutable';

// Need fromJS instead of Map here because the JS object
// passed contains a property with an object value.
const initialState = Immutable.fromJS(
  {text: '', todos: {}});

const reducers = {
  addTodo(state, action) {
    const todo = action.payload;

    // The following commented out lines do the same
    // as the call to withMutations after them,
    // but that is more efficient.
    return state.
      set('text', '').
      setIn(['todos', todo._id], Immutable.fromJS(todo));
    /*
    return state.withMutations(s =>
      s.set('text', ''). // clears input
        setIn(['todos', todo.id], Immutable.fromJS(todo)));
    */
  },
  archiveCompleted(state) {
    const todos = state.get('todos');
    return state.set('todos',
      todos.filter(todo => !todo.get('done')));
  },
  deleteTodo(state, action) {
    return state.deleteIn(['todos', action.payload.id]);
  },
  setTodos(state, action) {
    const todoArray = action.payload;
    // todos is an array of todo objects, but we need a map
    // where keys are ids and values are todo objects
    const todoMap = todoArray.reduce(
      (map, todo) => {
        map[todo._id] = todo;
        return map;
      },
      {});
    //console.log('reducer.js setTodos: todoMap =', todoMap);
    return state.set('todos', Immutable.fromJS(todoMap));
  },
  textChange(state, action) {
    return state.set('text', action.payload.text);
  },
  toggleDone(state, action) {
    return state.updateIn(
      ['todos', action.payload.id, 'done'],
      done => !done);
  }
};

function rootReducer(oldState = initialState, action) {
  console.log('reducer.js rootReducer: action =', action);
  const reducer = reducers[action.type];
  const newState = reducer ? reducer(oldState, action) : oldState;
  //console.log('reducer.js rootReducer: newState =', newState);
  return newState;
}

export default rootReducer;
