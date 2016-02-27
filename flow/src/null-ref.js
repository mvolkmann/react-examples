// @flow

function getLastInitial(person) {
  return person.lastName[0];
}

const person = {
  firstName: 'Richard',
  middleName: 'Mark',
  lastName: 'Volkmann'
};
console.log(getLastInitial(person));

let p;
console.log(getLastInitial(p));

/*
type Person = {
  firstName: string,
  middleName: string,
  lastName: string
};

function getLastInitial(person: Person) {
*/
