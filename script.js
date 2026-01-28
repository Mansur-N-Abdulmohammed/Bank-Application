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
let currentSorted = false;
//
// Data
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

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [],
  interestRate: 0.7,
  pin: 3333,
  type: 'standard',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'premium',
};

const accounts = [account1, account2, account3, account4];

const dispMovements = function (mov, sort = false) {
  containerMovements.innerHTML = '';

  const usage = [...mov];
  if (sort === true) {
    usage.sort((a, b) => a - b);
  }
  usage.forEach(function (e, i, arr) {
    let type = e > 0 ? `deposit` : 'withdrawal';

    const html = `
     <div class="movements__row">
        <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}</div>
         <div class="movements__date">3 days ago</div>
         <div class="movements__value">${Math.abs(e).toFixed(2)}$</div>
         </div>
         `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  document.querySelectorAll('.movements__row').forEach((row, i) => {
    if (i % 2 == 0) row.style.backgroundColor = 'black';
    if (i % 2 == 1) row.style.backgroundColor = 'grey';
  });
};

// warning its just for acc 1

//Testing Area //////////////////////////////////////////////

//dimond warning > this worked first
const createUsername = function (acc) {
  acc.userName = acc?.owner
    ?.toLowerCase()
    ?.split(' ')
    ?.map(e => e[0])
    ?.join('');
};

//dimond warning > this worked first
const setupAccounts = function (accs) {
  accs.forEach(e => {
    createUsername(e);
  });
};

setupAccounts(accounts);

// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA
// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA
// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA
// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA
const currentUser = function (e) {
  currentUSER = e;
};

// dimond to upload the current existed balance
const currentBalance = function (account) {
  const result = account.movements.reduce((a, b) => a + b);
  labelBalance.textContent = `${result}$`;
  return result;
};

// dimond to list income and outcome and intersect
const summeryAccount = function (acc) {
  // console.log(acc.movements);
  if (acc.movements) {
    const income = acc.movements
      .filter(e => e > 0)
      .map(e => e * 1)
      .reduce((a, b) => a + b, 0);

    const outcome = acc.movements
      .filter(e => e < 0)
      .map(e => e * 1)
      .reduce((a, b) => a + b, 0);

    const intersect = acc.movements
      .filter(e => e > 0)
      .map(e => e * (acc.interestRate / 100))
      .filter(e => e >= 1)
      .reduce((ac, cu) => ac + cu);

    // bug >> its harrram
    // labelSumInterest.textContent = `${intersect}$`;

    labelSumInterest.textContent = `ولا تقرب الربا`;
    labelSumIn.textContent = `${income.toFixed(2)}$`;
    labelSumOut.textContent = `${Math.abs(outcome).toFixed(2)}$`;
  } else {
    labelSumIn.textContent = `0000$`;
  }
};

// dimond for updating the current account that opened
const UpdateAccount = function (e) {
  currentBalance(e);
  dispMovements(e.movements, '$');
  summeryAccount(e);
  currentUser(e);

  labelWelcome.textContent = `Welcome Back, ${e.owner.split(' ')[0]}`;
  containerApp.style.animation = 'show .5s linear forwards';

  // refresh the input field
  inputLoginUsername.value = inputLoginPin.value = '';

  // solved the problem of outline color
  inputLoginPin.blur();
};

const checkLogin = function () {
  const res = accounts.find(ac => ac.userName === inputLoginUsername.value);
  if (res === undefined) {
    alert(`You have to enter real username`);
  } else if (res.pin === Number(inputLoginPin.value)) {
    UpdateAccount(res);
  } else {
    alert(`the pin is wrong`);
  }
};

const transferTo = function () {
  // console.log(inputTransferTo.value, inputTransferAmount.value);

  let amount = Number(inputTransferAmount.value);
  let acc = inputTransferTo.value.toLowerCase();

  const rec = accounts.find(e => e.userName === acc);

  if (acc === rec.userName && amount <= currentBalance(currentUSER)) {
    currentUSER.movements.push(-amount);
    rec.movements.push(+amount);
    UpdateAccount(currentUSER);

    // to clear focus on the input field
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
  } else {
    alert('you dont have that money ' + typeof amount);
  }
};

const requestLoad = function () {
  const loanNum = Number(inputLoanAmount.value);
  if (loanNum > 0 && loanNum <= 10000) {
    currentUSER.movements.push(loanNum);
    if (!currentUSER.Borrowing) {
      currentUSER.Borrowing = 0;
    }
    currentUSER.Borrowing += loanNum;
    UpdateAccount(currentUSER);
    inputLoanAmount.value = '';
  } else {
    alert(`you cant get loan`);
  }
};

// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA
// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA
// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA
// WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA WORKINGAREA

// BTNS, BTNS, BTNS, BTNS, BTNS
// BTNS, BTNS, BTNS, BTNS, BTNS
// BTNS, BTNS, BTNS, BTNS, BTNS
// BTNS, BTNS, BTNS, BTNS, BTNS
// BTNS, BTNS, BTNS, BTNS, BTNS
// BTNS, BTNS, BTNS, BTNS, BTNS

btnLogin.addEventListener('click', function (e) {
  // dimond prevent form from submitting
  e.preventDefault();
  // start here warning
  checkLogin();
});

btnTransfer.addEventListener('click', function (e) {
  // dimond prevent form from submitting
  e.preventDefault();
  // start here warning
  transferTo();
});

btnLoan.addEventListener('click', function (e) {
  // dimond prevent form from submitting
  e.preventDefault();
  // start here warning
  requestLoad();
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  currentSorted = !currentSorted;
  dispMovements(currentUSER.movements, currentSorted);
});

//
//
//
//
//
//
//
/*
git add .  
git commit -m "first"
git push origin main        
*/
//
//
//
//
UpdateAccount(account1);
//
//
//
//
//
//
//
// /////////////////////////////////////////// testingarea
