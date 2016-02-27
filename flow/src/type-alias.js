// @flow

type Person = {
  name: string,
  birthday: Date,
  spouse?: Person
};

const tami: Person = {
  name: 'Tami',
  birthday: new Date(1961, 8, 9),
  height: 65
};

const mark: Person = {
  name: 'Mark',
  birthday: new Date(1961, 3, 16),
  height: 74,
  spouse: tami
};

tami.spouse = mark;

function dumpPerson(person: Person) {
  const status = person.spouse ? 'married to ' + person.spouse.name : 'single';
  console.log(person.name + ' is ' + status + '.');
}

dumpPerson(mark);
dumpPerson(new Date());
