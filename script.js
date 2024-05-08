'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
    '2024-01-28T09:15:04.904Z',
    '2024-05-06T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
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

const addTransactions = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const mov = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  mov.forEach((element, i) => {
    const type = element > 0 ? 'deposit' : 'withdraw';
    const transactionDate = new Date(acc.movementsDates[i]);
    const transDate = `${transactionDate.getFullYear()}/${
      transactionDate.getMonth() + 1
    }/${transactionDate.getDate()}`;
    const days = Math.round(
      Number(new Date() - Number(new Date(transDate))) / 86400000
    );
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--deposit"> ${
            i + 1
          } ${type}</div>
  
             <div class="movements__date">${
               days >= 1
                 ? `${
                     days === 1
                       ? `Yesterday`
                       : `${
                           days <= 7
                             ? `${days} days ago`
                             : `${transactionDate.getFullYear()}/${
                                 transactionDate.getMonth() + 1
                               }/${transactionDate.getDate()}`
                         }`
                   }`
                 : `Today`
             }</div>           
          <div class="movements__value">${element.toFixed(2)}₹</div>
        </div>`;
    // console.log(html);
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// addTransactions(account1);
const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsername(accounts);
const calculateBalance = function (acc) {
  const totalBalance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${totalBalance}₹`;
};
// calculateBalance(account1);
// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// const checkDogs = function (dogsJulia, dogsKate) {
//   const correctedDogsJulia = [...dogsJulia];
//   // correctedDogsJulia[0] = 9;
//   correctedDogsJulia.splice(0, 1);
//   correctedDogsJulia.splice(
//     correctedDogsJulia.length - 2,
//     correctedDogsJulia.length
//   );
//   // console.log(correctedDogsJulia);
//   const both = [...correctedDogsJulia, ...dogsKate];
//   both.forEach((ele, idx) =>
//     console.log(
//       `Dog number ${idx + 1} is ${
//         ele > 3 ? `an adult, and is ${ele} years old` : 'still a puppy'
//       }`
//     )
//   );
// };
// checkDogs(dogsJulia, dogsKate);
// console.log(dogsJulia);
// const calcAverageHumanAge = function (dogsAges) {
//   const humanAge = dogsAges
//     .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
//     .filter(age => age >= 18)
//     .reduce((accu, curr, i, arr) => accu + curr / arr.length, 0);
//   console.log(humanAge);
// };
// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];
// calcAverageHumanAge(data1);
// calcAverageHumanAge(data2);
const calculateSummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((accu, curr) => accu + curr);
  labelSumIn.textContent = `${income.toFixed(2)}₹`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((accu, curr) => accu + curr);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}₹`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((accu, curr) => accu + curr);
  labelSumInterest.textContent = `${Math.abs(interest).toFixed(2)}₹`;
};
// calculateSummary(account1);
// console.log(accounts);
let currentAcc;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  const acc = accounts.find(
    uname =>
      uname.username === inputLoginUsername.value &&
      uname.pin === Number(inputLoginPin.value)
  );
  currentAcc = acc;
  if (acc) {
    containerApp.style.opacity = 100;
    calculateSummary(acc);
    addTransactions(acc);
    calculateBalance(acc);
    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome Back, ${acc.owner}`;
  }
});
const updateUI = function (acc) {
  calculateSummary(acc);
  addTransactions(acc);
  calculateBalance(acc);
};
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const uNameToTransfer = inputTransferTo.value;
  const ammountToTransfer = Number(inputTransferAmount.value);
  const accToTransfer = accounts.find(acc => acc.username === uNameToTransfer);
  if (
    uNameToTransfer &&
    ammountToTransfer > 0 &&
    uNameToTransfer !== currentAcc.username &&
    accToTransfer
  ) {
    currentAcc.movements.push(-1 * ammountToTransfer);
    accToTransfer.movements.push(ammountToTransfer);
  }
  updateUI(currentAcc);
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const confirmUser = inputCloseUsername.value;
  const confirmPin = Number(inputClosePin.value);
  if (currentAcc.username === confirmUser && currentAcc.pin === confirmPin) {
    const idx = accounts.findIndex(acc => acc.username === confirmUser);
    accounts.splice(idx, idx + 1);
    inputCloseUsername.value = '';
    inputClosePin.value = '';
    inputCloseUsername.blur();
    inputClosePin.blur();
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Math.round(Number(inputLoanAmount.value));
  if (amount > 0 && currentAcc.movements.some(mov => mov >= amount * 0.1)) {
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});
let isSorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  addTransactions(currentAcc, !isSorted);
  isSorted = !isSorted;
});

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
// console.log(dogs);
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(sarahDog);
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood * 0.1 + dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
const str1 = `${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`;
// console.log(str1);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood * 0.1 + dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood >= dog.recommendedFood - dog.recommendedFood * 0.1 &&
//       dog.curFood <= dog.recommendedFood + dog.recommendedFood * 0.1
//   )
// );
const okayDogs = dogs.filter(
  dog =>
    dog.curFood >= dog.recommendedFood - dog.recommendedFood * 0.1 &&
    dog.curFood <= dog.recommendedFood + dog.recommendedFood * 0.1
);
// console.log(okayDogs);
const dogsShallow = [...dogs];
dogsShallow.sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(dogsShallow);
const now = new Date();
const minutes = `${now.getMinutes()}`.padStart(2, 0);
const hours = `${now.getHours()}`.padStart(2, 0);
labelDate.textContent = `${now.getDate()}/${
  now.getMonth() + 1
}/${now.getFullYear()} ${hours}:${minutes}`;
let date = new Date(0, 0, 0, 0, 5, 0);
let intervalId = setInterval(() => {
  date.setSeconds(date.getSeconds() - 1);
  const sec = `${date.getSeconds()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);
  labelTimer.textContent = `${minutes}:${sec}`;
}, 1000);
setTimeout(() => {
  clearInterval(intervalId);
  containerApp.style.opacity = 0;
}, 1000 * 60 * 5);

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
