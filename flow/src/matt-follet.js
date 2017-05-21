// @flow

type Action1Type = {
  type: 'A1',
  payload: {
    name: string
  }
};

type Action2Type = {
  type: 'A2',
  payload: {
    score: number
  }
};

type ActionType = Action1Type | Action2Type;

function processAction(action: ActionType) {
  switch (action.type) {
    case 'A1':
      console.log('name =', action.payload.name);
      //console.log('score =', action.payload.score); // error
      break;
    case 'A2':
      //console.log('name =', action.payload.name); // error
      console.log('score =', action.payload.score);
      break;
    default:
      console.log('unsupported action');
      break;
  }
}

processAction({type: 'A1', payload: {name: 'Matt'}});
processAction({type: 'A2', payload: {score: 100}});
