// @flow

type PrimitiveType = boolean | number | string;
let value: PrimitiveType = true;
value = 7;
value = 'foo';
value = {};
console.log('value =', value);
console.log('typeof value =', typeof value);

type AnimalType = {name: string, type: 'animal'};
type MineralType = {name: string, type: 'mineral'};
type VegetableType = {name: string, type: 'vegetable'};
type ThingType = AnimalType | MineralType | VegetableType;

const dog:AnimalType = {name: 'Dasher', type: 'animal'};
const mineral:MineralType = {name: 'amethyst', type: 'mineral'};
const vegetable:VegetableType = {name: 'corn', type: 'vegetable'};

let thing:ThingType = dog;
console.log(thing.name);
thing = mineral;
console.log(thing.name);
thing = vegetable;
console.log(thing.name);
//thing = {name: 'bad', type: 'other'}; // incompatable
