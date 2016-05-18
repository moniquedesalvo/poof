var shapes = ['heart', 'star', 'circle'];
var textures = ['solid', 'stripe', 'open'];
var colors = ['#00b8e6', '#9900cc', '#ff0066'];
// var cardDivs = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11', 'card12'];

var Card = function(shape, texture, number, color) {
	this.shape = shape;
	this.texture = texture;
	this.number = number;
	this.color = color;
}

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

Deck.prototype.deal = function() {
	var cardDivs = $('.card');
	for(var j = 0; j < cardDivs.length; j++) {
	var currentCard = cardDivs[j];
	var randomCardIndex = Math.floor(Math.random() * this.cards.length);
	var randomCard = this.cards[randomCardIndex];
	console.log(randomCard)
	this.cards.splice(randomCardIndex, 1)
		for(var k = 1; k <= randomCard.number; k++) {
			$(currentCard).append('<span class="icon-' + randomCard.shape + randomCard.texture + '"></span>').css('color', randomCard.color);
		}
	}	
}

var deck = new Deck;
deck.generateDeck()
deck.deal()

function determineWin() {
	var cardDivs = $('.card');
	for(var i = 0; i < cardDivs.length; i++) {
		$(cardDivs[i]).click(function(evt){
			if (evt.target.children[0] !== undefined) {
				console.log(evt.target.children[0].className)
				console.log(evt.target.children.length)
				console.log(this.style.color)
			} else {
				console.log(evt.target.className);
				console.log(evt.target.offsetParent.children.length);
				console.log(this.style.color)
				
			}
		});	
	}
}

determineWin();

var testString = "icon-circlesolid"
var foundMatch = testString.match(/circle/g)


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


