// @flow

export type Named = {name: string};

export function sayHello(thing: Named) {
  console.log('Hello, ' + thing.name + '!');
}
