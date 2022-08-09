'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //   numPassengers ||= 1;
//   //   price ||= 199;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// const flight = 'LH123';
// const jonas = {
//   name: 'Jonash Shcmedtmann',
//   passport: 123554645343,
// };

// const checkIn = function (flightNum, passanger) {
//   flightNum = 'LH878';
//   passanger.name = 'Mr. ' + passanger.name;

//   if (passanger.passport === 123554645343) {
//     alert('Check in');
//   } else {
//     alert('Wrong passprot!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// HIGHER ORDER FUNCTIONS
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // ⬇️ higher order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by ${fn.name}`);
// };

// const high5 = function () {
//   console.log('🙌');
// };

// document.body.addEventListener('click', high5);

// transformer('JavaScript is the best', upperFirstWord);
// transformer('JavaScript is the best', oneWord);


// const greeting = function(greeting) {
//   return function(name) {
//     console.log(`${greeting} ${name}`);
//   }
// }

// const greeterHey = greeting('Hey');
// greeterHey('Jonas');
// greeterHey('Stevern');

// greeting('Hello')('Jonas');

// const greet = greeting => name => console.log(`${greeting} ${name}`);


// const greetHi = greet('Hi');
// greetHi('Joe')
// greet('Hola')('Juan');


// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, passanger) {
//     console.log(`${passanger} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
//     this.bookings.push({flight: `${this.iataCode}${flightNum}`, passanger})
//   },
// }

// lufthansa.book(238, 'Jonash Shmedtman');
// lufthansa.book(554, 'John Smiht');
// console.log(lufthansa);


// const euroWings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: []
// }


// // Call method
// const book = lufthansa.book;
// book.call(euroWings, 23, 'Sarah Jones');
// console.log(euroWings);

// book.call(lufthansa, 234, 'Marta Stuart');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Airlines', 
//   iataCode: 'LX',
//   bookings: []
// }

// book.call(swiss, 365, 'Joe Basilliano')
// console.log(swiss);

// // Apply method
// const flightData = [548, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(swiss, ...flightData);
// console.log(swiss);

// // Bind method
// // book.call(euroWings, 23, 'Sarah Jones');

// const bookEW = book.bind(euroWings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(543, 'Steven Shaw')

// const bookEW23 = book.bind(euroWings, 23);
// bookEW23('James Pardiu');
// bookEW23('Martha Cooper');

// // With event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(.1, 200));

// const addVAT = addTax.bind(null, .23);
// // addVat = value => value + values * .23;
// console.log(addVAT(200));
// console.log(addVAT(100));

// const addTax2 = function(rate) {
//   return function (value) {
//     return value + value * rate;
//   }
// }

// const vat = addTax2(.23);
// console.log(vat(200));



///////////////////////////////////////
// Coding Challenge #1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0)
};




// const runOnce = function() {
//   console.log('This will never run again');
// }

// // runOnce();

// // IIFE Immediately invoked funciton expression
// (function() {
//   console.log('This will never run again');
// });

// (() => console.log('This will never run again either'))();


// CLOSURES
// const secureBooking = function() {
//   let passangerCount = 0;

//   return function() {
//     passangerCount++;
//     console.log(passangerCount + ' passangers');
//   }
// }

// const booker = secureBooking();
// booker();
// booker();
// booker();
// booker();

// console.dir(booker)


///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();