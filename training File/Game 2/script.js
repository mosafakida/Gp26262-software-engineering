const gameBoard = document.getElementById("gameBoard");
const scoreElement = document.getElementById("score");

const boardSize = 20; // Each cell is 20x20px
const totalCells = 20; // 20x20 grid

let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let food = { x: 10, y: 10 };
let score = 0;

function createGameBoard() {
  gameBoard.innerHTML = "";
  snake.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (head.x < 1 || head.x > totalCells || head.y < 1 || head.y > totalCells || isCollision(head)) {
    alert("Game Over! Your score: " + score);
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreElement.textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * totalCells) + 1,
    y: Math.floor(Math.random() * totalCells) + 1
  };

  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    spawnFood();
  }
}

function isCollision(position) {
  return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreElement.textContent = score;
  spawnFood();
}

function gameLoop() {
  setTimeout(() => {
    moveSnake();
    createGameBoard();
    gameLoop();
  }, 150);
}

document.addEventListener("keydown", changeDirection);

resetGame();
gameLoop();
