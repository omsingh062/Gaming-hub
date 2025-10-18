let board;
let playerO = "O";
let playerX = "X";
let currPlayer = playerO;
let gameOver = false;

const boardDiv = document.getElementById("board");
const turnIndicator = document.getElementById("turn-indicator");
const restartBtn = document.getElementById("restart-btn");
const winMessage = document.getElementById("win-message");
const winnerText = document.getElementById("winner-text");

function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  boardDiv.innerHTML = "";

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");
      tile.id = `${r}-${c}`;
      tile.classList.add("tile");
      if (r < 2) tile.classList.add("horizontal-line");
      if (c < 2) tile.classList.add("vertical-line");
      tile.addEventListener("click", setTile);
      boardDiv.appendChild(tile);
    }
  }

  currPlayer = playerO;
  gameOver = false;
  turnIndicator.innerText = `Turn: ${currPlayer}`;
  winMessage.classList.add("hidden");
}

function setTile() {
  if (gameOver) return;

  const [r, c] = this.id.split("-").map(Number);
  if (board[r][c] !== " ") return;

  board[r][c] = currPlayer;
  this.innerText = currPlayer;

  checkWinner();

  if (!gameOver) {
    currPlayer = currPlayer === playerO ? playerX : playerO;
    turnIndicator.innerText = `Turn: ${currPlayer}`;
  }
}

function checkWinner() {
  // Rows
  for (let r = 0; r < 3; r++) {
    if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] !== " ") {
      highlightWinner([[r, 0], [r, 1], [r, 2]]);
      return endGame(board[r][0]);
    }
  }

  // Columns
  for (let c = 0; c < 3; c++) {
    if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] !== " ") {
      highlightWinner([[0, c], [1, c], [2, c]]);
      return endGame(board[0][c]);
    }
  }

  // Diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== " ") {
    highlightWinner([[0, 0], [1, 1], [2, 2]]);
    return endGame(board[0][0]);
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== " ") {
    highlightWinner([[0, 2], [1, 1], [2, 0]]);
    return endGame(board[0][2]);
  }

  // Tie
  if (board.flat().every(cell => cell !== " ")) {
    winnerText.innerText = "It's a draw!";
    winMessage.classList.remove("hidden");
    gameOver = true;
  }
}

function highlightWinner(positions) {
  positions.forEach(([r, c]) => {
    const tile = document.getElementById(`${r}-${c}`);
    tile.classList.add("winner");
  });
}

function endGame(winner) {
  winnerText.innerText = `Player ${winner} wins!`;
  winMessage.classList.remove("hidden");
  gameOver = true;
}

// Restart game on button click
restartBtn.addEventListener("click", () => {
  setGame();
});

// Start first game
setGame();
