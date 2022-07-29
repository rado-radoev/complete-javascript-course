'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;

// document.querySelector('.guess').value = 10;
// console.log(document.querySelector('.guess').value);

let highScore = 0;
let score = 20;
let stillPlaying = true;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const generateSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

let secretNumber = generateSecretNumber();

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = generateSecretNumber();
  score = 20;
  stillPlaying = true;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (score === 0) {
    stillPlaying = false;
  }

  if (stillPlaying) {
    // When there's no input
    if (!guess) {
      displayMessage('⛔️ No number!');
      // When player wins
    } else if (guess === secretNumber) {
      displayMessage('🏆 Your guess is correct!');

      // Update the highscore
      if (score > highScore) {
        highScore = score;
      }
      document.querySelector('.highscore').textContent = highScore;

      // Change winning background
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      // Show the correct number
      document.querySelector('.number').textContent = secretNumber;

      // When guess is higher
    } else if (guess !== secretNumber) {
      displayMessage(
        guess > secretNumber
          ? '📈 Your guess is too high!'
          : '📉 Your guess is too low!'
      );
      document.querySelector('.score').textContent = --score;
    }
    // When there are no more points
  } else {
    displayMessage('☹️You loose!');
  }
});
