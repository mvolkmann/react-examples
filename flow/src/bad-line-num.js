// @flow

function getLastInitial(person) {
  return person.lastName[0];
}

// Error message is about line inside function above, not this line.
console.log(getLastInitial('foo'));
