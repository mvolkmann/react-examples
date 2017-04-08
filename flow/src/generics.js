// @flow

class MyClass<T> {
  // use T in the definitions of
  // properties and/or methods
  someProp: T;

  constructor(someProp: T) {
    this.someProp = someProp;
  }

  getSomeProp(): T {
    return this.someProp;
  }
}

function printPair<T>(p1: T, p2: T): void {
  console.log(`${String(p1)} and ${String(p2)}`);
}

printPair(1, 2);
printPair('one', 'two');
printPair('one', 2); // Why isn't this an error because the argument types differ?

const myObj: MyClass<number> = new MyClass(3);
console.log(myObj.getSomeProp());

type PricedType<T> = {
  item: T,
  price: number,
  date: Date
};

function printPricedType<T>(priced: PricedType<T>): void {
  console.log(String(priced.item),
    'cost', priced.price,
    'on', priced.date.toDateString());
}

const apple: PricedType<string> = {
  item: 'Gala apple',
  price: 0.99,
  date: new Date()
};
printPricedType(apple);

class Fruit {
  kind: string;

  constructor(kind: string): void {
    this.kind = kind;
  }

  toString(): string {
    return this.kind;
  }
}
const banana: PricedType<Fruit> = {
  item: new Fruit('Chiquita banana'),
  price: 0.29,
  date: new Date()
};
printPricedType(banana);
