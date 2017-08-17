// @flow

type PrimitiveType = boolean | number | string;
let value: PrimitiveType = true;
value = 7;
value = 'foo';
//value = {};
console.log('value =', value);

type AnimalType = {name: string, type: 'animal', legCount: number};
type MineralType = {name: string, type: 'mineral', hardness: number};
type VegetableType = {name: string, type: 'vegetable', color: string};
type ThingType = AnimalType | MineralType | VegetableType;

const dog: AnimalType = {name: 'Dasher', type: 'animal', legCount: 4};
const mineral: MineralType = {name: 'amethyst', type: 'mineral', hardness: 7};
const vegetable: VegetableType = {name: 'corn', type: 'vegetable', color: 'yellow'};

let thing: ThingType = dog;
console.log(thing.name);
thing = mineral;
console.log(thing.name);
thing = vegetable;
console.log(thing.name);
//thing = {name: 'bad', type: 'other'}; // incompatable

function processThing(thing: ThingType) {
  switch (thing.type) {
    case 'animal':
      console.log(
        `${thing.name} is an animal with ${thing.legCount} legs.`);
      break;
    case 'mineral':
      console.log(
        `${thing.name} is a mineral with hardness of ${thing.hardness}.`);
      break;
    case 'vegetable':
      console.log(
        `${thing.name} is a ${thing.color} vegetable.`);
      break;
  }
}

processThing(thing);
