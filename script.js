var WORDS = ["nitwit", "alien", "seafood", "deuteronomy", "slytherin", "boy", "mathematics", "xylophone", "lazy"];
var WORD = WORDS[getRandom(WORDS)];
var GUESSES = WORD.length - 1;
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
    if (GUESSES > 0 && !hasBeenGuessed(letter)) {
        GUESSEDLETTERS.push(letter);
        printWord(WORD, letter);
        GUESSES--;
    } else if (GUESSES > 0 && hasBeenGuessed(letter)){
        alert("You have already guessed that letter. Please pick another one.");
        return null;
    } else {
        alert("You have used up all of your guesses. Please reload the page and try again.");
        return null;
    }
}

function printWord(letter){
    // updates the underscore word
    var newBlanks = "";
    for (var i = 0; i < WORD.length; i++) {
        if (WORD[i] === letter) {
            // fills in the letter
            newBlanks += letter;
        } else if(WORD[i] !== letter){
            if (correctLetterIndex() !== -1){
                newBlanks += WORD[correctLetterIndex()];
            } else {
                newBlanks += "_";
            }
        }
    }
    document.getElementById("blanks").innerHTML = newBlanks;
    // assuming that the letter has not been guessed already, which is validated by hasBeenGuessed
    document.getElementById("guessList").innerHTML = "Guessed letters: " + GUESSEDLETTERS.toString();
    document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + GUESSES;
}

// checks if the letter has been guessed already
function hasBeenGuessed(letter){
    return GUESSEDLETTERS.indexOf(letter) !== -1;
}

function correctLetterIndex(){
    for (var i = 0; i < GUESSEDLETTERS.length; i++){
        if (WORD.includes(GUESSEDLETTERS[i])){
            return WORD.indexOf(GUESSEDLETTERS[i]);
        }
    }
    return -1;
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