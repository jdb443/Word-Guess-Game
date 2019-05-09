// Homework 3 Jonathan Behar

// GameWords Variable
var gameWords = [ "azorahai", "brandon", "castle", "dragon", "greyscale", "hackle", "hellbent", "hodor", "holdthedoor", "ironwood", "jonsnow", "khaleesi", "kingslayer", "lightbringer", "maester", "others", "ranging", "rootout", "samwell", "sire", "stark", "tyrion", "unman", "unsullied", "valyrian", "wall", "warg", "wetnurse","whitewalker", "wights", "wildlings", "winterfell"];
var allowedchars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "v", "x", "y", "z"]


var puzzleSection = document.getElementById("puzzle-state");
var wrongGuesses = document.getElementById("wrong-guesses");
var numGuesses = document.getElementById("guesses-left");
var winCounter = document.getElementById("win-counter");
var lossCounter = document.getElementById("loss-counter");
var modalText = document.getElementById("modal-text");

//mygame function
var myGame = setupGame(gameWords, 0, 0);
puzzleSection.innerHTML = printArray(myGame.round.puzzleState);

//RandomWord function
function randomWord (wordsArray) {
    var thronesIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[thronesIndex];
}

//isCorrectGuess function
function isCorrectGuess(word, letter) {
    if (word.includes(letter)) {
        return true;
    }
    else {
        return false;
    }
}

//getBlanks function
function getBlanks(word) {
    var blanksArray = [];
    for (var i = 0; i < word.length; i++) {
        blanksArray.push("_");
    }
    return blanksArray;
}

//fillBlanks function
function fillBlanks(word, puzzleState, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) === letter) {
            puzzleState[i] = letter;
        }
    }
    return puzzleState;
}

//setupRound function
function setupRound(word) {
    var newRound = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(word)
    }
    //return object
    return newRound;
}

//updateRound function
function updateRound(thisRound, letterGuessed) {
    if (isCorrectGuess(thisRound.word, letterGuessed)) {
        thisRound.puzzleState = fillBlanks(thisRound.word, thisRound.puzzleState, letterGuessed);
    }
    else if(!thisRound.wrongGuesses.includes(letterGuessed) && allowedchars.includes(letterGuessed)) {

        console.log("wrong guess");
        thisRound.wrongGuesses.push(letterGuessed);
        thisRound.guessesLeft--;
    }
}

//hasWon function
function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false;
        }
    }
    return true;
}

//hasLost function
function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    else {
        return false;
    }
}

//isEndOfRound function
function isEndOfRound(thisRound) {
    if (hasLost(thisRound.guessesLeft)) {
        return true;
    }
    else if (hasWon(thisRound.puzzleState)) {
        return true;
    }
    else {
        return false;
    }
}

//setupGame function
function setupGame(randomWords, numWins, numLosses) {
    var game = {
        words: randomWords,
        wins: numWins,
        losses: numLosses,
        round: setupRound(randomWord(randomWords))
    }
    return game;
}

// function startNewRound(game) {
    
//     if (hasLost(game.round.guessesLeft)) {
//         game.losses++;
//         modelText.innerHTML = "You have lost! The characters name was: " + game.round.word;
//         $("#alert-modal").modal("show");

//     }
//     else if (hasWon(game.round.puzzleState)) {
//         game.wins++;
//         modelText.innerHTML = "You have won! The characters name was: " + game.round.word;
//         $("#alert-modal").modal("show");
//     }

//     game.round = setupRound(randomWord(game.words));
    
// }

 


// function startNewRound(game) {
//     var puzzleState = game.round.puzzleState;
//     if (game.round.puzzleState.indexOf("_") == -1 && game.round.guessesLeft > 0) {
//         alert("winner " + game.round.word + "!");
//         game.wins++;
//         //console.log("win game");
//         return true;
//     }
//     else if (game.puzzleState.indexOf("_") > -1 && game.round.guessesLeft == 0) {
//         alert("lose" + game.round.word);
//         game.losses++;
//         //console.log("lose game");
//         return false;
//     }
// }

function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState) === true) {
        game.wins++;
        alert("Correct! To the King in the Seven Kingdoms! The word is " + game.round.word + "!");
    }
    else {
        game.losses++;
        alert("You Lose! Valar morghulis! The word was " + game.round.word + "!");
    }
    game.round = setupRound(randomWord(gameWords));
}

function printArray(array){
    var arrayAsString = "";
    for( var i = 0; i < array.length; i++){
        if( i === (array.length - 1)){
            arrayAsString += array[i];
        }
        else{
            arrayAsString += array[i] + " ";
        }
        
    }
    return arrayAsString;
}

document.addEventListener( 'keydown', function(e){
    console.log("letter played: " + e.key);

    var letterPlayed = e.key;

    updateRound(myGame.round, letterPlayed);
    
    if(isCorrectGuess(myGame.round.word, letterPlayed)){
        puzzleSection.innerHTML = printArray(myGame.round.puzzleState);

    }
    else{
        wrongGuesses.innerHTML = printArray(myGame.round.wrongGuesses);
        numGuesses.innerHTML = myGame.round.guessesLeft;
    }

    if(isEndOfRound(myGame.round)){
        startNewRound(myGame);

        console.log(myGame.round);

        //Update DOM
        puzzleSection.innerHTML = printArray(myGame.round.puzzleState);
        wrongGuesses.innerHTML = myGame.round.wrongGuesses;
        numGuesses.innerHTML = myGame.round.guessesLeft;
        winCounter.innerHTML = myGame.wins;
        lossCounter.innerHTML = myGame.losses;
 
    }   

});

// var keyPressed;
// document.onkeyup = function (evt) {
//     keyPressed = evt.key.toLowerCase() 
//     console.log("The " + keyPressed + " key was pressed");

//     // CALL BACK LOGIC
//     isCorrectGuess(myGame.round.word, keyPressed);
//     fillBlanks(myGame.round.word, myGame.round.puzzleState, keyPressed);
//     updateRound(myGame.round, keyPressed);
//     hasWon(myGame.round.puzzleState);
//     hasLost(myGame.round.guessesLeft);

//     // CHECKS IF GUESSES ARE LEFT OR HAS WON
//     if (isEndOfRound(myGame.round)){
//         myGame = startNewRound(myGame);
//         myGame.round = setupRound(randomWord(gameWords));
//     }
//     // --------- end CALL BACK THE LOGIC

//     // Uses the ramdom word and displays the empty blanks
//     document.getElementById("puzzle-state").innerText = myGame.round.puzzleState.join(" ");

//     // Displays the updated object for wrong guesses from user
//     document.getElementById("wrong-guesses").innerText = myGame.round.wrongGuesses;

//     // Displays the updated object for total wins
//     document.getElementById("win-counter").innerText = myGame.wins;

//     // Displays the updated object for total losses
//     document.getElementById("loss-counter").innerText = myGame.losses;

//     // Displays the updated object for number of guesses left
//     document.getElementById("guesses-left").innerText = myGame.round.guessesLeft;

//     console.log(myGame);

// } // ------------ end of onclick event




// RESET GAME
function gameReset() {
    setupRound(myGame.words)
    hasWon(myGame.round.puzzleState);
    updateRound(myGame.round, keyPressed);
    startNewRound(myGame);
    randomWord(myGame.words);
    isEndOfRound(myGame.round);
    hasLost(myGame.round.guessesLeft);
} // ------------ end of button click


