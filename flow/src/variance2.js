// @flow
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LivingThing = (function () {
    function LivingThing() {
    }
    return LivingThing;
}());
//class Plant extends LivingThing {}
//class Animal extends LivingThing {}
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plant.prototype.growRoots = function () { };
    return Plant;
}(LivingThing));
var Animal = (function (_super) {
    __extends(Animal, _super);
    function Animal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animal.prototype.speak = function () {
        console.log('unknown');
    };
    return Animal;
}(LivingThing));
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.speak = function () {
        console.log('bark');
    };
    return Dog;
}(Animal));
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.speak = function () {
        console.log('meow');
    };
    return Cat;
}(Animal));
var animals = [];
// Adding elements to arrays is covariant (can add subtypes).
animals.push(new Dog());
animals.push(new Cat());
animals.push(new Plant()); // error
// Extracting elements from arrays is contravariant
// (get type of array which is the supertype of the elements)
// eslint-disable prefer-destructuring
var dog = animals[0]; // error
//const dog: Animal = animals[0];
console.log('dog =', dog);
var plant = animals[0]; // error
console.log('plant =', plant);
