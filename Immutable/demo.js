import Immutable from 'immutable';

let person = Immutable.fromJS({
  name: 'Moe Howard',
  address: {
    street: '123 Some Street',
    city: 'Somewhere',
    state: 'MO',
    zip: 12345
  }
});

/*
person = person.set('name', 'Larry Fine');
person = person.setIn(['address', 'city'], 'Los Angeles');
console.log('name =', person.get('name'));
console.log('city =', person.getIn(['address', 'city']));
person = person.deleteIn(['address', 'street']);
person = person.updateIn(['address', 'zip'], zip => zip + 1);
*/
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
