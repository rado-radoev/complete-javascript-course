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


// const PersonProto = {
//   calcAge() {
//     console.log(2038 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
// }

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge();


// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge();

// const Student = function(firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear)
//   this.course = course;
// }

// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function() {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// }

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce();


class StudentCL extends PersonCL {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
}

const PersonProto = {
  calcAge() {
    console.log(2038 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
}
StudentProto.introcude = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science')
jay.introcude()
jay.calcAge();

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

/*
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
*/



// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

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

// const EV = function(make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// }

// EV.prototype = Object.create(Car.prototype);
// EV.prototype.chargeBattery = function(chargetTo) {
//   this.charge = chargetTo;
// }

// EV.prototype.accelerate = function( ) {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(`${this.make} going at ${this.speed}, with a charge of ${this.charge}`);
// }

// const tesla = new EV('tesla', 120, 23);
// tesla.charge = 90;
// tesla.accelerate()
// tesla.brake()
// tesla.accelerate();


// 1.Public fields
// 2,Priate fields
// 3.Public methods
// 4.Private methods
// Static version


class Account {
  // 1.Public fields (instances)
  local = navigator.language;
  // _movements = [];
  
  // 2.Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${this.owner}`);
  }

  getMovement() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val) 
    return this;
  }

  withdraw(val) {
    this.deposit(-val)
    return this
  }

  // PrivateLoan
  // #approveLoad(val) {
  //   return true;
  // }
  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
    return this;
  }

  static helper() {
    console.log('Helper');
  }
}

const acct1 = new Account('Jonas', 'EUR', 1111);
acct1.deposit(240)
acct1.withdraw(100)
acct1.requestLoan(100);
console.log(acct1.getMovement());
console.log(acct1);
Account.helper();
// console.log(acct1.#pin);
// console.log(acct1.#approveLoan);


// Chaining
acct1.deposit(300).deposit(500).withdraw(-45).requestLoan(2550).withdraw(4000);
console.log(acct1.getMovement());