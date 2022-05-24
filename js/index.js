//need to initialize prompt sync to test the game in JS console
const prompt = require('prompt-sync')();

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

function initializeAGame() {
    for (let i = 0; i < 6; ++i) {
        gameDeck.push(makeADeck());
    }
    gameDeck = gameDeck.flat()
}

initializeAGame();

function pickCards() {
    return getRandomSelection(gameDeck.length, gameDeck)
}

// console.log(pickCards())
// console.log(gameDeck.length);
console.log(pickCards())
// console.log(gameDeck.length);

class Game {
constructor() {
this.tableDeck = pickCards(); 
this.dealersScore = 0;
this.playerScore = 0;
this.playersDeck = [];
this.dealersDeck = [];
}

throwACard() {
    this.tableDeck.pop()
}

pickCardPlayer() {
    this.playersDeck.push(this.tableDeck.pop());
    console.log(this.playersDeck);
    this.playerScore += this.playersDeck[this.playersDeck.length-1].power;
    console.log(`You're now at ${this.playerScore}, do you want to pick another card ?`);
}

pickCardDealer() {
    this.dealersDeck.push(this.tableDeck.pop());
    console.log(this.dealersDeck);
    this.dealersScore += this.dealersDeck[this.dealersDeck.length-1].power;
    console.log(`The dealer is now at ${this.dealersScore}.`);
}
pickWithoutDisplayDealer() {
    this.dealersDeck.push(this.tableDeck.pop());
}

revealDealer() {
    this.dealersScore = 0;
    for (let i = 0; i < this.dealersDeck.length; ++i) {
        this.dealersScore += this.dealersDeck[i].power
    }
}

playersMove() {
    let myGame = prompt("Do you want an additional card ?");
    if (myGame == "Y" ||myGame == "y") {
        pickCardPlayer();
        console.log("Your score : ", this.playerScore)
    } else if (myGame == "N" || myGame == "n") {
        break;
    }
}

}
// The game interface :
newGame = new Game;

   
 


// STDIN("Why???")

