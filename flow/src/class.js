// @flow
'use strict';

class Person {
  name: string;
  birthday: Date;
  height: number;
  spouse: Person;

  constructor(name: string, birthday: Date, height: number) {
    this.name = name;
    this.birthday = birthday;
    this.height = height;
  }

  marry(person: Person): void {
    this.spouse = person;
    person.spouse = this;
  }
}

const tami = new Person('Tami', new Date(1961, 8, 9), 65);
const mark = new Person('Mark', new Date(1961, 3, 16), 74);
tami.marry(mark);

function dumpPerson(person: Person) {
  const status = person.spouse ? 'married to ' + person.spouse.name : 'single';
  console.log(person.name + ' is ' + status + '.');
}

dumpPerson(mark);
dumpPerson(new Date());
