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

function fillBlanks(word, puzzleState, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) === letter) {
            puzzleState[i] = letter;
        }
    }
    return puzzleState;
}

function setupRound(word) {
    var newRound = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(word)
    }
    return newRound;
}

function updateRound(thisRound, letterGuessed) {
    if (isCorrectGuess(thisRound.word, letterGuessed)) {
        thisRound.puzzleState = fillBlanks(thisRound.word, thisRound.puzzleState, letterGuessed);
    }
    else {
        console.log("wrong guess");
        thisRound.wrongGuesses.push(letterGuessed);
        thisRound.guessesLeft--;
    }
}

function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false;
        }
    }
    return true;
}

function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    else {
        return false;
    }
}

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

function setupGame(randomWords, numWins, numLosses) {
    var game = {
        words: randomWords,
        wins: numWins,
        losses: numLosses,
        round: setupRound(randomWord(randomWords))
    }
    return game;
}

function startNewRound(game) {
    
    if (hasLost(game.round.guessesLeft)) {
        game.losses++;
        modelText.innerHTML = "You have lost! The characters name was: " + game.round.word;
        $("#alert-modal").modal("show");

    }
    else if (hasWon(game.round.puzzleState)) {
        game.wins++;
        modelText.innerHTML = "You have won! The characters name was: " + game.round.word;
        $("#alert-modal").modal("show");
    }

    game.round = setupRound(randomWord(game.words));
    
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

function clickme(letter) {

    myRound = updateRound_fix(myRound, letter);
    document.getElementById("guesses-left").textContent = myRound.guessesLeft;
    document.getElementById('letter_' + letter).setAttribute("disabled", "disabled");

    if (isCorrectGuess(randomgameWord, letter)) {
        puzzleState = fillBlanks(randomgameWord, secret, letter); 
        woncheck = hasWon(puzzleState);
    }
    else {
        lostcheck = hasLost(myRound.guessesLeft);
    }

    endofround = isEndOfRound(myRound); 
    //console.log(endofround);

    startmyRound = startNewRound_fix(myRound);
    document.getElementById("puzzle-state").innerHTML = replaceText(puzzleState.join(' '));

}

function startNewRound(testGame_obj) {
    if (testGame_obj.round.puzzleState.indexOf("_") == -1 && testGame_obj.round.guessesLeft > 0) {
        alert("winner winner chiken dinner" + testGame_obj.round.word);
        testGame_obj.wins++;
        //console.log("win game");
        return true;
    }
    else if (testGame_obj.round.puzzleState.indexOf("_") > -1 && testGame_obj.round.guessesLeft == 0) {
        alert("lose" + testGame_obj.round.word);
        testGame_obj.losses++;
        //console.log("lose game");
        return false;
    }
}


function glowMe(status) {
    if (status == "losses") {
        // glow effect win
        document.getElementById("title_l").setAttribute("id", "title_l_glow");
        document.getElementById("loss-counter").setAttribute("id", "loss-counter_glow");
        setTimeout(function () {
            document.getElementById("title_l_glow").setAttribute("id", "title_l");
            document.getElementById("loss-counter_glow").setAttribute("id", "loss-counter");
        }, 700);
    }
    else if (status == "wins") {
        // glow effect win
        document.getElementById("title_w").setAttribute("id", "title_w_glow");
        document.getElementById("win-counter").setAttribute("id", "win-counter_glow");
        setTimeout(function () {
            document.getElementById("title_w_glow").setAttribute("id", "title_w");
            document.getElementById("win-counter_glow").setAttribute("id", "win-counter");
        }, 700);
    }
}

function startNewRound_fix(testGame_obj) {
    if (testGame_obj.round.puzzleState.indexOf("_") == -1 && testGame_obj.round.guessesLeft > 0) {
        testGame_obj.wins++;
        document.getElementById("wins").textContent = testGame_obj.wins;
        glowMe("wins");

        //console.log("win game");
        buttonEnd();
        return true;
    }
    else if (testGame_obj.round.puzzleState.indexOf("_") > -1 && testGame_obj.round.guessesLeft == 0) {
        testGame_obj.losses++;
        document.getElementById("losses").textContent = testGame_obj.losses;
        glowMe("losses");

        //console.log("lose game");

        showsecret();
        buttonEnd();
        return false;
    }
}

