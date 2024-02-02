const board = document.getElementById('game-board');

let snake = [{ x: 10, y: 10 }];
let food = generateRandomFood();

draw = () => {
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

drawSnake = () => {
    snake.forEach((coordinate) => {
        const snakeElement = createGameElement('div', 'snake');
    });
}


createGameElement = (tag, className) => {
    const el = document.createElement(tag);
    el.className = className;
    return el;
}

setPosition = (element, position) => {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

drawFood = () => {
    const foodEl = createGameElement('div', 'food');
    setPosition(foodEl, food);
    board.appendChild(foodEl)
}

generateRandomFood = () => {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return (x,y);
}