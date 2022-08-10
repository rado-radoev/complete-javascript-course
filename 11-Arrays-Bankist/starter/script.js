'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(account, sort = false) {
  const movements = account.movements;
  containerMovements.innerHTML = '';
  const movs = sort ? movements
                        .slice()
                        .sort((a, b) => a - b)
                    :
                      movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

};



const calcAndDisplayBalance = function(account) {
  const movements = account.movements;
  account.balance = movements.reduce((acc, curr) => acc + curr , 0);
  labelBalance.textContent = `${account.balance}€`;
}


const createUsernames = function(users) {
  users.forEach(user => {
    user.username = user.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
}

createUsernames(accounts)

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const income = movements.filter(movement => movement > 0).reduce((acc, move) => acc + move);
  labelSumIn.textContent = `${income}€`

  const spendature = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(spendature)}€`

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * account.interestRate / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`
}


// Event handlers
let currentAcct;

const updateUI = function(account) {
  // Display calculate balace
  calcAndDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
  displayMovements(account);
};

btnLogin.addEventListener('click', function(event) {
  event.preventDefault();
  currentAcct = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAcct?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAcct.owner.split(' ')[0]}`
    // Display movements
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAcct);
  }
});

btnTransfer.addEventListener('click', function(event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAcct.balance >= amount &&
    receiverAccount.username !== currentAcct.username
  ) {
    currentAcct.movements.push(-amount);
    receiverAccount.movements.push(amount);
  }

  updateUI(currentAcct);
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAcct.movements.some(mov => mov >= amount / 10)) {
    currentAcct.movements.push(amount);
    updateUI(currentAcct);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(event) {
  event.preventDefault();

  const userPin = Number(inputClosePin.value);
  const userToDelete = accounts.find(user => user.username === inputCloseUsername.value);

  if (
    userToDelete.username === currentAcct.username &&
    userPin === currentAcct.pin
    )
    {
      const index = accounts.findIndex(user => user.username === currentAcct.username);
      // Delete account
      accounts.splice(index, 1);
      // Hide UI
      containerApp.style.opacity = 0;
    }
    inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAcct, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsed = 1.1
// // const movementsUSD = movements.map(function (mov) {
// //   return mov * euroToUsed;
// // });
// const movementsUSD = movements.map(mov => mov * euroToUsed);

// console.log(movements)
// console.log(movementsUSD)

// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(mov * euroToUsed);
// }
// console.log(movementsUSDfor)

// const movementDescriptions = movements.map((mov, i) => (`Movement ${i + 1}: You ${mov > 0? 'deposited': 'withdrew'} ${Math.abs(mov)}`));

// console.log(movementDescriptions)

// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdrawals);

// accumulater -> snowball
// const balance = movements.reduce(function(acc, curr, i, arr) {
//   console.log(`Iteration ${i}: ${acc} : curr ${curr}`)
//   return acc + curr;
// }, 0);

// const balance = movements.reduce((acc, curr) => acc + curr , 0);
// console.log(balance)

// // Maximum Values
// const max = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0]);
// console.log(max)

// const euroToUsed = 1.1
// const totalDepositsInUSD = movements.filter(mov => mov > 0).map(mov => mov * euroToUsed).reduce((acc, mov) => Math.floor(acc + mov), 0);
// console.log(totalDepositsInUSD)

// const withdrawal = movements.find(mov => mov < 0);
// console.log(withdrawal)

// const z = Array.from({length: 7}, (_, i) => i + 1);
// console.log(z);

// const diceRolls = Array.from({length: 100}, () => Math.floor(Math.random() * (1 - 7) + 7));
// console.log(diceRolls)

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//     );
//     console.log(movementsUI)
// });

/////////////////////////////////////////////////






















///////////////////////////////////////
// CHALLENGES
///////////////////////////////////////
// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDos = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, -2);
//   const allDogs = dogsJuliaCorrected.concat(dogsKate);

//   allDogs.forEach(function(dogAge, i) {
//     dogAge > 3 ? console.log(`Dog number ${i + 1} is an adult, and is ${dogAge} years old 🐕`) : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//   });
// }

// checkDos([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])


///////////////////////////////////////
// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// 1.
dogs.forEach(dog => dog.recommendedFood = Math.floor(dog.weight ** 0.75 * 28));
console.log(dogs)

const calcDogPortion = function(dog) {
  const current = dog.curFood;
  const recommended = dog.recommendedFood;

  if (current > (recommended * 0.90) && current < (recommended * 1.10)) return 'good'; // OK
  if (current < (recommended * 0.90)) return 'less'; // malntrition
  if (current > (recommended * 1.10)) return 'much'; // overnutrition
}

// 2.
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(`Sarah's dog is eating ${calcDogPortion(sarahsDog)}`)

//3.
const ownersEatTooMuch = dogs
                          .filter(dog => dog.curFood > dog.recommendedFood)
                          .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
                            .filter(dog => dog.curFood < dog.recommendedFood)
                            .flatMap(dog => dog.owners);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
console.log(dogs.some(dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)));

// 7.
console.log(dogs.filter(dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)));


// 8.
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));
