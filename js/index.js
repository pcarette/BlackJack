//need to initialize prompt sync to test the game in JS console
//const prompt = require('prompt-sync')();
// The game interface :
let newGame = new Game();


const startGame = document.getElementById("start-game");
const menuDisplayer = document.querySelector(".menu-displayer");
const damier = document.querySelector(".damier");
const hitButton = document.querySelector(".Hit");
const stayButton = document.querySelector(".Stay");
const userMessage = document.querySelector(".user-message").lastChild
const modalWrapped = document.querySelector(".wrapper");
const retryButton = document.getElementById("retry");



startGame.addEventListener("click", () => {
    menuDisplayer.classList.add("hidden");
    damier.classList.remove("hidden");
    newGame.startHand();
    giveCard('player')
    setTimeout(()=>{userMessage.parentElement.classList.remove("hidden")}, 2000)
})

function assignImagePlayer(slot, gamer=newGame.player) {
    let card = document.querySelector(`.card-slot.player-${slot+1}`)
    card.append(gamer.deck[slot].image);
    userMessage.textContent = `The dealer is now at ${newGame.dealer.getScore()}, you are at ${newGame.player.getScore()}`
    if (newGame.player.getScore() === 21) {
        userMessage.textContent = "You have BlackJack, it's dealer's turn."
        setTimeout(() => {
           stayButton.click(); 
        }, 2000) 
    } 
}
function assignImageDealer(slot, gamer=newGame.dealer) {
    let card = document.querySelector(`.card-slot.dealer-${slot+1}`)
    console.log(gamer.deck);
    console.log(slot);
    card.append(gamer.deck[slot].image);
    newGame.dealer.deck.slice(0, slot+1) 
    userMessage.textContent = `The dealer is now at ${newGame.dealer.getScore()}, you are at ${newGame.player.getScore()}`
    // IMPORTANT
}
function giveCard() {

    const baseTimeout = 250
    for (let i = 0; i<newGame.player.deck.length; ++i) {
        setTimeout(() => assignImagePlayer(i, newGame.player), baseTimeout + (500 *(i +1)) );
    }
    setTimeout(() => assignImageDealer(0, newGame.dealer), 500)
    userMessage.textContent = `You're now at ${newGame.player.getScore()}, do you hit or stay ?`
}

hitButton.addEventListener("click", () => {
    if (newGame.player.deck.length === 5) {
        userMessage.textContent = `You can't pick more cards, it's on the dealer.`;
        while (newGame.dealer.getScore() < 17) {
            let i = newGame.dealer.deck.length;
            setTimeout(() => assignImageDealer(i, newGame.dealer), (500 *(i +1)) );
            newGame.dealer.pickCard(newGame.removeTopCard());
        }
    } else {
    let rangePlayer = newGame.player.deck.length;
    newGame.player.pickCard(newGame.removeTopCard(newGame.removeTopCard()));
    assignImagePlayer(rangePlayer);

    userMessage.textContent = `You're now at ${newGame.player.getScore()}, do you hit or stay ?`;
    if (newGame.player.getScore() > 21) {
        userMessage.textContent = `You're over 21 (${newGame.player.getScore()}), you lose.`;
        setTimeout(() => {
            newGame.displayEndMessage('lose');
        }, 1000)
        
    }
    }
})

if (newGame.player.deck.length === 5) {
    clearInterval(messageDisplayer);
    userMessage.textContent = `You can't pick more cards, it's on the dealer.`;
    stayButton.click();
} else if (newGame.player.getScore() === 21) {
    userMessage.textContent = "You're at 21 ! It's BlackJack !"
}

function nextStep() {
    if (newGame.dealer.getScore() < 17 && newGame.dealer.deck.length < 5) {
        let i = newGame.dealer.deck.length;
        newGame.dealer.pickCard(newGame.removeTopCard());
        console.log(newGame.dealer.deck);
        assignImageDealer(i, newGame.dealer)

        setTimeout(nextStep, 1500)
    } else {
        setTimeout(() => {
            if (newGame.dealer.getScore() < newGame.player.getScore() && newGame.player.getScore() <= 21) {
                newGame.displayEndMessage("win");
    
            } else if ((newGame.dealer.getScore() > newGame.player.getScore() && newGame.dealer.getScore() <= 21)) {
                newGame.displayEndMessage("lose");
            } else if (newGame.dealer.getScore() > 21) {
                newGame.displayEndMessage("win");
            } else {
                newGame.displayEndMessage("tie")
            }
        }, 1000)
    }
}

stayButton.addEventListener("click", () => {
    newGame.dealer.startShowingCards()
    assignImageDealer(1, newGame.dealer)
    setTimeout(nextStep, 1500)
})

retryButton.addEventListener("click", () => {
    document.querySelectorAll(".card-slot").forEach(cardSlot => cardSlot.innerHTML = "")
    newGame = null;
    newGame = new Game();
    modalWrapped.classList.add("hidden");
    startGame.click()
})
