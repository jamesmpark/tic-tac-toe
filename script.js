"use strict";
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  // Row win comboinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // column win comboinations
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagnal win combinations
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

// initializes the game with X always starting first
function startGame() {
  circleTurn = false;

  // for each cell,( with { once: true } ) once the cell is clicked,
  // it can not be clicked again
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  // if its circles turn, retrun CIRCLE_CLASS, otherwise return X_CLASS
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
  // check for draw
  // swtich turns
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;
  }
  winningMessageElement.classList.add("show");
}

// checks if every cell contains an X or O CLASS > returns a draw
// we destructure cellElements in order to gain access to the every method
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// if its oposite of circle turn swapTurn runs
function swapTurns() {
  circleTurn = !circleTurn;
}

// maintains hover state based on whose turn it is
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// if the currentClass is in all three elements of the combinations, then you win
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
