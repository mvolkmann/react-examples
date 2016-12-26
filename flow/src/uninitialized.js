// @flow

function getLastInitial(person) {
  const {lastName} = person;
  return lastName ? lastName[0] : '';
}

const person = {
  firstName: 'Richard',
  middleName: 'Mark',
  lastName: 'Volkmann'
};
console.log(getLastInitial(person));

let p;
console.log(getLastInitial(p)); // error
