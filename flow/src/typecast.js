// @flow

// Values can only be typecast to a less specific type.

const n: number = 19;
//const s = (n: string); // error
//const a = (n: any); // works
const a: any = n; // works
console.log('a =', a);

const s = (a: string); // works, but stupid
console.log('s =', s); // 19
console.log('typeof s =', typeof s); // number

class Animal {}
class Dog extends Animal {}

const dog = new Dog();
const animal: Animal = dog;
console.log('animal =', animal);

// See variance1.js for an example of "casting through any".
