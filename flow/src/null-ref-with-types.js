// @flow

type PersonType = {
  firstName: string,
  lastName: string,
  middleName: string
};

function getLastInitial(person: PersonType) {
  const {lastName} = person;
  return lastName ? lastName[0] : '';
}

const person: PersonType = {
  firstName: 'Richard',
  middleName: 'Mark',
  lastName: 'Volkmann'
};
console.log(getLastInitial(person));

let p;
console.log(getLastInitial(p)); // error
