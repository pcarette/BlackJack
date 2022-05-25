//need to initialize prompt sync to test the game in JS console
//const prompt = require('prompt-sync')();

const startGame = document.getElementById("start-game");
const menuDisplayer = document.querySelector(".menu-displayer");
const damier = document.querySelector(".damier");
let userMessage = document.querySelector(".user-message").lastChild.textContent
startGame.addEventListener("click", () => {
    menuDisplayer.classList.add("hidden");
    damier.classList.remove("hidden");
    newGame.startHand();
})

document.querySelector(".user-message").lastChild.textContent = "What do you want to do"

// The game interface :
const newGame = new Game();

