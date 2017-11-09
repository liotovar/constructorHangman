letter = function(word){
	this.wordArray = word.split(''),
	this.hiddenLetters = [],
	this.updated,
	this.originalDisplay = function(){
		for(i=0;i<this.wordArray.length;i++){
			if(this.wordArray[i] === ' '){
				x = ' ';
				this.hiddenLetters.push(x);
			}
			else{
				x = '_';
				this.hiddenLetters.push(x);
			}
		}
		console.log(this.hiddenLetters.join(''));
	},
	this.updatedDisplay = function(letter){
		for(i=0;i<this.wordArray.length;i++){
			if(letter == this.wordArray[i]){
				this.hiddenLetters.splice(i, 1, letter);
			}
		}
		this.updated = this.hiddenLetters.join('');
		console.log(this.updated);
	}
}