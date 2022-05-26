//Now we declare the variables to build the game :
const suits = ["h", "d", "c", "s"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
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
        this.image = new Image()
        this.image.src = `./images/cartes-gif/${this.value}${this.suit}.gif`;
        if (typeof value === "number") {
            this.power = value;
        } else if (value === "J" || value === "Q" || value === "K") {
            this.power = 10;
        } else {
            this.power = 1;
        }
    }
    displayCard() {
        
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
    return getRandomSelection(gameDeck.length, gameDeck);
}


class Player {
    constructor() {
        this.deck = [];
    }

    getScore() {
        let score = 0;
        this.deck.forEach(card => {
            score += card.power
        });
        if (score <= 11 && this.deck.some(card => card.value === "A")){
            score += 10;
        }
        return score;
    }
    
    pickCard(card) {
        console.log("ttttttt");
        this.deck.push(card);
        console.log(this.deck);
        console.log(`You're now at ${this.getScore()}, do you want to pick another card ?`);
    }
}

class Dealer extends Player {
    constructor() {
        super()
        this.isShowingCards = false
    }
    getScore() {
        if (!this.isShowingCards) {
            return this.deck[0].power
        }
        return super.getScore()
    }
    startShowingCards() {
        this.isShowingCards = true
    }
}

class Game {
    constructor() {
        this.tableDeck = shuffleDeck(); 
        this.dealer = new Dealer();
        this.player = new Player();
        this.modalWrapped = document.querySelector(".wrapper");
    }
    
    throwACard() {
        this.tableDeck.pop()
    }
    
    removeTopCard() {
        return this.tableDeck.pop();
    }

   
    startHand() {
        this.player.pickCard(this.removeTopCard());
        this.dealer.pickCard(this.removeTopCard());
        this.player.pickCard(this.removeTopCard());
        this.dealer.pickCard(this.removeTopCard());
    }
    
  // A REVOIR !!!  
    loseOrWinMessage() {
        if (this.dealer.getScore() < this.player.getScore()) {
            playerVictories++
            return "You win"
        } else if (this.dealer.getScore() > this.player.getScore()) {
            dealerVictories++
            return "You lose"
        } else {
            dealerVictories++
            playerVictories++
            return "It's a tie"
        }
    }

    displayEndMessage(state) {
        let message = state === 'win' ? 'You win !' : state === 'tie' ? "It's a tie !" : "You lose !"
        this.modalWrapped.querySelector('h2').textContent =  `The dealer is at ${this.dealer.getScore()}, you are at ${this.player.getScore()}. ${message}`
        this.modalWrapped.classList.remove('hidden');
    }
    }
//const hiddenFaceCard = new Card(null, null);

// hiddenFaceCard.image = ""