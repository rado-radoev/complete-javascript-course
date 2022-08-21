'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NO NO NO
  // this.calcAge = function() {
  //   console.log(2037 - this.birthYear)
  // }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas)



Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear)
}

console.log(Person.prototype)
jonas.calcAge();



// Challenge #1
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function(make, speed) { 
//   this.make = make;
//   this.speed = speed;
// }
// Car.prototype.accelerate = function() {
//   this.speed += 10;
//   console.log(this.speed);
// }
// Car.prototype.brake = function() {
//   this.speed -= 5;
//   console.log(this.speed);
// }

// const bmw = new Car('BMW', 120);
// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// const merc = new Car('Mercedes', 95);
// merc.accelerate()
// merc.brake();

// class expression
// const PersonCl = class { }



// class declaration
class PersonCL { 
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear
  }

  // Instance methods
  // Method will be added to .prototype property
  calcAge() {
    console.log(2038 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hi there 👋');
    console.log(this);
  }
}

PersonCL.hey()

// PersonCL.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// }

const jessica = new PersonCL('Jessica Davis', 1996);
jessica.calcAge();
console.log(jessica.age);
jessica.greet();
console.log(jessica.__proto__ === PersonCL.prototype);

// Classes are not hoisted
// Classes are first class citizens (pass/return from function)
// Body of class is always executed in strict mode

const waleter = new PersonCL('Walter White', 1947);

// GETTERS and SETTERS
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  }
}

console.log(account.latest);

account.latest = 50;
console.log(account.movements);


const PersonProto = {
  calcAge() {
    console.log(2038 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();


const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();


//////////////////////////////////////
// Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed /= 1.6;
  }
  
  set speedUS(speed) {
    this.speed = (speed * 1.6);
  }
}


const ford = new Car('Ford', 120);
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 65;
console.log(ford.speed);
