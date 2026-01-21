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
//
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
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const outcome = acc.movements
      .filter(e => e < 0)
      .map(e => e * 1)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const intersect = acc.movements
      .filter(e => e > 0)
      .map(e => e * (acc.interestRate / 100))
      .filter(e => e >= 1)
      .reduce((ac, cu) => ac + cu);

    // bug >> its harrram
    // labelSumInterest.textContent = `${intersect}$`;

    labelSumInterest.textContent = `ان الحکم الا للە`;
    labelSumIn.textContent = `${income}$`;
    labelSumOut.textContent = `${Math.abs(outcome)}$`;
  } else {
    labelSumIn.textContent = `0000$`;
  }
};

// dimond for updating the current account that opened
const UpdateAccount = function (e) {
  currentBalance(e);
  dispMovements(e, '$');
  summeryAccount(e);
  currentUser(e);

  labelWelcome.textContent = `Welcome Back, ${e.owner.split(' ')[0]}`;
  containerApp.style.animation = 'show 1s linear forwards';

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
    console.log(currentUSER);
    UpdateAccount(currentUSER);
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
//
UpdateAccount(account1);
//
//
//
//
//
//
// /////////////////////////////////////////// testingarea
