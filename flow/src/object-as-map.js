// @flow

type PlayerToNumberMapType = {
  [player: string]: number
};

const playerToNumberMap: PlayerToNumberMapType = {
  'Mario Lemieux': 66,
  'Wayne Gretzky': 99
};

Object.keys(playerToNumberMap).forEach(player => {
  const number = playerToNumberMap[player];
  console.log(`${player} is number ${number}`);
});
