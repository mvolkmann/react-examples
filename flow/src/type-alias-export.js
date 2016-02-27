// @flow

type Named = {name: string};

export function sayHello(thing: Named) {
  console.log('Hello, ' + thing.name + '!');
}

const me: Named = {name: 'Mark', hobby: 'running'};
sayHello(me);
