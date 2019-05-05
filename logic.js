// Homework 3 Jonathan Behar

var gameWords = ["hodor", "stark", "brandon", "winterfell", "samwell", "castle", "thyion", "dragon", "zombie"];
var allowedchars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "v", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "&", "?"]


var puzzleSection = document.getElementById("puzzle-state");
var wrongGuesses = document.getElementById("wrong-guesses");
var numGuesses = document.getElementById("guesses-left");
var winCounter = document.getElementById("win-counter");
var lossCounter = document.getElementById("loss-counter");
var modelText = document.getElementById("modal-text");

var myGame = setupGame(gameWords, 0, 0);
puzzleSection.innerHTML = printArray(myGame.round.puzzleState);

function randomWord (wordsArray) {
    var thronesIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[thronesIndex];
}

function isCorrectGuess(word, letter) {
    if (word.includes(letter)) {
        return true;
    }
    else {
        return false;
    }
}

function getBlanks(word) {
    var blanksArray = [];
    for (var i = 0; i < word.length; i++) {
        blanksArray.push("_");
    }
    return blanksArray;
}
