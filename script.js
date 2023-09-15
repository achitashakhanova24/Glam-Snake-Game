const boardSize = 20;
const board = document.getElementById('snake-board');
const cellSize = board.offsetWidth / boardSize;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let score = 0;
let gameInterval;
let isGameOver = false;

function generateFood() {
    const foodX = Math.floor(Math.random() * boardSize);
    const foodY = Math.floor(Math.random() * boardSize);
    return { x: foodX, y: foodY };
}

function draw() {
    if (isGameOver) return;

    board.innerHTML = '';

    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.className = 'apple';
    board.appendChild(foodElement);
}

function moveSnake() {
    if (isGameOver) return;

    const head = { ...snake[0] };
    snake.unshift({ x: head.x + 1, y: head.y });

    const headElement = document.querySelector('.snake');
    headElement.classList.remove('snake');

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    } else {
        snake.pop();
    }

    checkCollision();
    draw();

    console.log(snake);
}

function checkCollision() {
    const head = snake[0];
    if (head.x >= boardSize || head.x < 0 || head.y >= boardSize || head.y < 0) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver();
        }
    }
}

function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    score = 0;
    isGameOver = false;
    document.getElementById('score').innerText = 'Score: 0';
    clearInterval(gameInterval);
    gameInterval = setInterval(function() {
      moveSnake();
      draw();
    }, 100);
    draw();
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
}

document.getElementById('start-button').addEventListener('click', startGame);
startGame();