class Player {
    constructor() {
        this.score = 0;
        this.deck = [];
    }
    pickCard(card) {
        this.deck.push(card);
        console.log(this.deck);
        this.score += this.deck[this.deck.length-1].power;
        console.log(`You're now at ${this.score}, do you want to pick another card ?`);
    }
}
class Dealer {
    constructor() {
        this.score = 0;
        this.deck = [];
    } 
    pickCardDealer(card) {
        this.deck.push(card);
        console.log(this.deck);
        this.dealer.score += this.deck[this.deck.length-1].power;
        console.log(`The dealer is now at ${this.score}.`);
    }
}

class Game {
    constructor() {
        this.tableDeck = shuffleDeck(); 
        this.dealer = new Dealer();
        this.player = new Player();
    }
    
    throwACard() {
        this.tableDeck.pop()
    }
    
    removeTopCard() {
        return this.tableDeck.pop();
    }

   
    pickWithoutDisplayDealer() {
        this.dealer.deck.push(this.tableDeck.pop());
    }
    
    revealDealer() {
        this.dealer.score = 0;
        for (let i = 0; i < this.dealer.deck.length; ++i) {
            this.dealer.score += this.dealer.deck[i].power
        }
    }
    
    playTheGame() {
        this.pickCardPlayer(this.removeTopCard());
        this.pickCardDealer(this.removeTopCard());
        this.pickCardPlayer(this.removeTopCard());
        this.pickWithoutDisplayDealer();
        let callPlayer = prompt("")
        if (callPlayer == "Y" ){}
    }
    
    }