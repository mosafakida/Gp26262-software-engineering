const gameBoard = document.getElementById("gameBoard");
const scoreElement = document.getElementById("score");

const boardSize = 20; // Number of cells in the grid (20x20)
const cellSize = 20; // Size of each cell in pixels
let snake = [{ x: 5, y: 5 }]; // Initial snake position
let direction = { x: 0, y: 0 }; // Snake's movement direction
let food = { x: 10, y: 10 }; // Initial food position
let score = 0;
let gameInterval;

function createGameBoard() {
  gameBoard.innerHTML = "";

  // Render the snake
  snake.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.style.left = `${segment.x * cellSize}px`;
    snakeElement.style.top = `${segment.y * cellSize}px`;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });

  // Render the food
  const foodElement = document.createElement("div");
  foodElement.style.left = `${food.x * cellSize}px`;
  foodElement.style.top = `${food.y * cellSize}px`;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function moveSnake() {
  // Calculate the new head position
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for collisions
  if (
    head.x < 0 ||
    head.x >= boardSize ||
    head.y < 0 ||
    head.y >= boardSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    endGame();
    return;
  }

  // Add the new head to the snake
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = score;
    spawnFood();
  } else {
    // Remove the last segment if no food is eaten
    snake.pop();
  }
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize)
  };

  // Ensure food does not spawn on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    spawnFood();
  }
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

function endGame() {
  clearInterval(gameInterval);
  alert(`Game Over! Your score is ${score}`);
  resetGame();
}

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreElement.textContent = score;
  spawnFood();
  startGame();
}

function startGame() {
  gameInterval = setInterval(() => {
    moveSnake();
    createGameBoard();
  }, 200);
}

// Event listener for key presses
document.addEventListener("keydown", changeDirection);

// Initialize the game
resetGame();
