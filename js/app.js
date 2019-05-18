// Global variable to count turns
let i = 0;
let cardsList = [];
let previous_card = 0;
let minutes = 0;
let seconds = 0;

// Move counter
function countMoves() {
    const count = document.querySelector(".moves");
    i += 1;
    count.innerHTML = i;
}

// Timer
function pad(value) {
    if (value.toString().length < 2) {
        return "0".concat(value.toString())
    }
    else {
        return value
    }
}

function gameTimer() {
    timer = setInterval(function() {
        seconds = seconds + 1;
        document.querySelector(".secondsLabel").innerHTML = pad(seconds % 60);
        document.querySelector(".minutesLabel").innerHTML = pad(parseInt(seconds / 60));
    }, 1000);
}

// Open Winner Modal
function winMessage() {
    const winModal = document.getElementById("winner");
    winModal.showModal();
}

// List to hold open cards
function openCardsList(card) {
    if (cardsList.length == 2 || cardsList.length == 0) {
        cardsList = [];
        cardsList.push(card);
    }
    else {
        cardsList.push(card);
        if (cardsList[0].firstElementChild.classList.value == cardsList[1].firstElementChild.classList.value) {
            for (let card of cardsList) {
                card.classList.remove("open", "show");
                card.classList.add("match");
            }
        }
        else {
            for (let card of cardsList) {
                setTimeout(function() { card.classList.remove("open", "show") }, 500);
            }
        }
        countMoves()
    }
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
    // Reset all trackers
    const count = document.querySelector(".moves");
    count.innerHTML = "0";
    document.querySelector(".secondsLabel").innerHTML = '00';
    document.querySelector(".minutesLabel").innerHTML = '00';
    for (let star of document.querySelectorAll(".fa-star")) {
        star.style.color = "#6DFAAA";
    }
    seconds = 0;
    i = 0;
    previous_card = 0;
    // Empty card array
    while (cardsList.length > 0) {
        cardsList.pop();
    }
}

// Establish game on DOMload
document.addEventListener('DOMContentLoaded', function() {
    createGame();
    // const restart = document.querySelector(".restart");
    // restart.addEventListener("click", createGame());

})

// Show cards
function showCard(card) {
    card.classList.add("open", "show");
    let openCards = openCardsList(card);
    if (i > 15) {
        document.getElementById("star-three").style.color = "white";
        document.getElementById("star-three-final").style.color = "white";
    }
    if (i > 20) {
        document.getElementById("star-two").style.color = "white";
        document.getElementById("star-two-final").style.color = "white";
    }
    if (document.querySelectorAll(".match").length == 16) {
        document.querySelector(".moves-final").innerHTML = i;
        const totalSeconds = seconds;
        clearInterval(timer)
        for (let secs of document.querySelectorAll(".secondsLabel")) {
            secs.innerHTML = pad(totalSeconds % 60);
        }
        for (let mins of document.querySelectorAll(".minutesLabel")) {
            mins.innerHTML = pad(parseInt(totalSeconds / 60));
        }
        winMessage();
    }
}

// Monitor clicks and play game
document.addEventListener("click", function(event) {
    if (event.target.parentElement.matches(".restart")) {
        clearInterval(timer)
        createGame();
    }
    if (event.target.matches(".card")) {
        const card = event.target;
        if (previous_card == 0) {
            previous_card = card;
            showCard(card);
            gameTimer();
        }
        else if (card.id != previous_card.id) {
            previous_card = card;
            showCard(card);
        }
    }
    if (event.target.matches("#hide")) {
        document.getElementById("winner").close();
    }
    if (event.target.matches("#restart")) {
        document.getElementById("winner").close();
        createGame();
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
