var WORDS = ["nitwit", "alien", "seafood", "deuteronomy", "slytherin", "boy", "mathematics", "xylophone", "lazy"];
var HPWORDS = ["slytherin", "voldemort", "horcrux", "dumbledore", "hogwarts", "mcgonagall", "expelliarmus"];
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
    if (GUESSES > 0 && !hasBeenGuessed(letter)) {
        printWord(letter);
        GUESSES--;
    } else if (GUESSES > 0 && hasBeenGuessed(letter)){
        alert("You have already guessed that letter. Please pick another one.");
        return null;
    } else {
        alert("You have lost. Press 'Play' to try again.");
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
        } else {
            newBlanks += correctLetter(i);
        }
    }
    document.getElementById("blanks").innerHTML = newBlanks;
    if (newBlanks === WORD){
        alert("Congratulations! You won!");
        return null;
    }
    // assuming that the letter has not been guessed already, which is validated by hasBeenGuessed
    GUESSEDLETTERS.push(letter);
    document.getElementById("guessList").innerHTML = "Guessed letters: " + GUESSEDLETTERS.toString();
    document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + GUESSES;
}

// checks if the letter has been guessed already
function hasBeenGuessed(letter){
    return GUESSEDLETTERS.indexOf(letter) !== -1;
}

function correctLetter(i){
    var count = 0;
    for (var j = 0; j < GUESSEDLETTERS.length; j++){
        if (GUESSEDLETTERS[j] === WORD[i]){
            count++;
            var letter = WORD[i];
        }
    }
    if (count === 0){
        return "_";
    } else {
        return letter;
    }

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

    var categoryContainer = document.getElementById("selectCategory");
    var button = document.createElement("button");
    button.setAttribute("class", "w3-button w3-round w3-white w3-border w3-border-blue");
    button.onclick = function () { chooseCategory() };
    button.innerHTML = "Go";
    categoryContainer.appendChild(button);
}