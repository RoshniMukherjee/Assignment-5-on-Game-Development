// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
let playerLives = 4;
let gameTime = 60;
let zombieID = 0;
let currentZombie;
let playerWidth = 80;

// Iteration 1.2: Add shotgun sound
let shotgunSound = new Audio("assets/shotgun.wav");
gameBody.onclick = () => {
  shotgunSound.pause();
  shotgunSound.currentTime = 0;
  shotgunSound.play();
};

// Iteration 1.3: Add background sound
let backgroundMusic = new Audio("assets/bgm.mp3");
backgroundMusic.play();
backgroundMusic.loop = true;

function generateUniqueNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Iteration 2: Write a function to make a zombie
function createZombie() {
  let num = generateUniqueNumber(1, 7);
  gameBody.innerHTML += `<img src="assets/zombie-${num}.png" class='zombie-image' id='zombieID${zombieID}'>`;
  currentZombie = document.getElementById(`zombieID${zombieID}`);
  let second = generateUniqueNumber(2, 6);
  currentZombie.style.animationDuration = `${second}s`;
  currentZombie.style.transform = `translateX(${generateUniqueNumber(20, 80)}vw)`;
  currentZombie.onclick = () => destroyZombie(currentZombie);
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissedZombie(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    playerLives--;
    playerWidth -= 20;
    document.getElementById("lives").style.width = `${playerWidth}%`;
    destroyZombie(zombie);
  }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
  zombie.style.display = "none";
  zombieID++;
  createZombie();
}

// Iteration 5: Creating timer
setInterval(timer, 1000);
function timer() {
  if (gameTime < 0 || playerLives <= 0) {
    location.href = playerLives <= 0 ? "game-over.html" : "win.html";
  } else {
    gameTime--;
    let timerElement = document.getElementById("timer");
    timerElement.innerHTML = gameTime;
    checkMissedZombie(currentZombie);
  }
}

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie();

// Iteration 7: Write the helper function to get random integer
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
