// @flow
/* eslint no-unused-vars: 0 */

// Just demonstrating that Flow is okay with this.
import './demo.css';

function add(n1: number, n2: number): number {
  return n1 + n2;
}

console.log(add(1, 2));

type PersonType = {birthday: Date, name: string, spouse?: PersonType};

const tami: PersonType = {
  name: 'Tami',
  birthday: new Date(1961, 8, 9),
  height: 65
};
const mark: PersonType = {
  name: 'Mark',
  birthday: new Date(1961, 3, 16),
  height: 74,
  spouse: tami
};

type Fn1Type = (purchasedOn: Date, title: string, year: number) => string;
const video = {title: 'Batman', year: 1969, purchasedOn: new Date(2016, 1, 21)};
// eslint-disable-next-line flowtype/no-weak-types
function format(obj: Object, formatter: Fn1Type) { // error
  console.log(formatter(obj.title, obj.year, obj.purchasedOn));
}
format(video, (title: string, year: number, purchasedOn: Date) =>
  `You purchased ${title} from ${year} on ${purchasedOn.toString()}.`);
format(video, (title: number, year: string) =>
  `You purchased ${title} from ${year}.`);
format(video, (title, year) =>
  `You purchased ${title} from ${year}.`);

type Fn2Type = (foo: number, bar: boolean, baz: string) => string;
function testFn(foo: number, bar: boolean): string {
  return 'in testFn';
}
const someFn: Fn2Type = testFn;

// Note the placement of <T> below.
type MyParametricFnType<T> = (p1: T, p2: T) => T;
const add2: MyParametricFnType<*> = // infers number for *
  (p1: number, p2: number): number => p1 + p2;
console.log(add2(2, 3));

type ArrayOfArraysOfNumbersType = Array<Array<number>>;
const aoaon: ArrayOfArraysOfNumbersType = [[1, 2], [3, 4, 5]];
