var HP = ["slytherin", "voldemort", "horcrux", "dumbledore", "hogwarts", "mcgonagall", "expelliarmus"];
var NATIONS = ["armenia", "belarus", "cambodia", "denmark", "estonia", "finland", "georgia", "hungary", "iceland",
    "jamaica", "kyrgyzstan", "liberia", "mexico", "norway", "oman", "peru", "romania", "suriname", "thailand", "uruguay", "venezuela", "yemen", "zambia"];
var POLI = ["trump", "merkel", "gorbachev", "modi", "trudeau", "jinping", "putin", "abe", "kirchner", "allende", "mobutu",
    "mandela", "nasser", "nehru", "khomeini", "minh", "moctezuma", "honecker", "thatcher", "stoltenberg", "tfwala"];
var MISC = ["nitwit", "alien", "seafood", "deuteronomy", "boy", "mathematics", "xylophone", "lazy"];
var WORD;
var GUESSES;
var GUESSEDLETTERS;
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
    select.style.visibility = "hidden";
    container.appendChild(select);
    var button = document.createElement("button");
    button.onclick = function() {guessLetter()};
    button.innerHTML = "Guess";
    button.setAttribute("id", "guessButton");
    button.setAttribute("class", "w3-button w3-round w3-white w3-border w3-border-blue");
    button.disabled = true;
    container.appendChild(button);
}

function chooseCategory(){
    document.getElementById("currentLetterGuess").style.visibility = "visible";
    document.getElementById("guessButton").disabled = false;
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
    console.log(WORD);
    GUESSES = 10;
    GUESSEDLETTERS = [];
    document.getElementById("guessList").innerHTML = "Guessed letters: " + GUESSEDLETTERS.toString();
    document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + GUESSES;
    var select = document.getElementById("currentLetterGuess");
    for (var i = 0; i < 26; i++){
        select.options[i].disabled = false;
    }
    document.body.style.backgroundImage = "url('dw10.gif')";
    var blanks = document.getElementById("blanks");
    blanks.innerHTML = "";
    for (var i = 0; i < WORD.length; i++){
        blanks.innerHTML += "_";
    }
}

function guessLetter(){
    var select = document.getElementById("currentLetterGuess");
    if (GUESSES > 0 && !hasBeenGuessed(select.value)) {
        printWord(select.value);
        GUESSES--;
        document.body.style.backgroundImage = "url('dw" + GUESSES.toString() + ".gif')";
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
        alert("Congratulations! You won! Press 'Start' to play again.");
        document.getElementById("guessButton").disabled = true;
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