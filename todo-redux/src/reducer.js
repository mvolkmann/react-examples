import Immutable from 'immutable';

// Need fromJS instead of Map here because the JS object
// passed contains a property with an object value.
const initialState = Immutable.fromJS(
  {lastId: 0, text: '', todos: {}});

const reducers = {
  addTodo(state) {
    const id = state.get('lastId') + 1;
    const text = state.get('text');
    const todo = Immutable.Map({id, text});

    // The following commented out lines do the same
    // as the call to withMutations after them,
    // but that is more efficient.
    //state = state.set('lastId', id);
    //state = state.set('text', '');
    //return state.setIn(['todos', id], todo);
    return state.withMutations(s =>
      s.set('lastId', id).
        set('text', ''). // clears input
        setIn(['todos', id], todo));
  },
  archiveCompleted(state) {
    const todos = state.get('todos');
    return state.set('todos',
      todos.filter(todo => !todo.get('done')));
  },
  deleteTodo(state, action) {
    return state.deleteIn(['todos', action.payload.id]);
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

function rootReducer(state = initialState, action) {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
}

export default rootReducer;
