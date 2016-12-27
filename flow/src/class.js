// @flow

class Person {
  name: string;
  birthday: Date;
  height: number;
  spouse: Person;

  constructor(name: string, birthday: Date, height: number): void {
    this.name = name;
    this.birthday = birthday;
    this.height = height;
  }

  marry(person: Person): void {
    this.spouse = person;
    person.spouse = this;
  }
}

const tami: Person = new Person('Tami', new Date(1961, 8, 9), 65);
const mark: Person = new Person('Mark', new Date(1961, 3, 16), 74);
tami.marry(mark);

function dumpPerson(person: Person): void {
  const status: string = person.spouse ? 'married to ' + person.spouse.name : 'single';
  console.log(person.name + ' is ' + status + '.');
}

dumpPerson(mark);
dumpPerson(new Date());
