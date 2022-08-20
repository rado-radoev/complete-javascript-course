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
