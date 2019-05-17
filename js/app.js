// Global variable to count turns
var i = 0;
var cards = [];

// List to hold open cards
function openCardsList(card) {
    if (cards.length == 2) {
        cards = [];
        cards.push(card);
    }
    else {
        cards.push(card);
        if (cards[0].firstElementChild.classList.value == cards[1].firstElementChild.classList.value) {
            for (let card of cards) {
                card.classList.remove("open", "show");
                card.classList.add("match");
            }
        }
        else {
            for (let card of cards) {
                setTimeout(function() { card.classList.remove("open", "show") }, 500);
            }
        }
    }
}

// Move counter
function countMoves() {
    i += 1;
    return i;
}

// Create a list that holds all of your cards
function getCards() {
    const cards = document.querySelectorAll(".card");
    let cardsArray = Array.from(cards);
    return cardsArray;
}

function removeClass(card) {
    card.classList.remove("open", "show")
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Create game
function createGame() {
    let cards = getCards();
    cards = shuffle(cards);
    for (let card of cards) {
        document.querySelector(".deck").append(card);
        card.classList.remove("match", "open", "show");
    }
    // Set moves to 0
    const count = document.querySelector(".moves");
    count.innerHTML = "0";
}

// Establish game on DOMload
document.addEventListener('DOMContentLoaded', function() {
    createGame();
    const restart = document.querySelector(".restart");
    restart.addEventListener("click", createGame());
})

// Show cards
function showCard(card) {
    card.classList.add("open", "show");
    let openCards = openCardsList(card);
    const count = document.querySelector(".moves");
    countMoves()
    if (i > 15) {
        document.getElementById("star-three").style.color = "white";
    }
    if (i > 20) {
        document.getElementById("star-two").style.color = "white";
    }
    if (i > 25) {
        document.getElementById("star-one").style.color = "white";
    }
    count.innerHTML = i;

}

// Monitor clicks and play game
document.addEventListener("click", function(event) {
    if (event.target.parentElement.matches(".restart")) {
        createGame();
    }
    if (event.target.matches(".card")) {
        const card = event.target;
        showCard(card)
    }
}, false)

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
