// @flow

type PersonType = {
  birthday: Date,
  name: string,
  spouse?: PersonType
};

const tami: PersonType = {
  name: 'Tami',
  birthday: new Date(1961, 8, 9),
  height: 65
};

const mark: PersonType = {
  name: 'Mark',
  birthday: new Date(1961, 3, 16),
  height: 74,
  spouse: tami
};

tami.spouse = mark;

function dumpPerson(person: PersonType): void {
  const status = person.spouse ? 'married to ' + person.spouse.name : 'single';
  console.log(`${person.name} is ${status}.`);
}

dumpPerson(mark);
dumpPerson(new Date()); // error
