import Immutable from 'immutable';

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

const groups = ballMap.groupBy(ball => ball.size);
console.log('demo.js: groups =', JSON.stringify(groups));

for (const size of groups.keys()) {
  console.log('size:', size)
  for (const [sport, ball] of groups.get(size)) {
    console.log('  sport:', sport);
  }
}
