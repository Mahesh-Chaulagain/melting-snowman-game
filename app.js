const words=[
    'JAVASCRIPT',
    'HTML',
    'CSS',
    'NODE',
    'REACT',
    'ANGULAR',
    'JQUERY',
    'VUE',
    'LIBRARY',
    'DATABASE'
];

const maxWrongGuesses = 6;

let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;

// select a random word from the word array
function selectRandomWord(){
    return words[Math.floor(Math.random() * words.length)]; 
}

// initialize the game 
function initializeGame(){
    wordToGuess = selectRandomWord(); // set to randomly selected word
    guessedLetters = Array(wordToGuess.length).fill('_');   // initilaize the array of underscores
    wrongGuesses = 0;

    // update the word display
    updateWordDisplay();
    updateMeltingSnowmanGraphic();

    // remove any previously generated buttons
    const lettersContainer = document.querySelector('.letters');
    while(lettersContainer.firstChild){
        lettersContainer.removeChild(lettersContainer.firstChild);
    }

    // generate the letter buttons
    for(let i = 0; i < 26; i++)
    {
        const letter = String.fromCharCode(65 + i);
        const button = document.createElement('button');
        button.innerText = letter;
        button.addEventListener('click',function(){
            handleGuess(letter);
        });
        lettersContainer.appendChild(button);
    }

    // clear any previous win/lose message
    const messageContainer = document.querySelector('.message');
    messageContainer.innerText = '';
}

function updateWordDisplay(){
    const wordContainer = document.querySelector('.word');
    wordContainer.innerText = guessedLetters.join(' ');
} 

function handleGuess(letter) {
    // if the letter has already been guessed, do nothing
    if (guessedLetters.includes(letter)) {
        return;
    }

    // add letter to the list of guessed letters
    guessedLetters.forEach((guessedLetter, index) => {
        if (wordToGuess[index] === letter) {
            guessedLetters[index] = letter;
        }
    });

    // if the letter is not in the hidden word, increment the wrong guesses count and update the graphic
    if (!wordToGuess.includes(letter)) {
        wrongGuesses++;
        updateMeltingSnowmanGraphic();
    }

    // update the word display
    updateWordDisplay();

    // check if the game has been won or lost
    checkWinOrLose();
}

function updateMeltingSnowmanGraphic(){
    const meltingSnowmanContainer = document.querySelector('.melting-snowman');
    meltingSnowmanContainer.innerHTML = `<img src="images/MeltingSnowman${imageCount}.png" alt="MeltingSnowman">`;
    imageCount++;
}

function checkWinOrLose(){
    if (guessedLetters.join('') === wordToGuess){
        const messageContainer = document.querySelector('.message');
        messageContainer.innerText = "you win!";
        const letterButtons = document.querySelectorAll('.letters button');
        letterButtons.forEach(button=>{
            button.disabled = true;
            button.removeEventListener('click', handleGuess);
        });
    }
    else if (wrongGuesses >= maxWrongGuesses){
        const messageContainer = document.querySelector('.message');
        messageContainer.innerText = `You lose, the word was "${wordToGuess}".`;
        const meltingSnowmanContainer = document.querySelector('.melting-snowman');
        meltingSnowmanContainer.innerHTML = `<img src="https://media.giphy.com/media/GD5zyZuqup1FWLF1yT/giphy.gif" alt="gameover">`;
        const letterButtons = document.querySelectorAll('.letters button');
        letterButtons.forEach(button => {
            button.disabled = true;
            button.removeEventListener('click', handleGuess);
        });
    }
}

// initialize the game when the page loads
window.addEventListener('load', initializeGame);