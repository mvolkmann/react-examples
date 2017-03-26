// @flow

//interface Vehicle {
type Vehicle = {
  start(): void,
  stop(): void
};

class Boat {
  start(): void {
    console.log('The boat is started.');
  }
  stop(): void {
    console.log('The boat is stopped.');
  }
}

class Car {
  start(): void {
    console.log('The car is started.');
  }
  stop(): void {
    console.log('The car is stopped.');
  }
}

class House { // has no methods
}

function testDrive(vehicle: Vehicle): void {
  vehicle.start();
  vehicle.stop();
}

const boat: Vehicle = new Boat();
testDrive(boat);
const car: Vehicle = new Car();
testDrive(car);
const house: Vehicle = new House();
testDrive(house); // run-time error
