'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fir', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enhanced object literals
  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with: ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
// STRINGS
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane.replaceAll('A', 'a'));

// MAPS
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// rest.set(2, 'Lisbon, Portugal');

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open ')
//   .set(false, 'We are closed ');

// console.log(rest.get(true));

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest.size);
// const arr = [1, 2];

// rest.set(arr, 'test');
// console.log(rest);
// console.log(rest.get(arr));

// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);

// const question = new Map([
//   ['question', 'What is the best programming language'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct🏆'],
//   [false, 'Try again!😔'],
// ]);
// console.log(question);

// // Convert object to Map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Quizz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// const answer = 2;
// // const answer = Number(prompt('Your answer'));
// console.log(answer);

// console.log(question.get(answer === question.get('correct')));
// console.log(
//   answer === question.get('correct') ? question.get(true) : question.get(false)
// );

// // Convert map to array
// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);
// console.log([...question.entries()]);

// SETS
// const ordersSet = new Set([
//   'Pasta',
//   'Risotto',
//   'Pizza',
//   'Pizza',
//   'Pasta',
//   'Risotto',
//   'Pizza',
// ]);

// console.log(ordersSet);
// console.log(new Set('Jonas'));
// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');
// // ordersSet.clear();
// console.log(ordersSet);

// for (const order of ordersSet) {
//   console.log(order);
// }

// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffSet = [...new Set(staff)];
// console.log(staffSet);

// Loops
// Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of properties) {
//   openStr += `${day} ,`;
// }
// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Entire object
// const entries = Object.entries(openingHours);
// // console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// Optional chaining
// console.log(restaurant.openingHours?.mon?.open);
// const days = ['mon', 'tue', 'wed', 'thu', 'fir', 'sat', 'sun'];
// for (const day of days) {
//   console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day} we open at ${open}`);
// }
// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.[(0, 1)] ?? 'Method does not exist');

// Loops
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);
// // for (const item in menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   // console.log(item);
//   console.log(`${i + 1}: ${el}`);
// }

// console.log([...menu.entries()]);

// const rest1 = {
//   name: 'Capri',
//   // numGuests: 2 0,
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// rest1.owner && rest1.owner && '<ANONYMOUS>';
// rest2.owner && rest2.owner && '<ANONYMOUS>';

// rest2.owner &&= '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

// Short circuit 👇
// console.log('===== OR ======');
// console.log(3 || 'Jonas ');
// console.log('' || 'Jonas ');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// // restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('===== AND ======');
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'Jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrroms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach');

// restaurant.numGuests = 0;
// const guests1 = restaurant.numGuests || 10;

// // Nullish values: null and undefined (NOT 0 or '')
// const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect);

// The rest operator 👇

// Spread because on the RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// // REST because on the LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects
// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(sat);
// console.log(weekDays);

// // Functions
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };
// add(2, 3);
// add(6, 3, 7, 2);
// add(6, 3, 1, 6, 8, 94, 2);

// const x = [23, 6, 7];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach', 'egg');
// restaurant.orderPizza('peperoni');

// The spread operator 👇
// const arr = [7, 8, 9];
// const newArr = [1, 2, ...arr];
// console.log(newArr);

// const newMenu = [...restaurant.mainMenu, 'Gniocci'];
// console.log(newMenu);

// // Copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// // join 2 arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// const str = 'Jonas';
// const letters = [...str, ' ', 'S. '];
// console.log(letters);
// console.log(...str);

// const ingredients = [
//   // prompt("Let's make Pasta! Ingredient 1"),
//   // prompt('Ingredient 2'),
//   // prompt('Ingredient 3'),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// // Objects
// const newRestaurant = { founded: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristaurante Roma';
// console.log(restaurant.name);
// console.log(restaurantCopy.name);
