'use strict';

//select element
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const scor0el = document.querySelector('#score--0');
const scroe1el = document.getElementById('score--1');
const dicel = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRool = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
scroe1el.textContent = 0;
scor0el.textContent = 0;
dicel.classList.add('hidden');
// مهم جداً  : اذا بدك تحفظ قيمة عدد وترجع تضيف فوقها لازم تانشئ الفاريبل  تبعه بال جلوبال وليس ضمن الفانشكن

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Switch function
const swithcPlyaer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
// new game function
const restartTheGame = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  score = [0, 0];
  score[activePlayer] = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`score--${activePlayer}`).textContent = 0;
};
btnNew.addEventListener('click', restartTheGame);
// Rolling dice functionalty
btnRool.addEventListener('click', function () {
  if (playing) {
    // 1 Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2 Display dice
    dicel.classList.remove('hidden');
    dicel.src = `dice-${dice}.png`;
    console.log(dice);
    //3 cheack for rolled 1 : if true , switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      /* current0El.textContent = currentScore; */
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      swithcPlyaer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1 add curent score to active player score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2 check if player score is >= 100
    if (score[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dicel.classList.add('hidden');
    } else {
      // switch player
      swithcPlyaer();
    }
  }
});
