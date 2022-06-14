const cards = document.querySelectorAll('.card'); // todas as cartas
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() { // se as cartas forem iguais, chamará a função disableCards
    if(firstCard.dataset.card === secondCard.dataset.card) { // dataset está como undefined
        disableCards();
        return;
    } // se forem diferentes, chamará a função unflipCards

    unflipCards();
}

function disableCards() { //função que reseta as cartas
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard(); //lockBoard = false;
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => { // cards.forEach() 
    card.addEventListener('click', flipCard);
    console.log("clicado");
});