var shapes = ['icon-heartsolid', 'icon-heartopen','icon-heartstripe', 'icon-starsolid', 'icon-starstripe', 'icon-staropen', 'icon-circlesolid', 'icon-circleopen', 'icon-circlestripe']
var colors = ['#00b8e6', '#9900cc', '#ff0066']
var number = [1, 2, 3]
var cards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11', 'card12']

function generateShape() {
	for(var i = 0; i < cards.length; i++) {
		var randomColorIndex = Math.floor(Math.random() * 3);
		var randomShapeIndex = Math.floor(Math.random() * 9);
		var randomNumberIndex = Math.floor(Math.random() * 3);
		var currentCard = cards[i];
		var randomShape = shapes[randomShapeIndex];
		var randomNumber = number[randomNumberIndex];
		for(var l = 0; l <= randomNumberIndex; l++) {
			var singleShape = $('#' + currentCard).append('<span class="' + randomShape + '"></span>').css('color',colors[randomColorIndex]);
		}
	}
}
generateShape();





// generate 81 cards into a list?
// shuffle
// take one out 

// clicking cards
// logic, determining what's a set