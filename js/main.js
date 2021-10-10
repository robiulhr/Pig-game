"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// when we use getElementsByClassName  to select a element it gives us a array
const btnnewEl = document.getElementsByClassName("btn--new");
const btnrollEl = document.getElementsByClassName("btn--roll");
const btnhold = document.getElementsByClassName("btn--hold");
const diceEl = document.getElementsByClassName("dice");
let currentvalue, activeplayer, score, playing;
const gamestart = function () {
  score0El.textContent = "0";
  score1El.innerText = "0";
  diceEl[0].classList.add("hidden");
  currentvalue = 0;
  activeplayer = 0;
  score = [0, 0];
  playing = true;
};
gamestart();

btnrollEl[0].addEventListener("click", function () {
  if (playing) {
    // 1. genarate a number between 1-6
    let randomnum = parseInt(Math.random() * 6 + 1);
    console.log(randomnum, typeof randomnum);
    // 2. display the number
    diceEl[0].classList.remove("hidden");
    //diceEl[0].setAttribute("src", `img/dice-${randomnum}.png`);
    // we can do this in a different way
    diceEl[0].src = `img/dice-${randomnum}.png`;
    // 3. chack for rolled 1
    if (randomnum != 1) {
      // add randomnum to current score
      currentvalue += randomnum;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentvalue;
    } else {
      currentvalue = 0;
      document.getElementById(`current--${activeplayer}`).textContent = 0;
      // swich to second player
      //activeplayer = activeplayer == 0 ? (activeplayer = 1) : (activeplayer = 0);
      // we can write this in simple way
      activeplayer = activeplayer == 0 ? 1 : 0;
      // console.log(activeplayer);
      /*
    if (!player0El.classList.contains("player--active")) {
      player0El.classList.add("player--active");
    } else {
      player0El.classList.remove("player--active");
    }
    if (!player1El.classList.contains("player--active")) {
      player1El.classList.add("player--active");
    } else {
      player1El.classList.remove("player--active");
    }
    */
      // we can do this same task in very short way with the help of toggle methode
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnhold[0].addEventListener("click", function () {
  if (playing) {
    // 1. count the score
    score[activeplayer] = score[activeplayer] += currentvalue;
    document.querySelector(`#score--${activeplayer}`).textContent =
      score[activeplayer];
    if (score[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      player0El.classList.remove("player--active");
      diceEl[0].classList.add("hidden");
    } else {
      //
      currentvalue = 0;
      document.getElementById(`current--${activeplayer}`).textContent = 0;
      activeplayer = activeplayer == 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnnewEl[0].addEventListener("click", function () {
  gamestart();
  score[0] = 0;
  score[1] = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
});
