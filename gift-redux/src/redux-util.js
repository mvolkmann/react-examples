import {createStore} from 'redux';

let store;

export function dispatch(type, payload) {
  store.dispatch({type, payload});
}

export function setupStore(reducer, render) {
  store = createStore(reducer); // eslint-disable-line no-var
  store.subscribe(render);
  return store;
}
