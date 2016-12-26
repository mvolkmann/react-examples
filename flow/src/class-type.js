// @flow

class Animal {}
class Mineral {}
class Vegetable {}

type AMVType = Animal | Mineral | Vegetable;
const alive = false;
const grows = false;
const clazz: Class<AMVType> = alive ? Animal : grows ? Vegetable : Mineral;
const thing: AMVType = new clazz();
console.log(thing);
