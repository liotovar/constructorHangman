var inquirer = require('inquirer');
var Game = require('./game.js');
var Letter = require('./letter.js');
var Word = require('./word.js');

var currentWord;
var remainingGuesses = 7;
var wins = 0;
var losses = 0;
var showPlayer = [];
var checkLetter = [];
var wordsPlayed = [];

function selectRandomWord(){
	var x = Math.floor(Math.random() * 20)
	currentWord = Game.possibleWords[x];

	if(wordsPlayed.includes(currentWord)){
		selectRandomWord();
	}
	else{
		showPlayer = new letter(currentWord);
		checkLetter = new Test(currentWord);
	}
	wordsPlayed.push(currentWord);
}

function restartGame(){
	inquirer.prompt([{
		name: `play`,
		message: `Play Again? (yes or no)`
	}]).then(function(answer){
		var confirm = answer.play.toLowerCase();
		if(confirm == `yes`){
			remainingGuesses = 7;
			checkLetter.lettersGuessed = [];
			currentWord = ``;
			checkLetter.currentWordArray = [];

			selectRandomWord();
			console.log(``);
			console.log(`Hangman - Chicago Sports`);
			console.log(``);
			console.log(`Guess a letter!`); 
			showPlayer.originalDisplay();
			console.log(``);
			console.log(`${remainingGuesses} Guesses Remaining!`);
			console.log(``);
			guessLetters();
		}
		else if(confirm == `no`){
			console.log(`Thank you for playing!`)
			console.log(``);
		}
		else{
			console.log(`Please select yes or no`);
			console.log(``);
			restartGame();
		}
	})
};



//START GAME
selectRandomWord();


//start display and instrictions
console.log(``);
console.log(``);
console.log(`Hangman - Chicago Sports`);
console.log(``);
console.log(`Guess a letter!`); 
showPlayer.originalDisplay();
console.log(``);
console.log(`${remainingGuesses} Guesses Remaining!`);
console.log(``);

var guessLetters = function(){
	if(remainingGuesses > 0){
	inquirer.prompt([{
		name: `currentGuess`,
		message: `Guess a letter!`
	}]).then(function(answer){
		var letter = answer.currentGuess.toLowerCase();
		var letters = /^[a-z]+$/;
		
		if(letter.match(letters)){
			if(checkLetter.lettersGuessed.includes(letter)){
				console.log(`You have already guessed that letter`);
				showPlayer.updatedDisplay(letter);
				console.log(`Letters Guessed: ${checkLetter.lettersGuessed}`);
				console.log(`${remainingGuesses} Guesses Remaining!`);					
				console.log(``);
				guessLetters();
			}
			else{
				checkLetter.lettersGuessed.push(letter);
				if(checkLetter.currentWordArray.includes(letter)){
					console.log(`Correct!!!`);
					console.log(``);
					showPlayer.updatedDisplay(letter);
					
					if(showPlayer.updated == currentWord){
						wins++;
						console.log(`You Win!!!`);
						console.log(``);
						console.log(`Number of wins: ${wins}`);
						console.log(`Number of losses: ${losses}`);
						console.log(``);
						restartGame();
					}
					else{
						console.log(`Letters Guessed: ${checkLetter.lettersGuessed}`);
						console.log(`${remainingGuesses} Guesses Remaining!`);						
						console.log(``);
						guessLetters();	
					}
				}
				else{
					console.log(`Incorrect!!!`);
					showPlayer.updatedDisplay(letter);
					console.log(`Letters Guessed: ${checkLetter.lettersGuessed}`);
					remainingGuesses--;
					console.log(`${remainingGuesses} Guesses Remaining!`);
					console.log(``);
					guessLetters();
				}
			}
		}
		
		else{
			console.log(`Please select a letter`);
			console.log(``);
			guessLetters();
		}
	});
	}
	else{
		losses++;
		console.log(`You Lose!`);
		console.log(`The word we were looking for was: ${currentWord}`);
		console.log(``);
		console.log(`Number of wins: ${wins}`);
		console.log(`Number of losses: ${losses}`);
		console.log(``);
		restartGame();
	}
}
//Call the function
guessLetters();