var shapes = ['heart', 'star', 'circle'];
var textures = ['solid', 'stripe', 'open'];
var colors = ['#0066cc', '#9900cc', '#ff0066'];

var Card = function(shape, texture, number, color) { 
	this.shape = shape;
	this.texture = texture;
	this.number = number;
	this.color = color;
	this.cardDiv = null;
}

Card.prototype.render = function(game) {
	var self = this;
	this.cardDiv = $('<div class="col-xs-2 card"></div>');
	for(var k = 1; k <= this.number; k++) {
		this.cardDiv.append('<span class="icon-' + this.shape + this.texture + '"></span>').css('color', this.color);
	}
	this.cardDiv.data('shape', this.shape);
	this.cardDiv.data('texture', this.texture);
	this.cardDiv.data('number', this.number);
	this.cardDiv.data('color', this.color);
	this.cardDiv.click(function() {
		if(self.cardDiv.hasClass("selected")) {
			self.cardDiv.removeClass("selected");
			var index = $.inArray(self, game.selectedCards);
			if (index >= 0) {
				game.selectedCards.splice(index, 1);
			}
		} else if (game.selectedCards.length < 3) {
			game.selectedCards.push(self);
			self.cardDiv.addClass("selected");
		}
		if (game.selectedCards.length === 3) {
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
	this.setsFound = 0;
	this.poof = new Audio('sounds/poof.wav');
	this.buzz = new Audio('sounds/buzz.mp3');
	// this.win = new Audio('sounds/win.wav');
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

//re-do w/ lodash 'every':
Game.prototype.isASet = function() {
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
		return true;
	} else {
		return false;
	}
}

Game.prototype.determineWin = function(card) {
	var self = this;
	if(self.isASet()) {
		setTimeout(function(){
			self.cardsOnBoard = _.difference(self.cardsOnBoard, self.selectedCards);
			self.selectedCards = [];
			if(self.cardsOnBoard.length < 12) {
				deck.deal(self, 3);
			}
			self.render();	
		}, 1500);
		setTimeout(function() {
			$('.selected').replaceWith('<div class="col-xs-2 poof"></div>');
			self.poof.play();
			self.win.play();
		}, 300);
		console.log("This is a set!");
		self.setsFound += 1;
		$('#setCount').text(self.setsFound);
		
	} else {
		console.log("self is not a set!");
		setTimeout(function(){
			self.selectedCards = [];
			self.render();	
		}, 600);
		self.buzz.play();
	}
}

$('#addCards').click(function(){
	if(game.cardsOnBoard.length < 18) {
		deck.deal(game, 3);
		game.render();	
	}
});

var game = new Game();
var deck = new Deck();
deck.generateDeck();
deck.deal(game, 12);
game.render();	



