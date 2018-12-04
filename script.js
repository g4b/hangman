var WORDS = ["nitwit", "alien", "seafood", "deuteronomy", "slytherin", "boy", "mathematics", "xylophone", "lazy"];
var WORD = WORDS[getRandom(WORDS)];
var GUESSES = WORD.length;
var GUESSEDLETTERS =[];
var ALPHABET = "abcdefghijklmnopqrstuvwxyz";
console.log(WORD);

function getRandom(arr){
   return Math.floor(Math.random() * (arr.length - 1));
}

function startGame(){
    populate();
    var blanks = document.getElementById("blanks");
    for (var i = 0; i < WORD.length; i++){
        blanks.innerHTML += "_";
    }
}

function guessLetter(){
    var letter = document.getElementById("currentLetterGuess").value;
    if (GUESSES > 0){
        printWord(WORD, letter);
        GUESSES--;
    } else {
        alert("You have used up all of your guesses. Please reload the page and try again.");
        return null;
    }
}

function printWord(word, letter){
    // updates the underscore word
    var newBlanks = "";
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter && !hasBeenGuessed(letter)) {
            // fills in the letter
            newBlanks += word[i];
        } else if (word[i] === letter && hasBeenGuessed(letter)){
            newBlanks += GUESSEDLETTERS[GUESSEDLETTERS.indexOf(letter)];
        } else if (word[i] !== letter && hasBeenGuessed(letter)){
            alert("That letter has been guessed already. Please pick another one.");
        } else {
            newBlanks += "_";
        }
    }
    document.getElementById("blanks").innerHTML = newBlanks;
    // assuming that the letter has not been guessed already, which is validated by hasBeenGuessed
    GUESSEDLETTERS.push(letter);
    document.getElementById("guessList").innerHTML = "Guessed letters: " + GUESSEDLETTERS.toString();
    document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + GUESSES;
}

// checks if the letter has been guessed already
function hasBeenGuessed(letter){
    return GUESSEDLETTERS.indexOf(letter) !== -1;
}

function populate(){
    var container = document.getElementById("guessBox");
    var select = document.createElement("select");
    select.setAttribute("id", "currentLetterGuess");
    for (var i = 0; i < 26; i++){
        var option = document.createElement("option");
        option.value = ALPHABET[i];
        option.innerHTML = ALPHABET[i];
        select.appendChild(option);
    }
    container.appendChild(select);
    var button = document.createElement("button");
    button.setAttribute("class", "w3-button w3-round w3-white w3-border w3-border-blue");
    button.onclick = function () { guessLetter() };
    button.innerHTML = "Go";
    container.appendChild(button);
}