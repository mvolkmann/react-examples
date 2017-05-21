type OnlyNameType = {| name: string |};
const obj1: OnlyNameType = {name: 'Mark', color: 'yellow'};
const obj2: {|name: string|} = {name: 'Mark', color: 'yellow'};
console.log(obj1, obj2);

/*
Flow catches this error, but not inside Vim ALE!
const foo: {| foo: string |} = {foo: 'Hello', bar: 'World!'};
console.log('exact-objects.js x: foo =', foo);
*/
