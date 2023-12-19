let main = {
    'you': {'Score': '#your-score', 'div': '#yourCards', score: 0},
    'dealer': {'Score': '#dealer-score', 'div': '#dealerCards', score: 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = main['you'];
const DEALER = main['dealer'];

const hitsound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#hit-btn').addEventListener('click', blackJackHit);

document.querySelector('#stand-btn').addEventListener('click', blackJackStand);

document.querySelector('#deal-btn').addEventListener('click', blackJackDeal);

function blackJackHit() {
    if (main['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

async function blackJackStand() {
    main['isStand'] = true;

    while (DEALER['score'] < 16 && main['isStand'] === true) {

        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    main['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);        
}

function blackJackDeal() {
    if (main['turnsOver'] === true) {

        main['isStand'] = false;
        
        let yourImages = document.querySelector('#yourCards').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealerCards').querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove(); 
        }  
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove(); 
        }
        
        YOU['score'] = 0;
        DEALER['score'] = 0;
        
        document.querySelector(YOU['Score']).textContent = YOU['score'];
        document.querySelector(YOU['Score']).style.color = 'white';

        document.querySelector(DEALER['Score']).textContent = DEALER['score'];
        document.querySelector(DEALER['Score']).style.color = 'white';
        
        document.querySelector('#results').textContent = "Let's Play";
        document.querySelector('#results').style.color = 'white';
        
        main['turnsOver'] = false;
    }
}

function showCard(card, activePlayer) {
    if (activePlayer['score']<=21) {
        let cardImage = document.createElement('img');
        cardImage.src = 'images/'+ card +'.png';
        cardImage.style.height= '150px';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }

}

function randomCard() {
    let rand = Math.floor(Math.random() * 13);
    return main['cards'][rand];
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + main['cardMap'][card][1] <= 21) {
            activePlayer['score'] += main['cardMap'][card][1];       
        } else{
            activePlayer['score'] += main['cardMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += main['cardMap'][card];
    } 
}

function showScore(activePlayer) {
    if (activePlayer['score']>21) {
        document.querySelector(activePlayer['Score']).textContent = "BUST!"
        document.querySelector(activePlayer['Score']).style.color = 'red';
    }else {
    document.querySelector(activePlayer['Score']).textContent = activePlayer['score'];
    }
    
}

function computeWinner() {
    let winner;

    if (YOU['score']<=21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            main['wins']++;
            winner = YOU ;            
        }
        else if (YOU['score'] < DEALER['score']){
            main['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']){
            main['draws']++;
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        main['losses']++;
        winner = DEALER;
    }    
    else if (YOU['score']>21 && DEALER['score']>21){
        main['draws']++;
    }
    console.log("Wins:", main['wins']);
    console.log('Losses:', main['losses']);
    console.log("draws:", main['draws']);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (main['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = main['wins'];
            message = "You Won!";
            messageColor = "green";
            winSound.play();          
        }
        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = main['losses'] ;
            message = "You Lost!";
            messageColor = "red";
            lossSound.play();
        }
        else {
            document.querySelector('#draws').textContent = main['draws'] ;
            message = "You DREW!";
            messageColor = "black";
        }
    
        document.querySelector('#results').textContent = message;
        document.querySelector('#results').style.color = messageColor;
    }
}