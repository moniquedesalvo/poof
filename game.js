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

		if(self.cardDiv.hasClass("selected")) {
			self.cardDiv.removeClass("selected");
			var index = $.inArray(self, game.selectedCards);
			if (index >= 0) {
				game.selectedCards.splice(index, 1)
			}
		} else if (game.selectedCards.length < 3) {
			game.selectedCards.push(self)
			self.cardDiv.addClass("selected");
		}
		if (game.selectedCards.length == 3) {
			game.determineWin();
		}
	});
	return this.cardDiv;
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

Deck.prototype.deal = function(game, numberOfCards) {
	for(var j = 0; j < numberOfCards; j++) {
		var randomCardIndex = Math.floor(Math.random() * this.cards.length);
		var randomCard = this.cards[randomCardIndex];
		this.cards.splice(randomCardIndex, 1);
		game.cardsOnBoard.push(randomCard);
	}	
}

var Game = function() {
	this.selectedCards = [];
	this.cardsOnBoard = [];
	this.isASet = false;
	// this.dealCount = 12;
}

Game.prototype.render = function() {
	$('#row0').empty();
	$('#row1').empty();
	$('#row2').empty();
	for(var i = 0; i < this.cardsOnBoard.length; i++) {
		var row = $("#row" + (i % 3));
		row.append(this.cardsOnBoard[i].render(this));
	}
}

var game = new Game();
var deck = new Deck();
deck.generateDeck();
deck.deal(game, 12);
game.render();

//use every lodash
Game.prototype.determineWin = function(card) {
	if (game.selectedCards[0].shape === game.selectedCards[1].shape && game.selectedCards[1].shape === game.selectedCards[2].shape && game.selectedCards[0].shape === game.selectedCards[2].shape || game.selectedCards[0].shape !== game.selectedCards[1].shape && game.selectedCards[1].shape !== game.selectedCards[2].shape && game.selectedCards[0].shape !== game.selectedCards[2].shape) {
		var checkShape = true;
	}
	if (game.selectedCards[0].texture === game.selectedCards[1].texture && game.selectedCards[1].texture === game.selectedCards[2].texture && game.selectedCards[0].texture === game.selectedCards[2].texture || game.selectedCards[0].texture !== game.selectedCards[1].texture && game.selectedCards[1].texture !== game.selectedCards[2].texture && game.selectedCards[0].texture !== game.selectedCards[2].texture) {
		var checkTexture = true;
	}
	if (game.selectedCards[0].number === game.selectedCards[1].number && game.selectedCards[1].number === game.selectedCards[2].number && game.selectedCards[0].number === game.selectedCards[2].number || game.selectedCards[0].number !== game.selectedCards[1].number && game.selectedCards[1].number !== game.selectedCards[2].number && game.selectedCards[0].number !== game.selectedCards[2].number) {
		var checkNumber = true;
	}
	if (game.selectedCards[0].color === game.selectedCards[1].color && game.selectedCards[1].color === game.selectedCards[2].color && game.selectedCards[0].color === game.selectedCards[2].color || game.selectedCards[0].color !== game.selectedCards[1].color && game.selectedCards[1].color !== game.selectedCards[2].color && game.selectedCards[0].color !== game.selectedCards[2].color) {
		var checkColor = true;
	}
	if (checkShape && checkTexture && checkNumber && checkColor) {
		this.isASet = true;
		console.log("This is a set!")
		this.cardsOnBoard = _.difference(this.cardsOnBoard, this.selectedCards)
		this.selectedCards = [];
		deck.deal(this, 3);
		//add new cards to board from deck
	} else {
		this.isASet = false;
		console.log("This is not a set!")
		this.selectedCards = [];
		
	}
	this.render()

}



	// if (this.isASet) {
		//replace with another card
		//add 1 to sets found
		//

	// }
	//poof + 3 cards
// Game.prototype.setEventHandlers = function() {
