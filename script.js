const gameBoard = document.getElementById('game-board');
const MenuText = document.getElementById('help-text-1');
const Menulogo = document.getElementById('logo');
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');

const gridSize = 20;
let GamehighScore = 0;
let snake = [{ x: 10, y: 10 }];
let food = generateRandomFood();
let direction = 'right';
let gameInterval;
let snakeSpeed = 200;
let gameStarted = false;

function draw() {
    gameBoard.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

function drawSnake() {
    snake.forEach((coordinate) => {
        const snakeElement = createGameElement('div', 'snake');
        setElementPosition(snakeElement, coordinate);
        gameBoard.appendChild(snakeElement);
    });
}


function createGameElement(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
}

function setElementPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

function drawFood() {
    if (gameStarted) {
        const foodEl = createGameElement('div', 'food');
        setElementPosition(foodEl, food);
        gameBoard.appendChild(foodEl)
    }
}

function generateRandomFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateRandomFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, snakeSpeed);
    }
    else {
        snake.pop();
    }
}

function startGame() {
    gameStarted = true;
    MenuText.style.display = 'none';
    Menulogo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, snakeSpeed);
}

function handleKeyPress(event) {
    if ((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === '')) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);


function increaseSpeed() {
    if (snakeSpeed >= 150) {
        snakeSpeed -= 5;
    }
    else if (snakeSpeed >= 100) {
        snakeSpeed -= 3;
    }
    else if (snakeSpeed >= 50) {
        snakeSpeed -= 2;
    }
    else if (snakeSpeed >= 25) {
        snakeSpeed -= 1;
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }]
    food = generateRandomFood();
    direction = 'right';
    snakeSpeed = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    MenuText.style.display = 'block';
    Menulogo.style.display = 'block';
}

function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > GamehighScore) {
        GamehighScore = currentScore;
        highScore.textContent = GamehighScore.toString().padStart(3, '0');
        padStart(3, '0');
    }
    highScore.style.display = 'block';
}