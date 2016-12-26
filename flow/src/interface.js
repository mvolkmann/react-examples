// @flow

interface Vehicle {
  start(): void;
  stop(): void;
}

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

class House {
}

function testDrive(vehicle: Vehicle) {
  vehicle.start();
  vehicle.stop();
}

const boat:Vehicle = new Boat();
testDrive(boat);
const car:Vehicle = new Car();
testDrive(car);
//const house:Vehicle = new House(); // error, doesn't have properties of Vehicle
//testDrive(house); // run-time error
