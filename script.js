var HP = ["slytherin", "voldemort", "horcrux", "dumbledore", "hogwarts", "mcgonagall", "expelliarmus"];
var NATIONS = ["armenia", "belarus", "cambodia", "denmark", "estonia", "finland", "georgia", "hungary", "iceland",
    "jamaica", "kyrgyzstan", "liberia", "mexico", "norway", "oman", "peru", "romania", "suriname", "thailand", "uruguay", "venezuela", "yemen", "zambia"];
var POLI = ["trump", "merkel", "solberg", "amlo", "netanyahu", "modi", "trudeau", "jinping"];
var MISC = ["nitwit", "alien", "seafood", "deuteronomy", "boy", "mathematics", "xylophone", "lazy"];
var WORD;
var GUESSES;
var GUESSEDLETTERS =[];
var ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function getRandom(arr){
   return Math.floor(Math.random() * (arr.length - 1));
}

function startGame(){
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
    button.onclick = function() {guessLetter()};
    button.innerHTML = "Guess";
    button.setAttribute("class", "w3-button w3-round w3-white w3-border w3-border-blue");
    container.appendChild(button);
}

function chooseCategory(){
    var cat = document.getElementById("categories").value;
    if (cat === "hp"){
        WORD = HP[getRandom(HP)];
    } else if (cat === "nations"){
        WORD = NATIONS[getRandom(NATIONS)];
    } else if (cat === "poli"){
        WORD = POLI[getRandom(POLI)];
    } else {
        WORD = MISC[getRandom(MISC)];
    }
    console.log(cat);
    console.log(WORD);
    GUESSES = 10;
    var blanks = document.getElementById("blanks");
    blanks.innerHTML = "";
    for (var i = 0; i < WORD.length; i++){
        blanks.innerHTML += "_";
    }
}

function guessLetter(){
    var select = document.getElementById("currentLetterGuess");
    if (GUESSES > 0 && !hasBeenGuessed(select.value) /*&& !select.options[ALPHABET.indexOf(select.value)].disabled*/ {
        printWord(select.value);
        GUESSES--;
        select.options[ALPHABET.indexOf(select.value)].disabled = true;
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
    // assuming that the letter has not been guessed already
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