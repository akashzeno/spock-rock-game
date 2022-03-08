import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreElement = document.querySelector('#playerScore');
const playerChoiceElement = document.querySelector('#playerChoice');
const computerScoreElement = document.querySelector('#computerScore');
const computerChoiceElement = document.querySelector('#computerChoice');
const resultElement = document.querySelector('#resultText');
const resetElement = document.querySelector('.reset-icon');

const allGameIconsPlayer = document.querySelectorAll('.playerIcon');
const allGameIconsComputer = document.querySelectorAll('.computerIcon');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};


function computerRandomChoice(userChoice) {
  const randomNumber = Math.floor(Math.random() * 5);
  const computerChoice = Object.keys(choices)[randomNumber];
  allGameIconsComputer.forEach(icon => icon.classList.remove('selected'));
  allGameIconsComputer[randomNumber].classList.add('selected');
  computerChoiceElement.textContent = ` --- ${allGameIconsComputer[randomNumber].title}`;
  checkWin(computerChoice, userChoice);
}

function checkWin(computerChoice, userChoice) {
    if (choices[computerChoice].defeats.includes(userChoice)) {
        resultElement.textContent = 'Computer wins!';
        computerScoreElement.textContent = Number(computerScoreElement.textContent) + 1;
    } else if (choices[userChoice].defeats.includes(computerChoice)) {
        startConfetti();
        resultElement.textContent = 'You win!';
        playerScoreElement.textContent = Number(playerScoreElement.textContent) + 1;
    } else {
        resultElement.textContent = 'Draw!';
    }

}

allGameIconsPlayer.forEach(icon => icon.addEventListener('click', ()=>{
    allGameIconsPlayer.forEach(iconAll => iconAll.classList.remove('selected'));
    stopConfetti();
    removeConfetti();
    icon.classList.add('selected');
    playerChoiceElement.textContent = ` --- ${icon.title}`;
    computerRandomChoice(icon.title.toLowerCase());
}));


// Resetting the game
resetElement.addEventListener('click', () => {location.reload()});
