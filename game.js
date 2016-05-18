var shapes = ['icon-heartsolid', 'icon-heartopen','icon-heartstripe', 'icon-starsolid', 'icon-starstripe', 'icon-staropen', 'icon-circlesolid', 'icon-circleopen', 'icon-circlestripe']
var colors = ['#00b8e6', '#9900cc', '#ff0066']
var number = [1, 2, 3]
var cards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11', 'card12']

var deck = [];

function generateDeck() {
	for(var i = 0; i < shapes.length; i++) {
		for(var l = 1; l <= 3; l++) {
			for(var m = 0; m < colors.length; m++) {
				if (deck.indexOf() === -1) {
					deck.push(shapes[i] + '|' + l + '|' + colors[m]);
				}
			}
		}
	}
	return deck;
}

generateDeck();

function deal() {
	for(var j = 0; j < cards.length; j++) {
	var currentCard = cards[j];
	var randomCardIndex = Math.floor(Math.random() * deck.length);
	var randomCard = deck[randomCardIndex];
	deck.splice(randomCardIndex, 1)
	var singleCardArray = randomCard.split('|');
	var randomShape = singleCardArray[0]; 
	var randomNumber = singleCardArray[1];
	var randomColor = singleCardArray[2];
		for(var k = 1; k <= randomNumber; k++) {
			$('#' + currentCard).append('<span class="' + randomShape + '"></span>').css('color', randomColor);
		}
	}	
}

deal();


function determineWin() {
	for(var i = 0; i < cards.length; i++) {
		$('#' + cards[i]).click(function(evt){
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
var shape = testString.match(/circle/g)
var shading = testString.match(/solid/g)
console.log(shape, "shape")
console.log(shading)

// 1)shape1, shape2, shape3 are all the same or all different -> return true

// 2)shading1, shading2, shading3 are all the same or all different -> return true

// 3)# of shapes all the same or all different -> return true

// 4)colors all the same or all different -> return true

// if any of the above is false... not a set







// generate 81 cards into a list
// shuffle
// take one out 
// clicking cards
// logic, determining what's a set


