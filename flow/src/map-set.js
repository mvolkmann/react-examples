// @flow

type PlayerType = {
  name: string,
  number: number,
  position: string
};

const gretzky: PlayerType =
  {name: 'Wayne Gretzky', number: 99, position: 'center'};
const lemieux: PlayerType =
  {name: 'Mario Lemieux', number: 66, position: 'center'};

const players: PlayerType[] = [gretzky, lemieux];
const playerMap: Map<number, PlayerType> = new Map();
const playerSet: Set<PlayerType> = new Set(players);

for (const player of players) {
  playerMap.set(player.number, player);
}

console.log('map-set.js: playerMap =', playerMap);
console.log('map-set.js: playerSet =', playerSet);
