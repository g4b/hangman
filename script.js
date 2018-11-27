var WORDS = ["nitwit", "alien", "seafood", "deuteronomy", "slytherin", "boy", "mathematics", "xylophone", "lazy"];
var WORD = WORDS[getRandom(WORDS)];
var GUESSES = WORD.length;
var GUESSEDLETTERS =[];
console.log(WORD);

function getRandom(arr){
   return Math.floor(Math.random() * (arr.length - 1));
}

function startGame(){
    var blanks = document.getElementById("blanks");
    for (var i = 0; i < WORD.length; i++){
        blanks.innerHTML += "_";
    }
}

function guessLetter(){
    var letter = document.getElementById("currentLetterGuess").value.toString();
    GUESSES--;
    if (GUESSES > 0){
        printWord(WORD, letter);
    } else {
        alert("You have used up all of your guesses.");
    }
}

function printWord(word, letter){
    for (var i = 0; i < word.length; i++){
        if (word[i] === letter){
            document.getElementById("blanks").innerHTML[i] = letter;
        }
    }
    GUESSEDLETTERS.push(letter);
    document.getElementById("guessList").innerHTML = "Guessed letters: " + GUESSEDLETTERS.toString();
}