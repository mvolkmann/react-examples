// @flow

// TypeScript relies on duck typing rather than the class hierarchy.
// It views all these classes as equivalent because
// they do not differ in properties or methods.
class LivingThing {}
class Plant extends LivingThing {}
class Animal extends LivingThing {}
class Dog extends Animal {}
class Cat extends Animal {}

const animals: Animal[] = [];
// In Flow, adding elements to arrays is covariant (can add subtypes).
animals.push(new Dog());
animals.push(new Cat());
//animals.push(new Plant()); // error in Flow, but not TS

// In Flow, extracting elements from arrays is contravariant
// (get type of array which is the supertype of the elements)
//const dog: Dog = animals[0]; // error in Flow, but not TS

/* eslint-disable prefer-destructuring */
const dog: Animal = animals[0]; // works
console.log('dog =', dog);

// Typecasting to any and then to Dog works.
const dogTypecast: Dog = ((animals[0]: any): Dog);
console.log('dogTypecast =', dogTypecast);

const plant: Plant = animals[0]; // error in Flow, but not TS
console.log('plant =', plant);
