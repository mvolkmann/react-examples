const initialState = {
  counter: 0,
  delta: 1
};

// In this example, all reducer functions are in one file,
// but we could mix in functions from other files here.
const functions = {
  decrement(state) {
    const {counter, delta} = state;
    return {counter: counter - delta};
  },
  deltaChange(state, delta) {
    return {delta};
  },
  increment(state) {
    const {counter, delta} = state;
    return {counter: counter + delta};
  }
};

function reducer(state, action) {
  const {payload, type} = action;
  if (type === '@@redux/INIT') return initialState;

  const fn = functions[type];
  if (!fn) {
    console.error(`unsupported action type "${type}"`);
  }
  const changes = fn ? fn(state, payload) : state;
  return {...state, ...changes};
}

export default reducer;
