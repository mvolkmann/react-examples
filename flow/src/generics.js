// @flow

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
