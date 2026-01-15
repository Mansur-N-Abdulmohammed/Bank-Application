'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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
  owner: '',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const dispMovements = function (mov, moneyType) {
  containerMovements.innerHTML = '';

  mov.movements.forEach(function (e, i, arr) {
    let type = e > 0 ? `deposit` : 'withdrawal';

    const html = `
     <div class="movements__row">
        <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}</div>
         <div class="movements__date">3 days ago</div>
         <div class="movements__value">${Math.abs(e)}${moneyType}</div>
         </div>
         `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// warning its just for acc 1

//Testing Area //////////////////////////////////////////////

const createUsername = function (acc) {
  acc.userName = acc.owner
    ?.toLowerCase()
    ?.split(' ')
    ?.map((e) => e[0])
    ?.join('');
};

const setupAccounts = function (accs) {
  accs.forEach((e) => {
    createUsername(e);
  });
};

const currentBalance = function (account) {
  const result = account.movements.reduce((a, b) => a + b);
  labelBalance.textContent = `${result}$ `;
};

const summeryAccount = function (acc) {
  console.log(acc.movements);
  if (acc.movements) {
    const income = acc.movements
      .filter((e) => e > 0)
      .map((e) => e * 1)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const outcome = acc.movements
      .filter((e) => e < 0)
      .map((e) => e * 1)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const intersect = (income * (1.2 / 100)).toFixed(2);

    labelSumInterest.textContent = `${intersect}$`;
    labelSumIn.textContent = `${income}$`;
    labelSumOut.textContent = `${Math.abs(outcome)}$`;
  } else {
    labelSumIn.textContent = `0000$`;
  }
};

// WORKINGAREA its just for acc 1
currentBalance(account2);
dispMovements(account2, '$');
summeryAccount(account2);
// WORKINGAREA
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK �
//
////////////TESTINGAREA////////////TESTINGAREA////////////TESTINGAREA///////////
