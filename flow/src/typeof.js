// @flow

type NamedType = {name: string};

const mark: NamedType = {name: 'Mark'};

// typeof in Flow gets the type of a given value
// so it can be used as the type of another value.
const tami: typeof mark = {name: 'Tami'};

console.log(mark, tami);
