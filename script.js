const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let novoJogo;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip')//desvirar a carta
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();

    if(score == 12){
        score = 0;
        novoJogo = confirm("Parabéns!\nJogar novamente?");
        if(novoJogo){
            jogarNovamente();

        }else{
            return;
        }

    }
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score += 2;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function onInit() {

    unflipAllCards();

    flipAllCards();
    
    shuffleAllCards();

})(); //imediatly invocated funtcion


function jogarNovamente(){
    unflipAllCards();
    shuffleAllCards();

    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
    });

};

cards.forEach((card) => {
    card.addEventListener('click', flipCard);

});

function flipAllCards() { //virar as cartas
        cards.forEach((card) => {
            card.classList.add('flip')
        });
}

function unflipAllCards() { //desvirar todas as cartas
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('flip')
        })
    }, 1200);
}

function shuffleAllCards() {//embaralhar cartas
    setTimeout(() => {
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 12);
            card.style.order = randomPosition;
        })
    }, 1700)
}
