class Game {
    constructor() {
    this.tableDeck = shuffleDeck(); 
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
        } 
    }
    
    }