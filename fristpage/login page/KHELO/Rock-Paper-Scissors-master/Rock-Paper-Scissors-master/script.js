let you;
let yourScore = 0;
let opponent;
let opponentScore = 0;

const choices = ["rock", "paper", "scissors"];

window.onload = function() {
  const container = document.getElementById("choices");
  choices.forEach(choice => {
    let img = document.createElement("img");
    img.src = `${choice}.png`;
    img.alt = choice;
    img.id = choice;
    img.addEventListener("click", selectChoice);
    container.appendChild(img);
  });
}

function selectChoice() {
  you = this.id;
  document.getElementById("your-choice").src = you + ".png";

  opponent = choices[Math.floor(Math.random() * 3)];
  document.getElementById("opponent-choice").src = opponent + ".png";

  let result = getResult(you, opponent);
  document.getElementById("result-text").textContent = result;

  document.getElementById("your-score").textContent = yourScore;
  document.getElementById("opponent-score").textContent = opponentScore;
}

function getResult(player, cpu) {
  if (player === cpu) {
    yourScore++;
    opponentScore++;
    return "It's a tie!";
  }

  if ((player === "rock" && cpu === "scissors") ||
      (player === "paper" && cpu === "rock") ||
      (player === "scissors" && cpu === "paper")) {
    yourScore++;
    return "You Win!";
  } else {
    opponentScore++;
    return "You Lose!";
  }
}
