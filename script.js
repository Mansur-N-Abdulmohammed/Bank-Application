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
let currentUSER;
let SortedMovement = false;

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
  locale: 'de-DE', // de-DE
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

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [],
  interestRate: 0.7,
  pin: 3333,
  type: 'standard',
  movementsDates: [],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'premium',
  movementsDates: [
    '2021-03-12T10:22:45.123Z',
    '2021-04-08T15:41:09.456Z',
    '2021-06-19T08:17:54.789Z',
    '2021-09-01T19:05:33.210Z',
    '2022-01-14T07:56:18.654Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// dimond for creating userName for every account
accounts.forEach((e, i) => {
  accounts[i].userName = e.owner
    .toLowerCase()
    .split(' ')
    .map(e => e[0])
    .join('');
});

// //////////////////////////////////////////////////////////////////
// dimond to calcTimeOut
// const calcTimeOut = function () {
//   const time = 10 * 60;
//   const getStart = setInterval(()=>{

//   },1000)
// };
// dimond for delete the account
const deleteAccount = function () {
  const userName = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  const acc = accounts.find(e => e.userName === userName);
  if (acc && currentUSER.userName && userName && currentUSER.pin === pin) {
    const ind = accounts.findIndex(e => e.userName === userName);
    accounts.splice(ind, 1);
    containerApp.style.animation = 'none';
    inputCloseUsername.value = inputClosePin.value = '';
  }
};
//dimond for check if the user is correct or not
const LoginCheck = function () {
  const userName = inputLoginUsername.value.toLowerCase();
  const pin = +inputLoginPin.value;

  const check = accounts.find(e => e.userName === userName);

  if (check) {
    if (check.pin === pin) {
      containerApp.style.animation = 'show 0.5s ease forwards';
      labelWelcome.textContent = `welcome back, ${check.owner.split(' ')[0]}`;
      updateUI(check);
    } else {
      alert(`the password is wrong`);
    }
  } else {
    alert(`the username is wrong`);
  }
  inputLoginUsername.value = inputLoginPin.value = '';
};
// dimond t oget getLoan
const getLoan = function () {
  const amount = +inputLoanAmount.value;
  const largest = Math.max(...currentUSER.movements.filter(e => e > 0));
  if (amount > 0 && amount <= 0.1 * largest) {
    setTimeout(() => {
      currentUSER.loanMovement ??= [];
      currentUSER.loanMovement.push(amount);
      currentUSER.movements.push(amount);
      currentUSER.movementsDates.push(new Date().toISOString());
      updateUI(currentUSER);
      console.log(currentUSER);
    }, 2000);
  }
};
//dimond to transmit money
const transferMoney = function () {
  const rec = inputTransferTo.value.toLowerCase();
  const amount = +inputTransferAmount.value;

  const accept = accounts.find(
    e => e.userName === rec && e.userName !== currentUSER.userName,
  );

  if (amount <= currentBalance(currentUSER) && amount > 0 && accept) {
    // you will get a bug if you dont consider the date of movements
    accept?.movements.push(+Number(amount));
    accept?.movementsDates.push(new Date().toISOString());
    currentUSER?.movements.push(-Number(amount));
    currentUSER?.movementsDates.push(new Date().toISOString());
    console.log(currentUSER);
    updateUI(currentUSER);
    inputTransferTo.value = inputTransferAmount.value = '';
  }
};
// dimond to show the money due to the account
const CalcCurrency = function (mon, acc) {
  const res = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(Math.abs(mon));
  return res;
};
// dimond toshow the summery
const displaySummery = function (acc) {
  const income = acc.movements.filter(e => e > 0).reduce((a, b) => a + b, 0);
  const outcome = acc.movements.filter(e => e < 0).reduce((a, b) => a + b, 0);

  labelSumIn.textContent = CalcCurrency(income, acc);
  labelSumOut.textContent = CalcCurrency(outcome, acc);
  // labelSumInterest
};

// dimond to get the current Balance
const currentBalance = function (acc) {
  const res = acc.movements.reduce((a, b) => a + b, 0);
  labelBalance.textContent = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(res);
  return res;
};
// dimond to show the movements
const displayMovement = function (acc) {
  const combinedMovementDates = acc.movements.map((e, i) => ({
    mov: e,
    movDate: acc.movementsDates[i],
  }));

  if (SortedMovement) combinedMovementDates.sort((a, b) => a.mov - b.mov);
  combinedMovementDates.forEach((e, i) => {
    const type = e.mov > 0 ? 'deposit' : 'withdrawal';

    // trick
    const el = new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }).format(Math.abs(e.mov));
    // trick
    const formatedDate = new Intl.DateTimeFormat('en-uk', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(e.movDate));

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${type}</div>
          <div class="movements__date">${formatedDate}</div>
          <div class="movements__value">${el}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const updateUI = function (acc) {
  displayMovement(acc);
  currentBalance(acc);
  displaySummery(acc);
  // calcTimeOut();
  currentUSER = acc;
  // currentUSER = acc.useName bug;
};

// workingarea
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  SortedMovement = !SortedMovement;
  updateUI(currentUSER);
});
// workingarea
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  LoginCheck();
});
// workingarea
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  transferMoney();
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  getLoan();
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  deleteAccount();
});

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
// testingarea fake
updateUI(account1);
