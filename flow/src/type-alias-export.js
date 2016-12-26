// @flow

export type NamedType = {name: string};

export function sayHello(thing: NamedType) {
  console.log('Hello, ' + thing.name + '!');
}
