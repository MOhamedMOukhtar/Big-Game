// for Roll-Dice Group
const groupDice = document.querySelector(".dice");

// for Roll-Dice Picture
const dices = document.querySelectorAll(".dice img");

// for Player
const playerOne = document.querySelector(".ply1");
const playerTwo = document.querySelector(".ply2");

// New Game
const newGame = document.querySelector(".new-game");

// Roll Dice
const rollDice = document.querySelector(".roll-dice");

// Hold btn
const hold = document.querySelector(".hold");

// Score Player One
const scorePlyOne = document.querySelector(".ply1 .score");

// Score Player Two
const scorePlyTwo = document.querySelector(".ply2 .score");

// Current Player One
const currentPlyOne = document.querySelector(".ply1 .current span");

// Current Player Two
const currentPlyTwo = document.querySelector(".ply2 .current span");

// First of All We Need to Hidden Roll Dice
groupDice.classList.add("hidden");

let num = 0;
let scoreOne = 0;
let scoreTwo = 0;
const winner = 100;

// Event Hold bottom

const holdEvent = function () {
  if (playerOne.classList.contains("active-player")) {
    scorePlyOne.textContent =
      Number(scorePlyOne.textContent) + Number(currentPlyOne.textContent);
    scoreOne = scorePlyOne.textContent;
    console.log(scoreOne);
  } else {
    scorePlyTwo.textContent =
      Number(scorePlyTwo.textContent) + Number(currentPlyTwo.textContent);
    scoreTwo = scorePlyTwo.textContent;
    console.log(scoreTwo);
  }
  if (scoreOne < winner || scoreTwo < winner) {
    togglePlayer();
  }

  resetCurrent();
  if (scorePlyOne.textContent >= winner) {
    playerOne.classList.add("player-winner");
    playerTwo.classList.remove("active-player");
    rollDice.removeEventListener("click", rollDiceEvent);
    hold.removeEventListener("click", holdEvent);
  } else if (scorePlyTwo.textContent >= winner) {
    playerTwo.classList.add("player-winner");
    playerOne.classList.remove("active-player");
    rollDice.removeEventListener("click", rollDiceEvent);
    hold.removeEventListener("click", holdEvent);
  }
};

hold.addEventListener("click", holdEvent);

// Event Roll Dice

const rollDiceEvent = function () {
  const index = Math.trunc(Math.random() * 6);
  groupDice.classList.remove("hidden");
  dices.forEach((el) => el.classList.add("hidden"));

  dices[index].classList.remove("hidden");

  num += index + 1;

  if (playerOne.classList.contains("active-player")) {
    currentPlyOne.textContent = num;
    if (index === 0) {
      togglePlayer();
      resetCurrent();
    }
  } else {
    currentPlyTwo.textContent = num;
    if (index === 0) {
      togglePlayer();
      resetCurrent();
    }
  }
};

rollDice.addEventListener("click", rollDiceEvent);

// *****************************
// *****************************
// Call Back Function
// *****************************
// *****************************

// Toggle active player
const togglePlayer = () => {
  if (playerOne.classList.contains("active-player")) {
    playerOne.classList.remove("active-player");
    playerTwo.classList.add("active-player");
  } else {
    playerTwo.classList.remove("active-player");
    playerOne.classList.add("active-player");
  }
};

const resetCurrent = function () {
  num = 0;
  currentPlyOne.textContent = num;
  currentPlyTwo.textContent = num;
};

const resetScore = () => {
  scorePlyTwo.textContent = 0;
  scorePlyOne.textContent = 0;
};

newGame.addEventListener("click", () => {
  resetCurrent();
  resetScore();
  playerOne.classList.add("active-player");
  playerOne.classList.remove("player-winner");
  playerTwo.classList.remove("player-winner");
  playerTwo.classList.remove("active-player");
  groupDice.classList.add("hidden");
  rollDice.addEventListener("click", rollDiceEvent);
  hold.addEventListener("click", holdEvent);
});
