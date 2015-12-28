// This file uses the convention that variables
// referring to immutable objects begin with "i".
import Immutable from 'immutable';

// Need fromJS instead of Map here because the JS object
// passed contains a property with an object value.
const iInitialState = Immutable.fromJS(
  {text: '', todos: {}});

const reducers = {
  addTodo(iState, action) {
    const todo = action.payload;

    // The following commented out lines do the same
    // as the call to withMutations after them,
    // but that is more efficient.
    /*
    return iState.
      set('text', '').
      setIn(['todos', todo._id], Immutable.fromJS(todo));
    */
    return iState.withMutations(iS =>
      iS.set('text', ''). // clears input
        delete('error').
        setIn(['todos', todo._id], Immutable.fromJS(todo)));
  },
  archiveCompleted(iState) {
    const iTodos = iState.get('todos');
    return iState.
      delete('error').
      set('todos', iTodos.filter(iTodo => !iTodo.get('done')));
  },
  deleteTodo(iState, action) {
    return iState.
      delete('error').
      deleteIn(['todos', action.payload._id]);
  },
  error(iState, action) {
    return iState.set('error', action.payload);
  },
  setTodos(iState, action) {
    const todoArray = action.payload;
    // todos is an array of todo objects, but we need a map
    // where keys are ids and values are immutable todo objects
    const todoMap = todoArray.reduce(
      (map, todo) => {
        map[todo._id] = Immutable.Map(todo);
        return map;
      },
      {});
    // Unlike Immutable Map, OrderedMap iterates over values in
    // the order they were inserted.  This is important for maintaining
    // the order of todos after have some are deleted or archived.
    return iState.
      delete('error').
      set('todos', Immutable.OrderedMap(todoMap));
  },
  textChange(iState, action) {
    return iState.
      delete('error').
      set('text', action.payload.text);
  },
  toggleDone(iState, action) {
    return iState.
      delete('error').
      updateIn(
        ['todos', action.payload._id, 'done'],
        done => !done);
  }
};

function rootReducer(iState = iInitialState, action) {
  //console.log('reducer.js rootReducer: action =', action);
  const reducer = reducers[action.type];
  return reducer ? reducer(iState, action) : iState;
}

export default rootReducer;
