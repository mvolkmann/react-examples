// @flow

// TypeScript relies on duck typing rather than the class hierarchy.
// It views all classes with the same properties and methods
// as equivalent.
class LivingThing {}
//class Plant extends LivingThing {}
//class Animal extends LivingThing {}
//class Dog extends Animal {}
//class Cat extends Cat {}

// Adding unique methods to these classes enables TypeScript
// to flag errors that it cannot without them.
class Plant extends LivingThing {
  growRoots(): void {}
}
class Animal extends LivingThing {
  speak(): void {
    console.log('unknown');
  }
}
class Dog extends Animal {
  speak(): void {
    console.log('bark');
  }
}
class Cat extends Animal {
  speak(): void {
    console.log('meow');
  }
}

const animals: Animal[] = [];
// Adding elements to arrays is covariant (can add subtypes).
animals.push(new Dog());
animals.push(new Cat());
animals.push(new Plant()); // error

// Extracting elements from arrays is contravariant
// (get type of array which is the supertype of the elements)
// eslint-disable prefer-destructuring
const dog: Dog = animals[0]; // error
//const dog: Animal = animals[0];
console.log('dog =', dog);

const plant: Plant = animals[0]; // error
console.log('plant =', plant);
