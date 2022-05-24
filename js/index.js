//need to initialize prompt sync to test the game in JS console
//const prompt = require('prompt-sync')();

const startGame = document.getElementById("start-game");
const menuDisplayer = document.querySelector(".menu-displayer");
const damier = document.querySelector(".damier");
startGame.addEventListener("click", () => {
    menuDisplayer.classList.add("hidden");
    damier.classList.remove("hidden");
})
//Now we declare the variables to build the game :
const suits = ["Coeur", "Carreau", "Pique", "Trefle"];
const values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "V", "D", "R"];
let gameDeck = [];
let dealerVictories = 0;
let playerVictories = 0;
let ties = 0;

// Those 2 fonctions are necessay to shuffle our 6 decks of cards :
function fisherYatesShuffle(arr) {
    for (let i = arr.length; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = arr[j]
      arr[j] = arr[i - 1]
      arr[i - 1] = temp
    }
    return arr;
  }

function getRandomSelection(n, array) {
    const cloned = Array.from(array)
    const shuffled = fisherYatesShuffle(array)
    const selected = shuffled.slice(0, n)
    return selected
  }

//We build a Card class to build our cards

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.power;
        this.image
        if (typeof value === "number") {
            this.power = value;
        } else if (value === "V" || value === "D" || value === "R") {
            this.power = 10;
        } else {
            this.power = 1;
        }
    }
}

//Then we make our deck

function makeADeck() {
    let deck = [];
    for (let i = 0; i < suits.length; ++i) {
        for (let j = 0; j < values.length; ++j) {
            const card = new Card(suits[i], values[j]);
            deck.push(card);
        }
    } return deck;
}

//for this game, we will reinitialize our decks each round, but to avoid predictibility
//we will shuffle 6 decks of cards :

function make6Decks() {
    for (let i = 0; i < 6; ++i) {
        gameDeck.push(makeADeck());
    }
    gameDeck = gameDeck.flat()
}

make6Decks();

function shuffleDeck() {
    return getRandomSelection(gameDeck.length, gameDeck)
}

// console.log(pickCards())
// console.log(gameDeck.length);
console.log(shuffleDeck())
// console.log(gameDeck.length);

// The game interface :
const newGame = new Game();

