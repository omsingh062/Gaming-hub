let board = [];
let rows = 8;
let columns = 8;
let minesCount = 10;
let minesLocation = [];
let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;

window.onload = function () {
    startGame();
    document.getElementById("flag-button").addEventListener("click", setFlag);
    document.getElementById("restart-button").addEventListener("click", restartGame);
};

function setMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r + "-" + c;
        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft--;
        }
    }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    setMines();
    board = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function setFlag() {
    flagEnabled = !flagEnabled;
    document.getElementById("flag-button").classList.toggle("active");
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked") || this.innerText === "🚩") {
        return;
    }

    let tile = this;

    if (flagEnabled) {
        // Toggle flag
        if (tile.innerText === "") {
            tile.innerText = "🚩";
        } else if (tile.innerText === "🚩") {
            tile.innerText = "";
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        tile.style.backgroundColor = "red";
        tile.innerText = "💣";
        revealMines();
        return;
    }

    let [r, c] = tile.id.split("-").map(Number);
    checkMine(r, c);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
            tile.classList.add("tile-clicked"); // prevent further clicks
        }
    }
    showMessage("Game Over 💥", "#ff5555");
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return;
    let tile = board[r][c];
    if (tile.classList.contains("tile-clicked")) return;

    tile.classList.add("tile-clicked");
    tilesClicked++;

    let minesFound = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) {
                minesFound += checkTile(r + dr, c + dc);
            }
        }
    }

    if (minesFound > 0) {
        tile.innerText = minesFound;
        tile.classList.add("x" + minesFound);
    } else {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr !== 0 || dc !== 0) {
                    checkMine(r + dr, c + dc);
                }
            }
        }
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        showMessage("You Win! 🎉");
        gameOver = true;
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return 0;
    return minesLocation.includes(r + "-" + c) ? 1 : 0;
}

function showMessage(text, color = "#00ff00") {
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = text;
    messageDiv.style.color = color;
    messageDiv.classList.remove("hidden");
}

function restartGame() {
    document.getElementById("board").innerHTML = "";
    document.getElementById("message").classList.add("hidden");
    board = [];
    minesLocation = [];
    tilesClicked = 0;
    flagEnabled = false;
    gameOver = false;
    startGame();
}
