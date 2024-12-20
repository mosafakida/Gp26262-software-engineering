const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageText = document.getElementById("winningMessageText");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("taken");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove("show");
  currentPlayer = "X";
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains("taken");
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageText.textContent = "It's a Draw!";
  } else {
    winningMessageText.textContent = `${currentPlayer} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

restartButton.addEventListener("click", startGame);

startGame();
