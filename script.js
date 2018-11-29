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
    if (GUESSES > 0 && !hasBeenGuessed(letter)){
        printWord(WORD, letter);
        GUESSES--;
    } else if (hasBeenGuessed(letter)){
        alert("You have already guessed that letter. Please choose another one.");
        // if letter has been guessed already, I don't take away a second guess
        return null;
    } else {
        alert("You have used up all of your guesses. Please reload the page and try again.");
        return null;
    }
}

function printWord(word, letter){
    // updates the underscore word
    var newBlanks = document.getElementById("blanks").innerHTML;
    for (var i = 0; i < word.length; i++){
        if (word[i] === letter && newBlanks[i] === "_"){
            // fills in the letter
            newBlanks[i] = letter;
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
    for (var i = 0; i < GUESSEDLETTERS.length; i++){
        if (GUESSEDLETTERS[i] === letter){
            return true;
        }
    }
    return false;
}

function inWord(word, letter){
    for (var i = 0; i < word.length; i++){
        if (word[i] === letter){
            return true;
        }
    }
    return false;
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
    button.setAttribute("onclick", "guessLetter()");
    button.innerHTML = "Go";
    container.appendChild(button);
}