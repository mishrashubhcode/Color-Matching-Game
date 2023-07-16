// Get the target element
const target = document.getElementById("target");

// Get all the square elements
const squares = document.querySelectorAll(".square");

//const squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (!square.classList.contains("clicked")) {
      square.classList.add("clicked");
      setTimeout(() => {
        square.classList.add("flipped");
      }, 100);
    }
  });
});


// Set the initial score and lives
let score = 0;
let lives = 3;

// Update the score and lives on the scoreboard
function updateScoreboard() {
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
}

// Generate a random color in the format "rgb(r, g, b)"
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Set the target color to a random color
function setTargetColor() {
    target.style.backgroundColor = randomColor();
}

// Check if the clicked square matches the target color
function checkMatch(event) {
    const square = event.target;
    const computedStyle = getComputedStyle(square);
    if (computedStyle.backgroundColor === target.style.backgroundColor) {
        score++;
        setTargetColor();
    } else {
        lives--;
        if (lives === 0) {
            setTimeout(() => {
                alert("Game over!");
                location.reload(); // Reload the page to start a new game
            }, 500); // Delay the alert by 500 milliseconds
        }
    }
    updateScoreboard();
    square.classList.add("clicked"); // Add the .clicked class to the square
    square.style.backgroundColor = randomColor();
}

// Remove the .clicked class from the square after the animation ends
function removeClickedClass(event) {
    event.target.classList.remove("clicked");
}

// Add event listeners to the squares
for (const square of squares) {
    square.addEventListener("click", checkMatch);
    square.addEventListener("animationend", removeClickedClass); // Listen for the end of the animation
}

// Set the initial target color
setTargetColor();

// Update the scoreboard
updateScoreboard();
