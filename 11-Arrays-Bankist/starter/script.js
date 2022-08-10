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
