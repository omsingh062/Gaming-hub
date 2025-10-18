let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10;

let player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
};

let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
};

let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;
let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

let scoreDisplay = document.getElementById('score');
let startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
    resetGame();
    requestAnimationFrame(update);
});

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    drawPlayer();
    createBlocks();

    document.addEventListener("keydown", movePlayer);
};

function update() {
    if (gameOver) return;

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    drawPlayer();
    updateBall();
    drawBlocks();
    drawScore();
}

function drawPlayer() {
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);
}

function updateBall() {
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;
    } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;
    }

    if (ball.y <= 0 || ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
        if (ball.y <= 0) ball.velocityY *= -1;
        else ball.velocityX *= -1;
    } else if (ball.y + ball.height >= boardHeight) {
        context.font = "20px sans-serif";
        context.fillText("Game Over: Press 'Space' to Restart", 80, 400);
        gameOver = true;
    }

    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                score += 100;
                blockCount--;
            } else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;
                ball.velocityX *= -1;
                score += 100;
                blockCount--;
            }
        }
    }

    if (blockCount == 0) {
        score += 100 * blockRows * blockColumns;
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createBlocks();
    }

    scoreDisplay.textContent = `Score: ${score}`;
}

function drawBlocks() {
    context.fillStyle = "skyblue";
    for (let block of blockArray) {
        if (!block.break) {
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}

function createBlocks() {
    blockArray = [];
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            blockArray.push({
                x: blockX + c * blockWidth + c * 10,
                y: blockY + r * blockHeight + r * 10,
                width: blockWidth,
                height: blockHeight,
                break: false
            });
        }
    }
    blockCount = blockArray.length;
}

function movePlayer(e) {
    if (gameOver && e.code === "Space") {
        resetGame();
        requestAnimationFrame(update);
        return;
    }

    let nextX = e.code === "ArrowLeft" ? player.x - player.velocityX :
                e.code === "ArrowRight" ? player.x + player.velocityX :
                player.x;

    if (!outOfBounds(nextX)) {
        player.x = nextX;
    }
}

function resetGame() {
    gameOver = false;
    score = 0;
    player.x = boardWidth / 2 - playerWidth / 2;
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = ballVelocityX;
    ball.velocityY = ballVelocityY;
    blockRows = 3;
    createBlocks();
    scoreDisplay.textContent = `Score: ${score}`;
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function topCollision(a, b) { return detectCollision(a, b) && (a.y + a.height) >= b.y; }
function bottomCollision(a, b) { return detectCollision(a, b) && (b.y + b.height) >= a.y; }
function leftCollision(a, b) { return detectCollision(a, b) && (a.x + a.width) >= b.x; }
function rightCollision(a, b) { return detectCollision(a, b) && (b.x + b.width) >= a.x; }

function outOfBounds(x) {
    return x < 0 || x + playerWidth > boardWidth;
}
