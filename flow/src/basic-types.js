// @flow

function getChars(text: string, count: number, fromStart: boolean) {
  return fromStart ? text.substring(0, count) : text.substr(-count);
}

console.log(getChars('abcdefg', 3, true)); // good
console.log(getChars('abcdefg', 3, false)); // good
console.log(getChars(3, false, 'foobar')); // bad

/*
console.log(getChars('ab', 3, true));
console.log(getChars('ab', 3, false));
console.log(getChars('', 3, true));
console.log(getChars('', 3, false));
*/
