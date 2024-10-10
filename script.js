// Get DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const startButton = document.getElementById("start-btn");
const statusText = document.getElementById("status");

// List of words for game
const words = [
  "signature",
  "tense",
  "aeroplane",
  "ball",
  "pies",
  "juice",
  "anagram",
  "before",
  "north",
  "dependent",
  "study",
  "silver",
  "obedient",
  "superficial",
  "quiet",
  "eight",
  "fidelity",
  "admit",
  "drag",
  "loving",
  "aeronautics",
  "pychology",
  "physics",
  "fate",
  "overview",
  "scenery",
  "exception",
  "sun"
];

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
let timeInterval;
let gameStarted = false;

// Disable input and hide word before starting
text.disabled = true;
word.innerText = "";
timeElement.innerText = "10s";

// Function to get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Function to add random word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Function to update score
function updateScore() {
  score++;
  scoreElement.innerText = score;
}

// Function to update time
function updateTime() {
  time--;
  timeElement.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Function to handle game over
function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="history.go(0)">Play Again</button>
  `;
  endgameElement.style.display = "flex";
}

// Function to start the game
function startGame() {
  gameStarted = true;
  score = 0;
  time = 10;
  scoreElement.innerText = score;
  timeElement.innerText = time + "s";
  text.disabled = false; // Enable the input field
  text.focus();
  startButton.style.display = "none"; // Hide the start button
  addWordToDom();
  timeInterval = setInterval(updateTime, 1000); // Start timer
}

// Input event listener
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDom();
    updateScore();

    // Adjust time based on difficulty
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Toggle settings visibility
settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);

// Settings form event listener
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Start button event listener to start the game
startButton.addEventListener("click", startGame);

// Initialize the difficulty selection
difficultySelect.value = difficulty;
