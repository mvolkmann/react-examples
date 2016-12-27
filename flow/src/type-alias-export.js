// @flow

export type NamedType = {name: string};

export function sayHello(thing: NamedType): void {
  console.log('Hello, ' + thing.name + '!');
}
