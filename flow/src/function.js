// @flow

type TestFn = (p1: boolean, p2: number, p3: string) => void;

// Perfect match
const f1: TestFn = (a: boolean, b: number, c: string): void => {};
// Missing last parameter and return type - okay
const f2: TestFn = (a: boolean, b: number) => {};
// Missing last two parameters and return type - okay
const f3: TestFn = (a: boolean) => {};
// Missing all parameters and return type - okay
const f4: TestFn = () => {};
// Wrong type for first parameter - error
const f5: TestFn = (a: number) => {};
// Missing return type and returns wrong type - error
const f6: TestFn = (a: boolean, b: number, c: string) => 'bad';
// Wrong return type - error
const f7: TestFn = (a: boolean, b: number, c: string): string => 'bad';

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
