//need to initialize prompt sync to test the game in JS console
//const prompt = require('prompt-sync')();
// The game interface :
const newGame = new Game();


const startGame = document.getElementById("start-game");
const menuDisplayer = document.querySelector(".menu-displayer");
const damier = document.querySelector(".damier");
const hitButton = document.querySelector(".Hit");
const stayButton = document.querySelector(".Stay");
const userMessage = document.querySelector(".user-message").lastChild



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
}
function assignImageDealer(slot, gamer=newGame.dealer) {
    let card = document.querySelector(`.card-slot.dealer-${slot+1}`)
    console.log(gamer.deck)
    console.log(slot);
    card.append(gamer.deck[slot].image);
}
function giveCard(player) {

    const baseTimeout = 250
    for (let i = 0; i<newGame.player.deck.length; ++i) {
        setTimeout(() => assignImagePlayer(i, newGame.player), baseTimeout + (500 *(i +1)) );
        setTimeout(() => assignImageDealer(i, newGame.dealer), (500 *(i +1)) )
    }
}

messageDisplayer = setInterval(()=>{
    userMessage.textContent = `You're now at ${newGame.player.score}, do you hit or stay ?`
}, 100)

hitButton.addEventListener("click", () => {
    if (newGame.player.deck.length === 5) {
        clearInterval(messageDisplayer);
        userMessage.textContent = `You can't pick more cards, it's on the dealer.`;
        while (newGame.dealer.trackScore() < 17) {
            let i = newGame.dealer.deck.length;
            setTimeout(() => assignImageDealer(i, newGame.dealer), (500 *(i +1)) );
            newGame.dealer.pickCard(newGame.removeTopCard());
        }
    } else {
    let rangePlayer = newGame.player.deck.length;
    newGame.player.pickCard(newGame.removeTopCard(newGame.removeTopCard()));
    assignImagePlayer(rangePlayer);
    newGame.player.trackScore();
    }
})

stayButton.addEventListener("click", () => {

    while (newGame.dealer.trackScore() < 17 && newGame.dealer.deck.length < 5) {
        let i = newGame.dealer.deck.length;
        setTimeout(() => assignImageDealer(i, newGame.dealer), (500 *(i +1)) );
        newGame.dealer.pickCard(newGame.removeTopCard());
        console.log(newGame.dealer.deck);
    }
    clearInterval(messageDisplayer);
    messageDisplayer = setInterval(()=>{
        userMessage.textContent = `The dealer is now at ${newGame.dealer.score}, you are at ${newGame.player.score}`
    }, 100)
})