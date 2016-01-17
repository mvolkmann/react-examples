import Immutable from 'immutable';

let numbers = Immutable.fromJS([10, 20, 30]);
console.log('initial value,', numbers);
console.log('at index 1 =', numbers.get(1));
console.log('first =', numbers.first());
console.log('last =', numbers.last());
console.log('has(2) =', numbers.has(2));
console.log('includes(2) =', numbers.includes(2));
console.log('has(20) =', numbers.has(20));
console.log('includes(20) =', numbers.includes(20));
numbers = numbers.push(40);
console.log('after push of 40,', numbers);
numbers = numbers.pop();
console.log('after pop,', numbers);
numbers = numbers.unshift(0);
console.log('after unshift of 0,', numbers);
numbers = numbers.shift();
console.log('after shift,', numbers);
numbers = numbers.set(1, 7);
console.log('after setting index 1 to 7,', numbers);
numbers = numbers.delete(1);
console.log('after deleting value at index 1,', numbers);
numbers = numbers.update(1, n => n * 2);
console.log('after doubling value at index 1,', numbers);
numbers = numbers.splice(1, 0, 20, 30, 40, 50);
console.log('after splice,', numbers);

let people = Immutable.fromJS([
  {name: 'Mark', height: 74, occupation: 'software engineer'},
  {name: 'Tami', height: 64, occupation: 'vet receptionist'}
]);

console.log('people =', people);
console.log("Mark's occupation =", people.getIn([0, 'occupation']));
people = people.setIn([1, 'occupation'], 'retired');
console.log('after setIn,', people);
people = people.deleteIn([1, 'occupation']);
console.log('after deleteIn,', people);
people = people.updateIn([1, 'height'], height => height + 1);
console.log('after updateIn', people);

// Lists are iterable!
for (const person of people) {
  console.log(person);
}

let person = Immutable.fromJS({
  name: 'Moe Howard',
  address: {
    street: '123 Some Street',
    city: 'Somewhere',
    state: 'MO',
    zip: 12345
  }
});

person = person.set('name', 'Larry Fine');
person = person.setIn(['address', 'city'], 'Los Angeles');
console.log('name =', person.get('name'));
console.log('city =', person.getIn(['address', 'city']));
person = person.deleteIn(['address', 'street']);
person = person.updateIn(['address', 'zip'], zip => zip + 1);

person = person.withMutations(mutPerson =>
  mutPerson.set('name', 'Larry Fine').
    setIn(['address', 'city'], 'Los Angeles').
    deleteIn(['address', 'street']).
    updateIn(['address', 'zip'], zip => zip + 1));
console.log(person.toJS());

const balls = [
  {sport: 'baseball', color: 'white', size: 'medium'},
  {sport: 'basketball', color: 'orange', size: 'large'},
  {sport: 'football', color: 'brown', size: 'large'},
  {sport: 'golf', color: 'white', size: 'small'},
  {sport: 'hockey', color: 'black', size: 'medium'},
  {sport: 'tennis', color: 'yellow', size: 'medium'}
];

const ballMap = Immutable.Map().withMutations(map => {
  for (const ball of balls) {
    map.set(ball.sport, ball);
  }
});

const iter = Immutable.Iterable(['Moe', 'Larry', 'Curly']);
for (const stooge of iter) {
  console.log('stooge =', stooge);
}

for (const sport of ballMap.keys()) {
  console.log('sport =', sport);
}

const groups = ballMap.groupBy(ball => ball.size);
console.log('demo.js: groups =', JSON.stringify(groups));

for (const size of groups.keys()) {
  console.log('size:', size);
  for (const [sport, ball] of groups.get(size)) {
    console.log(sport, 'uses', ball);
  }
}

const numbers = Immutable.Range(100, 199).
  filter(n => n % 7 === 0);
console.log(numbers);

let seq = Immutable.Seq([1, 2, 3]);
const arr = [6, 7, 8];
seq = seq.concat(4, 5, arr);
console.log('concat result', seq);
seq = seq.slice(2, 5);
console.log('slice result', seq);

const result =
  Immutable.Range(1, Infinity). // all positive integers
  filter(n => n % 7 === 0). // all numbers divisible by 7
  take(3). // just first three - 7, 14, 21
  map(n => n * 2). // double them - 14, 28, 42
  reduce((sum, n) => sum + n); // sum them - 84
console.log('result =', result);
