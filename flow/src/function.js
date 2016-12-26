// @flow
/* eslint arrow-parens: 0, no-unused-vars: 0 */
// The arrow-parens rule is disabled because parens are required
// when Flow types are added to arrow function parameters.

type TestFnType = (p1: boolean, p2: number, p3: string) => void;

// Perfect match
const f1: TestFnType = (a: boolean, b: number, c: string): void => {};
// Missing last parameter and return type - okay
const f2: TestFnType = (a: boolean, b: number) => {};
// Missing last two parameters and return type - okay
const f3: TestFnType = (a: boolean) => {};
// Missing all parameters and return type - okay
const f4: TestFnType = () => {};
// Wrong type for first parameter - error
const f5: TestFnType = (a: number) => {}; // error
// Missing return type and returns wrong type - error
const f6: TestFnType = (a: boolean, b: number, c: string) => 'bad'; // error
// Wrong return type - error
const f7: TestFnType =
  (a: boolean, b: number, c: string): string => 'bad'; // error

/*
type Callback = (err: ?Error, result: string) => void;
const cb: Callback = err => console.log('in cb');

function doAsyncThing(blow: boolean, cb: Callback) {
  setTimeout(
    () => {
      const err = blow ? new Error('bam!') : null;
      cb(err, 7);
    },
    1000);
}

doAsyncThing(true, (err, result) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('result =', result);
  }
});

doAsyncThing(false, oneParam => { return 7; });

doAsyncThing(false, oneParam => {
  console.log('in callback');
});
*/
