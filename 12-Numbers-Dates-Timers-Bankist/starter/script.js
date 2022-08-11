'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const isEven = n => n % 2 === 0;

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

    const date = new Date(account.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');;
    const year = date.getFullYear();
    const displayDate = `${month}/${day}/${year}`

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

};



const calcAndDisplayBalance = function(account) {
  const movements = account.movements;
  account.balance = movements.reduce((acc, curr) => acc + curr , 0);
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
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
  labelSumOut.textContent = `${Math.abs(spendature).toFixed(2)}€`

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * account.interestRate / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`
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

currentAcct = account1;
updateUI(currentAcct)
containerApp.style.opacity=100;

const now = new Date();
const day = `${now.getDate()}`.padStart(2, '0');
const month = `${now.getMonth() + 1}`.padStart(2, '0');;
const year = now.getFullYear();
const hour = now.getHours();
const minuts = now.getMinutes();
labelDate.textContent = `${month}/${day}/${year} ${hour}:${minuts}`

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
  const amount = Math.floor(inputLoanAmount.value);
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

// labelBalance.addEventListener('click', function() {
//   [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// })
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const price = 345_90;
console.log(price);

const transferFee = 15_00;

const PI = 3.14_15;
console.log(PI);

console.log(Number(230_000))


console.log(new Date(account1.movementsDates[0]))
