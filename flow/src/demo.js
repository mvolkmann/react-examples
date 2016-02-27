// @flow

// Just demonstrating that Flow is okay with this.
import './demo.css';

function add(n1: number, n2: number): number {
  return n1 + n2;
}

console.log(add(1, 2));

type Person = {name: string, birthday: Date, spouse?: Person};

const tami: Person = {
  name: 'Tami',
  birthday: new Date(1961, 8, 9),
  height: 65
};
const mark: Person = {
  name: 'Mark',
  birthday: new Date(1961, 3, 16),
  height: 74,
  spouse: tami
};

type MyFnType = (title: string, year: number, purchasedOn: Date) => string;
const video = {title: 'Batman', year: 1969, purchasedOn: new Date(2016, 1, 21)};
function format(obj: Object, formatter: MyFnType) {
  console.log(formatter(obj.title, obj.year, obj.purchasedOn));
}
/*
format(video, (title: string, year: number, purchasedOn: Date) =>
  `You purchased ${title} from ${year} on ${purchasedOn}.`);
format(video, (title: number, year: string) =>
  `You purchased ${title} from ${year}.`);
*/
format(video, (title, year) =>
  `You purchased ${title} from ${year}.`);
(title, year) => `You purchased ${title} from ${year}.`;

type MyFn = (foo: number, bar: boolean, baz: string) => string;
function testFn(foo: number, bar: boolean): string {
  return 'in testFn';
}
const someFn: MyFn = testFn;

// Note the placement of <T> below.
type MyParametricFn<T> = (p1: T, p2: T) => T;
const add2: MyParametricFn = (p1: number, p2: number): number => p1 + p2;
console.log(add2(2, 3));

type ArrayOfArraysOfNumbers = Array<Array<number>>;
const aoaon: ArrayOfArraysOfNumbers = [[1, 2], [3, 4, 5]];
