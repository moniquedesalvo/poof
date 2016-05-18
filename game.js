var shapes = ['heart', 'star', 'circle'];
var textures = ['solid', 'stripe', 'open'];
var colors = ['#00b8e6', '#9900cc', '#ff0066'];
var cardDivs = $('.card');

var Card = function(shape, texture, number, color) { //data structures
	this.shape = shape;
	this.texture = texture;
	this.number = number;
	this.color = color;
	this.cardDiv = null;
}


/*
	Generate a new HTMLDOMElement (or jQuery equiv) that contains the card and all it's attendant properties
	It should store a reference to that card in a property on the constructor
*/
Card.prototype.render = function(game) {
	var self = this;
	this.cardDiv = $('<div class="col-md-2 card"></div>');
	for(var k = 1; k <= this.number; k++) {
		this.cardDiv.append('<span class="icon-' + this.shape + this.texture + '"></span>').css('color', this.color);
		}
	this.cardDiv.data('shape', this.shape);
	this.cardDiv.data('texture', this.texture);
	this.cardDiv.data('number', this.number);
	this.cardDiv.data('color', this.color);

	this.cardDiv.click(function(){
		game.firstSelectedCard = self;
		self.cardDiv.addClass("selected");
		//push into an array instead
		console.log(game.firstSelectedCard)
		// check to make sure it hasn't been selected already, if it has, un-select it and remove from array
		//call win chcecking function

	});
	return this.cardDiv
};

var Deck = function() {
	this.cards = [];
}

Deck.prototype.generateDeck = function() {
	for(var i = 0; i < shapes.length; i++) {
		for(var l = 1; l <= 3; l++) {
			for(var m = 0; m < colors.length; m++) {
				for( var k = 0; k < textures.length; k++) {
					this.cards.push(new Card(shapes[i], textures[k], l, colors[m]));
				}
			}
		}
	}
	return this.cards;
}

Deck.prototype.deal = function(game) {
	var dealtCards = [];
	for(var j = 0; j < game.dealCount; j++) {
		var randomCardIndex = Math.floor(Math.random() * this.cards.length);
		var randomCard = this.cards[randomCardIndex];
		this.cards.splice(randomCardIndex, 1);
		var row = $("#row" + (j % 3))
		row.append(randomCard.render(game));
		//push onto dealtCards

	}	
	// push all the cards from dealtCards into the game's cards on board
}


var Game = function() {
	this.firstSelectedCard = {};
	this.secondSelectedCard = {};
	this.thirdSelectedCard = {};
	this.selectedCards = [];
	this.isASet = false;
	this.dealCount = 12;
	this.cardsOnBoard = [];
}


var game = new Game();
var deck = new Deck();
deck.generateDeck();
deck.deal(game);


//use every lodash

Game.prototype.determineWin = function() {
	//is there a set?
	if (this.firstSelectedCard.shape === this.secondSelectedCard.shape && this.secondSelectedCard.shape === this.thirdSelectedCard.shape && this.firstSelectedCard.shape === this.thirdSelectedCard || this.firstSelectedCard.shape !== this.secondSelectedCard.shape && this.secondSelectedCard.shape !== this.thirdSelectedCard.shape && this.firstSelectedCard !== this.thirdSelectedCard) {
		var checkShape = true;
	}
	if (this.firstSelectedCard.texture === this.secondSelectedCard.texture && this.secondSelectedCard.texture === this.thirdSelectedCard.texture && this.firstSelectedCard.texture === this.thirdSelectedCard.texture || this.firstSelectedCard.texture !== this.secondSelectedCard.texture && this.secondSelectedCard.texture !== this.thirdSelectedCard.texture && this.firstSelectedCard.texture !== this.thirdSelectedCard.texture) {
		var checkTexture = true;
	}
	if (this.firstSelectedCard.number === this.secondSelectedCard.number && this.secondSelectedCard.number === this.thirdSelectedCard.number && this.firstSelectedCard.number === this.thirdSelectedCard.number || this.firstSelectedCard.number !== this.secondSelectedCard.number && this.secondSelectedCard.number !== this.thirdSelectedCard.number && this.firstSelectedCard.number !== this.thirdSelectedCard.number) {
		var checkNumber = true;
	}
	if (this.firstSelectedCard.color === this.secondSelectedCard.color && this.secondSelectedCard.color === this.thirdSelectedCard.color && this.firstSelectedCard.color === this.thirdSelectedCard.color || this.firstSelectedCard.color !== this.secondSelectedCard.color && this.secondSelectedCard.color !== this.thirdSelectedCard.color && this.firstSelectedCard.color !== this.thirdSelectedCard.color) {
		var checkColor = true;
	}
	if (checkShape || checkTexture || checkNumber || checkColor) {
		this.isASet = true;
	} else {
		this.isASet = false;
	}
	//poof + 3 cards
// Game.prototype.setEventHandlers = function() {

}


// var game = new Game();


// //window.onload ????
// // register event handlers
// // $(".card").click(function () {
// var cardDivs = $('.card');
// for(var i = 0; i < cardDivs.length; i++) {
// 	$(cardDivs[i]).click(function(evt){
// 			// console.log($(this).data())
// 		game.firstSelectedCard = $(this).data()
// 		game.secondSelectedCard = $(this).data()
// 		game.thirdSelectedCard = $(this).data()
// 	});
// }

// console.log(game.firstSelectedCard)
// console.log(game.secondSelectedCard)
// console.log(game.thirdSelectedCard)

	// do stuff
	// game.firstSelectedCard = {blahblah}
	//clicked cards?
	//call determine win
// });


// 	var cardDivs = $('.card');
// 	for(var i = 0; i < cardDivs.length; i++) {
// 		$(cardDivs[i]).click(function(evt){
// 			if (evt.target.children[0] !== undefined) {
// 				console.log(evt.target.children[0].className);
// 				console.log(evt.target.children.length);
// 				console.log(this.style.color);
// 			} else {
// 				console.log(evt.target.className);
// 				console.log(evt.target.offsetParent.children.length);
// 				console.log(this.style.color);
// 			}
// 		});	
// 	}
// }

// determineWin();

// var testString = "icon-circlesolid"
// var foundMatch = testString.match(/circle/g)


// 1)shape1, shape2, shape3 are all the same or all different -> return true

// 2)shading1, shading2, shading3 are all the same or all different -> return true

// 3)# of shapes all the same or all different -> return true

// 4)colors all the same or all different -> return true

// if any of the above is false... not a set


// generate 81 cards into a list?
// shuffle
// take one out 

// clicking cards
// logic, determining what's a set


